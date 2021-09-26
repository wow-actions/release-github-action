import * as os from 'os'
import * as fs from 'fs-extra'
import * as tar from 'tar'
import * as path from 'path'
import * as semver from 'semver'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'

async function run() {
  try {
    const { context } = github
    const githubToken = core.getInput('github_token', { required: true })
    const octokit = github.getOctokit(githubToken)

    const packageJson = await fs.readFile('package.json', {
      encoding: 'utf8',
    })
    const pkg: {
      name: string
      version: string
      files?: string[]
    } = JSON.parse(packageJson)

    const v = pkg.version
    const version = `v${v}`
    const minorVersion = `v${semver.major(v)}.${semver.minor(v)}`
    const majorVersion = `v${semver.major(v)}`
    const branchName = `releases/${version}`

    const tags = await octokit.rest.repos.listTags(context.repo)

    if (tags.data.some((tag) => tag.name === version)) {
      core.info(`Tag ${version} already exists`)
      return
    }

    await exec.exec(`git checkout -b ${branchName}`)
    await exec.exec(
      `git config --global user.email "github-actions[bot]@users.noreply.github.com"`,
    )
    await exec.exec(`git config --global user.name "github-actions[bot]"`)
    await exec.exec(
      `git remote set-url origin https://x-access-token:${githubToken}@github.com/${context.repo.owner}/${context.repo.repo}.git`,
    )

    const buildScript = core.getInput('build_script') || 'build'

    await exec.exec(`yarn`)
    await exec.exec(`yarn ${buildScript}`)

    // We manually remove some files that are not essential to running the
    // package should not be included in the build.
    const manuallyRemovedFiles = [
      'CHANGELOG.md',
      'README.md',
      'LICENSE',
      'LICENCE',
    ]

    await Promise.all(
      manuallyRemovedFiles.map(async (file) => {
        // If the user included the file in their "files" list then they must
        // really want it included.
        if (pkg.files && pkg.files.includes(file)) {
          return
        }
        await fs.remove(file)
      }),
    )

    await exec.exec(`yarn pack`)

    // We create a branch containing only the contents of the package.
    const packagedFilename = `${pkg.name}-${version}.tgz`
    const packagedFilePath = path.join(process.cwd(), packagedFilename)
    const tempPackedFilePath = path.join(os.tmpdir(), packagedFilename)
    await fs.move(packagedFilePath, tempPackedFilePath)

    // Remove all files and folders.
    await exec.exec(`git rm -rf .`)
    await exec.exec(`git clean -fdx`)

    // Move back the package.
    await fs.move(tempPackedFilePath, packagedFilePath)

    // Extract it.
    core.info(`Extracting ${packagedFilename}`)
    await exec.exec('ls')
    await tar.extract({ file: packagedFilePath })
    await fs.remove(packagedFilePath)

    // Move from "package" into cwd.
    const filesAndDirectoriesInPackage: string[] = await fs.readdir('package')
    await Promise.all(
      filesAndDirectoriesInPackage.map((p) =>
        fs.move(path.join('package', p), p),
      ),
    )
    await fs.remove('package')

    await exec.exec(`git add .`)
    await exec.exec(`git commit -a -m "release ${version}"`)
    await exec.exec(`git push origin ${branchName}`)

    await exec.exec('git', ['push', 'origin', `:refs/tags/${version}`])
    await exec.exec('git', ['tag', '-fa', version, '-m', version])

    await exec.exec('git', ['push', 'origin', `:refs/tags/${minorVersion}`])
    await exec.exec('git', ['tag', '-f', minorVersion])

    await exec.exec('git', ['push', 'origin', `:refs/tags/${majorVersion}`])
    await exec.exec('git', ['tag', '-f', majorVersion])

    await exec.exec('git push --tags origin')

    await exec.exec(`git checkout master`)
    await exec.exec(`git branch -D ${branchName}`)
    await exec.exec(`git push origin --delete ${branchName}`)

    const tagName = core.getInput('tag_name').replace('refs/tags/', '')
    const releaseName = core.getInput('release_name').replace('refs/tags/', '')
    const body = core.getInput('body')
    const bodyPath = core.getInput('body_path')
    const draft = core.getInput('draft') === 'true'
    const prerelease = core.getInput('prerelease') === 'true'
    const commitish = core.getInput('commitish') || context.sha

    let bodyFileContent = null
    if (bodyPath) {
      try {
        bodyFileContent = fs.readFileSync(bodyPath, { encoding: 'utf8' })
      } catch (error) {
        core.setFailed(error.message)
      }
    }

    const createReleaseResponse = await octokit.rest.repos.createRelease({
      ...context.repo,
      draft,
      prerelease,
      tag_name: tagName || version,
      name: releaseName || version,
      body: bodyFileContent || body,
      target_commitish: commitish,
    })

    // Get the ID, html_url, and upload URL for the created release
    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl },
    } = createReleaseResponse

    core.setOutput('id', releaseId)
    core.setOutput('html_url', htmlUrl)
    core.setOutput('upload_url', uploadUrl)
  } catch (e) {
    core.error(e)
    core.setFailed(e.message)
  }
}

run()

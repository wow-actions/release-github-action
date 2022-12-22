import * as core from '@actions/core'
import { Result } from 'semantic-release'

export async function windup(result: Result) {
  if (!result) {
    return core.debug('No release published.')
  }

  const { lastRelease, commits, nextRelease, releases } = result

  if (lastRelease) {
    core.debug(`The last release was "${lastRelease.version}".`)
    core.setOutput('last_release_version', lastRelease.version)
    core.setOutput('last_release_git_head', lastRelease.gitHead)
    core.setOutput('last_release_git_tag', lastRelease.gitTag)
  }

  if (!nextRelease) {
    return core.debug('No release published.')
  }

  core.debug(
    `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`,
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const release of releases) {
    core.debug(`The release was published with plugin "${release.pluginName}".`)
  }

  const { version, channel, notes, gitHead, gitTag } = nextRelease
  const [major, minor, patch] = version.split(/\.|-|\s/g, 3)

  // set outputs
  core.setOutput('new_release_published', 'true')
  core.setOutput('new_release_version', version)
  core.setOutput('new_release_major_version', major)
  core.setOutput('new_release_minor_version', minor)
  core.setOutput('new_release_patch_version', patch)
  core.setOutput('new_release_channel', channel)
  core.setOutput('new_release_notes', notes)
  core.setOutput('new_release_git_head', gitHead)
  core.setOutput('new_release_git_tag', gitTag)
}

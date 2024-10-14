import { exec } from '@actions/exec'
import * as SemanticRelease from 'semantic-release'
import { GitError } from './errors'

interface Logger {
  log: (message: string, ...vars: any[]) => void
  error: (message: string, ...vars: any[]) => void
}

function resolveTags(givenTag: string) {
  const [major, minor] = givenTag.split('.')
  return [major, `${major}.${minor}`]
}

async function forcePushTags({
  sourceTag,
  targetTags,
}: {
  sourceTag: string
  targetTags: string[]
}) {
  try {
    for (const targetTag of targetTags) {
      // Delete the current target tag on the remote if it exists
      await exec(`git push origin :refs/tags/${targetTag}`)
      // recreate the tag pointing to the new source tag
      await exec(`git tag -f ${targetTag} ${sourceTag}`)
      // push the tag to the remote
      await exec(`git push origin ${targetTag}`)
    }
  } catch (error) {
    throw new GitError(error)
  }
}

async function publish(
  _pluginConfig: any,
  context: {
    logger: Logger
    nextRelease: SemanticRelease.NextRelease
  },
) {
  const sourceTag = context.nextRelease.gitTag
  const targetTags = resolveTags(sourceTag)

  context.logger.log(
    `Setting Target Tags "${targetTags.join(
      '" and "',
    )}" on Source Tag "${sourceTag}" and pushing it to remote.`,
  )

  await forcePushTags({
    sourceTag,
    targetTags,
  })

  context.logger.log(
    `Tags "${targetTags.join('" and "')}" created successfully.`,
  )
}

export const inlinePlugin = {
  publish,
} as const

// Add labels for logs.
Object.keys(inlinePlugin).forEach((type: keyof typeof inlinePlugin) =>
  Reflect.defineProperty(inlinePlugin[type], 'pluginName', {
    value: 'publish major and minor tags',
    writable: false,
    enumerable: true,
  }),
)

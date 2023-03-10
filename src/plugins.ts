import changelog from '@semantic-release/changelog'
import commitAnalyzer from '@semantic-release/commit-analyzer'
import git from '@semantic-release/git'
import github from '@semantic-release/github'
import npm from '@semantic-release/npm'
import releaseNotesGenerator from '@semantic-release/release-notes-generator'

function fixPluginName(plugin: any, name: string) {
  Object.keys(plugin).forEach((type) =>
    Reflect.defineProperty(plugin[type], 'pluginName', {
      value: name,
      writable: false,
      enumerable: true,
    }),
  )
}

fixPluginName(changelog, '@semantic-release/changelog')
fixPluginName(git, '@semantic-release/git')
fixPluginName(commitAnalyzer, '@semantic-release/commit-analyzer')
fixPluginName(npm, '@semantic-release/npm')
fixPluginName(github, '@semantic-release/github')
fixPluginName(
  releaseNotesGenerator,
  '@semantic-release/release-notes-generator',
)

export { default as changelog } from '@semantic-release/changelog'
export { default as commitAnalyzer } from '@semantic-release/commit-analyzer'
export { default as git } from '@semantic-release/git'
export { default as github } from '@semantic-release/github'
export { default as npm } from '@semantic-release/npm'
export { default as releaseNotesGenerator } from '@semantic-release/release-notes-generator'

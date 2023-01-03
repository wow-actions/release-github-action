import SemanticRelease from 'semantic-release'
import { Inputs } from './inputs'
import { inlinePlugin } from './plugin'

export function getSemanticReleaseOptions(
  inputs: Inputs,
): SemanticRelease.Options {
  return {
    dryRun: inputs.dryRun,
    branches: inputs.branches,
    plugins: [
      [
        '@semantic-release/commit-analyzer',
        {
          preset: 'angular',
          releaseRules: [
            { breaking: true, release: 'major' },
            { revert: true, release: 'patch' },
            { type: 'feat', release: 'minor' },
            { type: 'build', release: 'patch' },
            { type: 'ci', release: false },
            { type: 'chore', release: false },
            { type: 'docs', release: 'patch' },
            { type: 'perf', release: 'patch' },
            { type: 'refactor', release: 'patch' },
            { type: 'style', release: 'patch' },
            { type: 'test', release: 'patch' },
            { scope: 'no-release', release: false },
          ],
          parserOpts: {
            noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
          },
          ...inputs.commitAnalyzer,
        },
      ],
      [
        '@semantic-release/release-notes-generator',
        {
          ...inputs.releaseNotesGenerator,
        },
      ],
      [
        '@semantic-release/changelog',
        {
          ...inputs.changelog,
        },
      ],
      [
        '@semantic-release/npm',
        {
          npmPublish: false,
          tarballDir: 'dist',
        },
      ],
      [
        '@semantic-release/github',
        {
          addReleases: 'bottom',
          ...inputs.github,
        },
      ],
      [
        '@semantic-release/git',
        {
          assets: ['dist/**/*', 'package.json', 'CHANGELOG.md'],
          ...inputs.git,
        },
      ],
      inlinePlugin as any,
    ],
  }
}

import angularChangelog from 'conventional-changelog-angular'
import * as SemanticRelease from 'semantic-release'
import { Inputs } from './inputs'
import { inlinePlugin } from './plugin'
import {
  changelog,
  commitAnalyzer,
  git,
  github,
  npm,
  releaseNotesGenerator,
} from './plugins'

export function getSemanticReleaseOptions(
  inputs: Inputs,
): SemanticRelease.Options {
  return {
    dryRun: inputs.dryRun,
    branches: inputs.branches,
    plugins: [
      [
        commitAnalyzer,
        {
          preset: angularChangelog,
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
        releaseNotesGenerator,
        {
          ...inputs.releaseNotesGenerator,
        },
      ],
      [
        changelog,
        {
          ...inputs.changelog,
        },
      ],
      [
        npm,
        {
          npmPublish: false,
          // tarballDir: 'dist',
        },
      ],
      [
        github,
        {
          addReleases: 'bottom',
          ...inputs.github,
        },
      ],
      [
        git,
        {
          assets: ['dist/**/*', 'package.json', 'CHANGELOG.md'],
          ...inputs.git,
        },
      ],
      inlinePlugin as any,
    ],
  }
}

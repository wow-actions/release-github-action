import * as core from '@actions/core'
// eslint-disable-next-line import/no-named-as-default
import parseInputs from '@wow-actions/parse-inputs'

export function getInputs() {
  const inputs = parseInputs({
    cwd: { type: 'string' },
    dryRun: { type: 'boolean', defaultValue: false },
    branches: { type: 'object' },
    commitAnalyzer: { type: 'object' },
    releaseNotesGenerator: { type: 'object' },
    changelog: { type: 'object' },
    github: { type: 'object' },
    git: { type: 'object' },
  })

  core.debug(`inputs: ${JSON.stringify(inputs, null, 2)}`)

  return inputs
}

export type Inputs = ReturnType<typeof getInputs>

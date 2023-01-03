import semanticRelease from 'semantic-release'
import { getSemanticReleaseOptions } from './options'
import { getInputs } from './inputs'
import { setup } from './setup'
import { windup } from './windup'
import { npmInstall } from './npm'

export async function release() {
  const inputs = getInputs()
  if (inputs.cwd) {
    process.chdir(inputs.cwd)
  }

  await setup()
  await npmInstall('@semantic-release/commit-analyzer')
  await npmInstall('@semantic-release/release-notes-generator')
  await npmInstall('@semantic-release/changelog')
  await npmInstall('@semantic-release/github')
  await npmInstall('@semantic-release/git')
  const options = getSemanticReleaseOptions(inputs)
  const result = await semanticRelease(options)
  await windup(result)
}

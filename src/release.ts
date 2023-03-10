import semanticRelease from 'semantic-release'
import { getInputs } from './inputs'
import { getSemanticReleaseOptions } from './options'
import { setup } from './setup'
import { windup } from './windup'

export async function release() {
  const inputs = getInputs()
  if (inputs.cwd) {
    process.chdir(inputs.cwd)
  }

  await setup()
  const options = getSemanticReleaseOptions(inputs)
  const result = await semanticRelease(options)
  await windup(result)
}

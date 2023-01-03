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
  const npmInstallArgs = ['--silent', '-g']
  await npmInstall('@semantic-release/commit-analyzer', npmInstallArgs)
  await npmInstall('@semantic-release/release-notes-generator', npmInstallArgs)
  await npmInstall('@semantic-release/changelog', npmInstallArgs)
  await npmInstall('@semantic-release/github', npmInstallArgs)
  await npmInstall('@semantic-release/git', npmInstallArgs)
  const options = getSemanticReleaseOptions(inputs)
  const result = await semanticRelease(options)
  await windup(result)
}

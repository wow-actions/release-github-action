import * as core from '@actions/core'
import path from 'path'

export async function setup() {
  core.setOutput('new_release_published', 'false')

  core.debug(`action.cwd: ${path.resolve(__dirname, '..')}`)
  core.debug(`process.cwd: ${process.cwd()}`)
}

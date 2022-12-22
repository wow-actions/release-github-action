import * as core from '@actions/core'
import { release } from './release'

async function run() {
  try {
    await release()
  } catch (e) {
    core.setFailed(e)
  }
}

run()

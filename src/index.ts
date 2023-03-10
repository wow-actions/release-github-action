import * as core from '@actions/core'
import { release } from './release'

async function run() {
  try {
    await release()
  } catch (error) {
    core.setFailed(error)
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
run()

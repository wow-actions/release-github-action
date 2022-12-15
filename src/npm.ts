import path from 'path'
import { exec } from '@actions/exec'

const npmPath = process.env.npm_execpath
const npmPathIsJs =
  typeof npmPath === 'string' && /\.m?js/.test(path.extname(npmPath))
const execPath = npmPathIsJs ? process.execPath : npmPath || 'npm'

function getArgs(task: string, isRun?: boolean) {
  const args: string[] = []
  if (npmPathIsJs) {
    args.push(npmPath)
  }
  if (isRun) {
    args.push('run')
  }

  args.push(task)
  return args
}

export async function npmRun(task: string) {
  const args = ['run']
  if (npmPathIsJs) {
    args.unshift(npmPath)
  }
  return exec(execPath, getArgs(task, true))
}

export async function npmExec(task: string) {
  return exec(execPath, getArgs(task))
}

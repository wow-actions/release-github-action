import path from 'path'
import { exec } from '@actions/exec'

const npmPath = process.env.npm_execpath
const npmPathIsJs =
  typeof npmPath === 'string' && /\.m?js/.test(path.extname(npmPath))
const execPath = npmPathIsJs ? process.execPath : npmPath || 'npm'

export const isYarn = path.basename(npmPath || 'npm').startsWith('yarn')

function getArgs(task: string, taskArgs?: string[], isRun?: boolean) {
  const args: string[] = []
  if (npmPathIsJs) {
    args.push(npmPath)
  }
  if (isRun) {
    args.push('run')
  }

  args.push(task)

  if (taskArgs) {
    args.push(...taskArgs)
  }

  return args
}

export async function npmRun(task: string, args?: string[]) {
  return exec(execPath, getArgs(task, args, true))
}

export async function npmExec(task: string, args?: string[]) {
  return exec(execPath, getArgs(task, args))
}

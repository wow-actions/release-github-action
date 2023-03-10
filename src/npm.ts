import { exec } from '@actions/exec'
import path from 'node:path'

const npmPath = process.env.npm_execpath
const npmPathIsJs =
  typeof npmPath === 'string' && /\.m?js/.test(path.extname(npmPath))
const execPath = npmPathIsJs ? process.execPath : npmPath || 'npm'

export const isYarn = path.basename(npmPath || 'npm').startsWith('yarn')

function getArgs(task: string, taskArgs?: string[], cmd?: string) {
  const args: string[] = []
  if (npmPathIsJs) {
    args.push(npmPath)
  }

  if (cmd) {
    args.push(cmd)
  }

  args.push(task)

  if (taskArgs) {
    args.push(...taskArgs)
  }

  return args
}

export async function npmRun(task: string, args?: string[]) {
  return exec(execPath, getArgs(task, args, 'run'))
}

export async function npmExec(task: string, args?: string[]) {
  return exec(execPath, getArgs(task, args))
}

export async function npmInstall(pkg: string, args?: string[]) {
  return exec(execPath, getArgs(pkg, args, 'install'))
}

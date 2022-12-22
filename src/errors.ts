import SemanticReleaseError from '@semantic-release/error'

export class GitError extends SemanticReleaseError {
  constructor(originalError: Error) {
    super(`Error while running git command: ${originalError.message}`)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name as any
    this.code = `EGITERROR`
  }
}

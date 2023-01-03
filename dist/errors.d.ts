/// <reference types="semantic-release__error" />
import SemanticReleaseError from '@semantic-release/error';
export declare class GitError extends SemanticReleaseError {
    constructor(originalError: Error);
}

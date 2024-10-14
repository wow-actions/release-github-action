import * as SemanticRelease from 'semantic-release';
interface Logger {
    log: (message: string, ...vars: any[]) => void;
    error: (message: string, ...vars: any[]) => void;
}
declare function publish(_pluginConfig: any, context: {
    logger: Logger;
    nextRelease: SemanticRelease.NextRelease;
}): Promise<void>;
export declare const inlinePlugin: {
    readonly publish: typeof publish;
};
export {};

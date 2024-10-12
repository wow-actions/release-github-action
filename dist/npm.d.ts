export declare const isYarn: boolean;
export declare function npmRun(task: string, args?: string[]): Promise<number>;
export declare function npmExec(task: string, args?: string[]): Promise<number>;
export declare function npmInstall(pkg: string, args?: string[]): Promise<number>;

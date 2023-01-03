export declare function getInputs(): {
    cwd?: string | undefined;
    dryRun?: boolean | undefined;
    branches?: any;
    commitAnalyzer?: any;
    releaseNotesGenerator?: any;
    changelog?: any;
    github?: any;
    git?: any;
};
export type Inputs = ReturnType<typeof getInputs>;

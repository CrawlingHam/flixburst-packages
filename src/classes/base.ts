import type {
    IStandardEnvironmentValidator,
    IEnvironmentProcessor,
    IBaseEnvironment,
} from '../types';

/**
 * Base environment processor providing core functionality
 * @class BaseEnvironment
 * @implements {IBaseEnvironment}
 */
export class BaseEnvironment implements IBaseEnvironment {
    private validatedVariables: Set<string> = new Set();

    /**
     * Creates an instance of BaseEnvironment
     * @param {IEnvironmentProcessor} source - The source for environment variables
     * @param {IStandardEnvironmentValidator} validator - The validator for environment variables
     */
    protected constructor(
        private readonly source: IEnvironmentProcessor,
        private readonly validator: IStandardEnvironmentValidator,
    ) {}

    public initialize(variableNames: string[]): void {
        this.getVariables(variableNames);
    }

    public getVariable(name: string): string {
        if (!this.validatedVariables.has(name)) {
            const value = this.source.get(name);
            this.validator.validate(name, value);
            this.validatedVariables.add(name);
        }

        const value = this.source.get(name);
        if (value === undefined) throw new Error(`Environment variable "${name}" not found`);
        return value;
    }

    public getVariables<T extends Record<string, string>>(variableNames: string[]): T {
        return variableNames.reduce(
            (acc, name) => ({
                ...acc,
                [name]: this.getVariable(name),
            }),
            {},
        ) as T;
    }
}

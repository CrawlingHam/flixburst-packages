import { validateEnvironmentVariable, getEnvironmentVariable } from '../utils';
import { getVariableSource, clearCache } from '../utils';
import { IEnvironmentConfig } from '../types';
import { BaseEnvironment } from './base';

/**
 * Environment processor with singleton pattern and configuration management
 */
export class Environment extends BaseEnvironment {
    private static instance: Environment | null = null;
    private readonly config: IEnvironmentConfig;

    private constructor(config: IEnvironmentConfig) {
        super({ get: getEnvironmentVariable }, { validate: validateEnvironmentVariable });
        this.config = config;
        this.initialize(config.requiredVariables);
    }

    public static getInstance(config: IEnvironmentConfig): Environment {
        return (Environment.instance ??= new Environment(config));
    }

    public getRequiredVariables(): readonly string[] {
        return this.config.requiredVariables;
    }

    // Cleanup method to prevent memory leaks
    public static reset(): void {
        Environment.instance = null;
        clearCache();
    }

    // Get the source of an environment variable
    public static getVariableSource(key: string): string {
        return getVariableSource(key);
    }
}

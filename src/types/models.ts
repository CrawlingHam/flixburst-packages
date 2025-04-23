/**
 * Source for accessing environment variables from multiple sources (process.env, import.meta.env, etc.)
 * with memoization and fallback support.
 */
export type IEnvironmentProcessor = {
    /**
     * Retrieves an environment variable value by key from available sources
     * @param {string} key - The name of the environment variable
     * @returns {string | undefined} The value of the environment variable, or undefined if not found in any source
     * @example
     * ```typescript
     * const value = processor.get('API_KEY');
     * ```
     */
    get(key: string): string | undefined;
};

/**
 * Validator for environment variables with strict validation rules
 */
export type IStandardEnvironmentValidator = {
    /**
     * Validates an environment variable value for existence and non-emptiness
     * @param {string} name - The name of the environment variable
     * @param {string | undefined} value - The value to validate
     * @throws {Error} If validation fails with descriptive error message
     * @example
     * ```typescript
     * validator.validate('API_KEY', process.env.API_KEY);
     * ```
     */
    validate(name: string, value: string | undefined): void;
};

/**
 * Core environment variable processing operations with caching and validation
 */
export type IBaseEnvironment = {
    /**
     * Initializes and validates a set of environment variables
     * @param {string[]} variableNames - Names of variables to initialize and validate
     * @throws {Error} If any required variable is missing or invalid
     * @example
     * ```typescript
     * environment.initialize(['API_KEY', 'DATABASE_URL']);
     * ```
     */
    initialize(variableNames: string[]): void;

    /**
     * Retrieves a single environment variable with validation
     * @param {string} name - Name of the variable to retrieve
     * @returns {string} The validated value of the environment variable
     * @throws {Error} If variable is not found or invalid
     * @example
     * ```typescript
     * const apiKey = environment.getVariable('API_KEY');
     * ```
     */
    getVariable(name: string): string;

    /**
     * Retrieves multiple environment variables with validation
     * @param {string[]} variableNames - Names of variables to retrieve
     * @returns {T} Object containing the validated variables
     * @throws {Error} If any variable is not found or invalid
     * @example
     * ```typescript
     * const config = environment.getVariables(['API_KEY', 'DATABASE_URL']);
     * ```
     */
    getVariables<T extends Record<string, string>>(variableNames: string[]): T;
};

/**
 * Configuration for environment processor with location context
 */
export type IEnvironmentConfig = {
    /** Location identifier for error messages and context */
    readonly location: string;

    /** List of required environment variables to validate */
    readonly requiredVariables: string[];
};

/**
 * Environment variable source with type-safe access and source tracking
 */
export type EnvSource = {
    /**
     * Retrieves a value from a specific environment source
     * @param {string} key - The environment variable key
     * @returns {string | undefined} The value from the source, or undefined if not found
     */
    get(key: string): string | undefined;

    /** The type of environment source being used */
    source: 'process' | 'vite' | 'fallback';
};

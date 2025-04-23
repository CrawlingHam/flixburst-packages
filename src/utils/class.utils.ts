import { IEnvironmentProcessor, IStandardEnvironmentValidator, IEnvironmentConfig } from '../types';
import { envCache, envSources } from './cache.utils';
import { Environment } from '../classes/main';

/**
 * Retrieves environment variables with memoization and fallback support
 * @param {string} key - The environment variable key to retrieve
 * @returns {string | undefined} The value of the environment variable, or undefined if not found
 */
export const getEnvironmentVariable: IEnvironmentProcessor['get'] = (
    key: string,
): string | undefined => {
    // Check cache first
    const cached = envCache.get(key);
    if (cached) return cached.value;

    // Try each source
    for (const source of envSources) {
        const value = source.get(key);
        if (value !== undefined) {
            // Cache the result
            envCache.set(key, { value, source: source.source });
            return value;
        }
    }

    // Cache undefined to prevent repeated lookups
    envCache.set(key, { value: undefined, source: 'none' });
    return undefined;
};

/**
 * Validates environment variable existence and non-emptiness
 * @param {string} name - The name of the environment variable
 * @param {string | undefined} value - The value to validate
 * @throws {Error} If the environment variable is missing or empty
 */
export const validateEnvironmentVariable: IStandardEnvironmentValidator['validate'] = (
    name: string,
    value: string | undefined,
): void => {
    if (!value?.trim()) throw new Error(`Environment variable "${name}" is missing or empty`);
};

/**
 * Validates and retrieves environment variables based on the provided configuration
 * @param config - Configuration object specifying required variables and settings
 * @param config.location - Location identifier for error messages
 * @param config.requiredVariables - List of required environment variable names
 * @returns Record containing all validated environment variables
 * @throws {Error} If any required variables are missing
 * @example
 * ```ts
 * const config: IEnvironmentConfig = {
 *   location: 'name-of-file-or-function',
 *   requiredVariables: ['API_KEY', 'DATABASE_URL']
 * };
 *
 * const envVars = ensureRequiredEnvironmentVariables(config);
 *
 * // Access validated variables
 * const { API_KEY, DATABASE_URL } = envVars;
 * ```
 */
export function ensureRequiredEnvironmentVariables(
    config: IEnvironmentConfig,
): Record<string, string> {
    const environment = Environment.getInstance(config);
    const requiredVariables = environment.getRequiredVariables();
    return environment.getVariables([...requiredVariables]);
}

/**
 * Constructs a URL object from path segments.
 * @example
 * constructUrl('http://api', 'v1', 'auth', 'users')
 * @returns URL('http://api/v1/auth/users')
 */
export const constructUrl = (...segments: string[]): URL => {
    if (!segments.length) throw new Error('At least one segment is required');

    const [base, ...paths] = segments;
    const baseUrl = new URL(base);

    if (!paths.length) return baseUrl;

    const pathname = [baseUrl.pathname, ...paths]
        .filter(Boolean)
        .join('/')
        .replace(/\/+/g, '/')
        .replace(/^\/|\/$/g, '');

    return new URL(pathname, baseUrl.origin);
};

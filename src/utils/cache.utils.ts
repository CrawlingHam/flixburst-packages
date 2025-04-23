import type { EnvSource } from '../types';

/**
 * Cache entry for environment variables
 */
type CacheEntry = {
    value: string | undefined;
    source: string;
};

/**
 * Cache for environment variables
 */
export const envCache = new Map<string, CacheEntry>();

// Define a type for process.env
interface ProcessEnv {
    [key: string]: string | undefined;
}

/**
 * Available environment sources
 */
export const envSources: EnvSource[] = [
    {
        get: (key: string): string | undefined => process.env[key],
        source: 'process',
    },
    {
        get: (key: string): string | undefined => {
            try {
                // @ts-ignore - Vite's import.meta.env is not recognized by TypeScript
                return import.meta.env[key];
            } catch {
                return undefined;
            }
        },
        source: 'vite',
    },
    {
        get: (key: string): string | undefined => {
            try {
                return (process.env as ProcessEnv)[key];
            } catch {
                return undefined;
            }
        },
        source: 'fallback',
    },
];

/**
 * Clears the environment variable cache
 */
export const clearCache = (): void => {
    envCache.clear();
};

/**
 * Gets the source of a cached environment variable
 */
export const getVariableSource = (key: string): string => {
    return envCache.get(key)?.source ?? 'unknown';
};

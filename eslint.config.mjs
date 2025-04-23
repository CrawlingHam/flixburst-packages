import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: {
                process: 'readonly',
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                URL: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    vars: 'all',
                },
            ],
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-unused-vars': 'off',
        },
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
        },
    },
    prettier,
    {
        ignores: ['dist/*', 'node_modules/*', 'coverage/*'],
    },
];

# flixburst-environment_variables

A robust, type-safe, and flexible environment variable management package for TypeScript applications. Provides comprehensive support for different environment sources, caching, and validation.

## Features

- 🔒 Type-safe environment variable management
- 🔄 Multi-source support (process.env, import.meta.env)
- 🚀 Performance optimized with memoization
- 🛡️ Strict validation
- 🔍 Source tracking
- 📦 Framework-agnostic
- 🔄 Singleton pattern

## Installation

```bash
# Using npm
npm install flixburst-environment-variables

# Using yarn
yarn add flixburst-environment-variables

# Using pnpm
pnpm add flixburst-environment-variables
```

## Framework Examples

### Node.js

```typescript
// server.ts
import { Environment, ensureRequiredEnvironmentVariables } from 'flixburst-environment-variables';

// Using the Environment class
const env = Environment.getInstance({
    location: 'server',
    requiredVariables: ['PORT', 'DATABASE_URL', 'NODE_ENV'],
});

const port = env.getVariable('PORT');
const dbUrl = env.getVariable('DATABASE_URL');
const nodeEnv = env.getVariable('NODE_ENV');

// Using the utility function
const { PORT, DATABASE_URL, NODE_ENV } = ensureRequiredEnvironmentVariables({
    location: 'server',
    requiredVariables: ['PORT', 'DATABASE_URL', 'NODE_ENV'],
});

// Create server
const server = createServer((req, res) => {
    // Use environment variables
    if (NODE_ENV === 'development') {
        console.log('Development mode');
    }

    // ... server logic
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database URL: ${DATABASE_URL}`);
});
```

### React

```tsx
// App.tsx
import { Environment, ensureRequiredEnvironmentVariables } from 'flixburst-environment-variables';

// Using the Environment class
function App() {
    const config = {
        location: 'App',
        requiredVariables: ['REACT_APP_API_URL'],
    };

    const env = Environment.getInstance(config);
    const apiUrl = env.getVariable('REACT_APP_API_URL');

    return <div>API URL: {apiUrl}</div>;
}

// Using the utility function
function AppWithUtility() {
    const { REACT_APP_API_URL } = ensureRequiredEnvironmentVariables({
        location: 'App',
        requiredVariables: ['REACT_APP_API_URL'],
    });

    return <div>API URL: {REACT_APP_API_URL}</div>;
}
```

### Vue 3

```vue
<script setup>
import { Environment, ensureRequiredEnvironmentVariables } from 'flixburst-environment-variables';

// Using the Environment class
const config = {
    location: 'App',
    requiredVariables: ['VITE_API_URL'],
};

const env = Environment.getInstance(config);
const apiUrl = env.getVariable('VITE_API_URL');

// Using the utility function
const { VITE_API_URL } = ensureRequiredEnvironmentVariables({
    location: 'App',
    requiredVariables: ['VITE_API_URL'],
});
</script>

<template>
    <div>API URL: {{ VITE_API_URL }}</div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { Environment, ensureRequiredEnvironmentVariables } from 'flixburst-environment-variables';

@Component({
    selector: 'app-root',
    template: ` <div>API URL: {{ apiUrl }}</div> `,
})
export class AppComponent {
    // Using the Environment class
    private env = Environment.getInstance({
        location: 'AppComponent',
        requiredVariables: ['API_URL'],
    });

    apiUrl = this.env.getVariable('API_URL');

    // Using the utility function
    private envVars = ensureRequiredEnvironmentVariables({
        location: 'AppComponent',
        requiredVariables: ['API_URL'],
    });

    constructor() {
        console.log('API URL from utility:', this.envVars.API_URL);
    }
}
```

### SolidJS

```tsx
import { Environment, ensureRequiredEnvironmentVariables } from 'flixburst-environment-variables';

// Using the Environment class
function App() {
    const config = {
        location: 'App',
        requiredVariables: ['VITE_API_URL'],
    };

    const env = Environment.getInstance(config);
    const apiUrl = env.getVariable('VITE_API_URL');

    return <div>API URL: {apiUrl}</div>;
}

// Using the utility function
function AppWithUtility() {
    const { VITE_API_URL } = ensureRequiredEnvironmentVariables({
        location: 'App',
        requiredVariables: ['VITE_API_URL'],
    });

    return <div>API URL: {VITE_API_URL}</div>;
}
```

## Types

```typescript
// ESM
import {
    IEnvironmentConfig,
    IEnvironmentProcessor,
    IStandardEnvironmentValidator,
} from 'flixburst-environment-variables';

// CJS
// const { IEnvironmentConfig, IEnvironmentProcessor, IStandardEnvironmentValidator } = require('flixburst-environment-variables');

export interface IEnvironmentConfig {
    readonly location: string;
    readonly requiredVariables: string[];
}

export interface IEnvironmentProcessor {
    get(key: string): string | undefined;
}

export interface IStandardEnvironmentValidator {
    validate(name: string, value: string | undefined): void;
}
```

## API Reference

### `Environment`

#### `getInstance(config: IEnvironmentConfig): Environment`

Creates or returns the singleton instance of the Environment class.

```typescript
const env = Environment.getInstance({
    location: 'my-app',
    requiredVariables: ['API_KEY'],
});
```

#### `getVariable(name: string): string`

Retrieves a single environment variable.

```typescript
const apiKey = env.getVariable('API_KEY');
```

#### `getVariables<T extends Record<string, string>>(variableNames: string[]): T`

Retrieves multiple environment variables.

```typescript
const { API_KEY, DATABASE_URL } = env.getVariables(['API_KEY', 'DATABASE_URL']);
```

#### `getRequiredVariables(): readonly string[]`

Returns the list of required variables.

```typescript
const required = env.getRequiredVariables();
```

#### `reset(): void`

Clears the environment cache and resets the singleton instance.

```typescript
Environment.reset();
```

#### `getVariableSource(key: string): string`

Gets the source of an environment variable.

```typescript
const source = Environment.getVariableSource('API_KEY');
// Returns: 'process' | 'vite' | 'fallback' | 'unknown'
```

### Utility Functions

#### `ensureRequiredEnvironmentVariables(params: IEnvironmentConfig): Record<string, string>`

A convenience function that gets all required environment variables in one call.

```typescript
const envVars = ensureRequiredEnvironmentVariables({
    location: 'my-app',
    requiredVariables: ['API_KEY', 'DATABASE_URL'],
});
```

## Error Handling

The package throws descriptive errors when:

- Required environment variables are missing
- Environment variables are empty
- Invalid configuration is provided

Example error message:

```
Error: Environment variable "API_KEY" is missing or empty
```

## License

MIT

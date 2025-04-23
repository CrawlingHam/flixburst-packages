# flixburst-theme

A framework-agnostic theme management system that supports dark/light mode with system preference detection, cross-tab synchronization, and easy integration with any JavaScript framework.

## Features

- 🌓 Dark/Light mode support
- 🔄 System preference detection
- 📱 Cross-tab synchronization
- 🎨 Framework-agnostic
- 📦 Small bundle size
- 🔒 TypeScript support
- 🧩 Easy to integrate

## Installation

```bash
# Using npm
npm install flixburst-theme

# Using yarn
yarn add flixburst-theme

# Using pnpm
pnpm add flixburst-theme
```

## Framework Examples

### React

```tsx
// ESM
import { useEffect, useState } from 'react';
import { setupThemeManagement, Theme } from 'flixburst-theme';

// CJS
// const { useEffect, useState } = require('react');
// const { setupThemeManagement, Theme } = require('flixburst-theme');

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const cleanup = setupThemeManagement({
      setTheme: setThemeState,
      initializeTheme: () => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'system';
      }
    });

    return cleanup;
  }, []);

  return { theme, setTheme: setThemeState };
}

// Usage in component
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Vue 3

```vue
<script setup>
// ESM
import { ref, onMounted, onUnmounted } from 'vue';
import { setupThemeManagement, Theme } from 'flixburst-theme';

// CJS
// const { ref, onMounted, onUnmounted } = require('vue');
// const { setupThemeManagement, Theme } = require('flixburst-theme');

const theme = ref<Theme>('system');

onMounted(() => {
  const cleanup = setupThemeManagement({
    setTheme: (newTheme) => theme.value = newTheme,
    initializeTheme: () => {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'system';
    }
  });

  onUnmounted(cleanup);
});
</script>

<template>
  <div>
    <button @click="theme = 'dark'">Dark</button>
    <button @click="theme = 'light'">Light</button>
    <button @click="theme = 'system'">System</button>
  </div>
</template>
```

### Angular

```typescript
// ESM
import { Component, OnInit, OnDestroy } from '@angular/core';
import { setupThemeManagement, Theme } from 'flixburst-theme';

// CJS
// const { Component, OnInit, OnDestroy } = require('@angular/core');
// const { setupThemeManagement, Theme } = require('flixburst-theme');

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="setTheme('dark')">Dark</button>
    <button (click)="setTheme('light')">Light</button>
    <button (click)="setTheme('system')">System</button>
  `
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  theme: Theme = 'system';
  private cleanup: () => void;

  ngOnInit() {
    this.cleanup = setupThemeManagement({
      setTheme: (theme) => this.theme = theme,
      initializeTheme: () => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'system';
      }
    });
  }

  ngOnDestroy() {
    this.cleanup();
  }

  setTheme(theme: Theme) {
    this.theme = theme;
  }
}
```

### SolidJS

```tsx
// ESM
import { createSignal, onMount, onCleanup } from 'solid-js';
import { setupThemeManagement, Theme } from 'flixburst-theme';

// CJS
// const { createSignal, onMount, onCleanup } = require('solid-js');
// const { setupThemeManagement, Theme } = require('flixburst-theme');

export function useTheme() {
  const [theme, setTheme] = createSignal<Theme>('system');

  onMount(() => {
    const cleanup = setupThemeManagement({
      setTheme,
      initializeTheme: () => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'system';
      }
    });

    onCleanup(cleanup);
  });

  return { theme, setTheme };
}

// Usage in component
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

## Custom Event

The package uses a custom event `theme-toggle` for theme changes. You can dispatch it manually:

```typescript
// ESM
import { Theme } from 'flixburst-theme';

// CJS
// const { Theme } = require('flixburst-theme');

// Dispatch theme change event
window.dispatchEvent(new CustomEvent('theme-toggle', { 
  detail: 'dark' // or 'light' or 'system'
}));
```

## Types

```typescript
// ESM
import { Theme, SetupThemeManagementParams } from 'flixburst-theme';

// CJS
// const { Theme, SetupThemeManagementParams } = require('flixburst-theme');

export type Theme = 'dark' | 'light' | 'system';

export interface SetupThemeManagementParams {
  setTheme: (theme: Theme) => void;
  initializeTheme: () => Theme;
  onThemeChange?: (theme: Theme) => void;
  onSystemThemeChange?: (isDark: boolean) => void;
}

// Core Functions
export const setupThemeManagement: (params: SetupThemeManagementParams) => () => void;
export const getSystemThemePreference: () => boolean;
export const shouldUseDarkMode: (theme: Theme) => boolean;
export const applyThemeToDOM: (isDark: boolean) => void;
export const setTheme: (theme: Theme) => void;
export const initializeTheme: () => Theme;
export const subscribeToSystemTheme: (callback: (isDark: boolean) => void) => () => void;
```

## API Reference

### `setupThemeManagement(params: SetupThemeManagementParams)`

Sets up theme management with the provided configuration.

**Parameters:**
- `params`: Configuration object
  - `setTheme`: Function to update theme state
  - `initializeTheme`: Function to initialize theme
  - `onThemeChange`: Optional callback for theme changes
  - `onSystemThemeChange`: Optional callback for system theme changes

**Returns:**
- Cleanup function to remove event listeners

### `getSystemThemePreference()`

Gets the current system theme preference.

**Returns:**
- `boolean`: `true` if system prefers dark mode

### `shouldUseDarkMode(theme: Theme)`

Determines if dark mode should be active.

**Parameters:**
- `theme`: Current theme setting

**Returns:**
- `boolean`: `true` if dark mode should be active

### `applyThemeToDOM(isDark: boolean)`

Applies theme to the DOM.

**Parameters:**
- `isDark`: Whether to apply dark mode

### `setTheme(theme: Theme)`

Sets and applies theme.

**Parameters:**
- `theme`: Theme to set

### `initializeTheme()`

Initializes theme from storage or system preference.

**Returns:**
- `Theme`: Initialized theme

### `subscribeToSystemTheme(callback: (isDark: boolean) => void)`

Subscribes to system theme changes.

**Parameters:**
- `callback`: Function to call on system theme change

**Returns:**
- Cleanup function to remove event listener

## License

MIT
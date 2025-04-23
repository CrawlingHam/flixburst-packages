# flixburst-tailwind

A utility package for managing Tailwind CSS classes with TypeScript support, combining the power of `clsx` and `tailwind-merge`.

## Features

- 🎨 Seamless class name combination
- 🔄 Automatic Tailwind class conflict resolution
- 📦 Type-safe class name management
- 🧩 Conditional class application
- 🔍 Smart class deduplication
- 📝 Comprehensive TypeScript support

## Installation

```bash
# Using npm
npm install flixburst-tailwind

# Using yarn
yarn add flixburst-tailwind

# Using pnpm
pnpm add flixburst-tailwind
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
# Using npm
npm install clsx tailwind-merge

# Using yarn
yarn add clsx tailwind-merge

# Using pnpm
pnpm add clsx tailwind-merge
```

## Usage

### CommonJS (CJS)

```javascript
const { cn } = require('flixburst-tailwind');

// Basic usage
const classes = cn('text-red-500', 'text-lg');

// With conditional classes
const buttonClasses = cn(
    'px-4 py-2 rounded',
    isActive && 'bg-blue-500',
    isDisabled ? 'opacity-50' : 'hover:bg-blue-600',
);
```

### ES Modules (ESM)

```javascript
import { cn } from 'flixburst-tailwind';

// Basic usage
const classes = cn('text-red-500', 'text-lg');

// With conditional classes
const buttonClasses = cn(
    'px-4 py-2 rounded',
    isActive && 'bg-blue-500',
    isDisabled ? 'opacity-50' : 'hover:bg-blue-600',
);
```

## API Reference

### `cn`

Combines multiple class names and resolves Tailwind CSS conflicts.

```typescript
function cn(...inputs: ClassValue[]): string;
```

**Parameters:**

- `inputs`: Class names or class name arrays to combine

**Returns:**

- A single string of combined and deduplicated class names

## Framework Examples

### React

```tsx
import { cn } from 'flixburst-tailwind';

function Button({ isActive, isDisabled, children }) {
    return (
        <button
            className={cn(
                'px-4 py-2 rounded transition-colors',
                isActive && 'bg-blue-500 text-white',
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600',
            )}
        >
            {children}
        </button>
    );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { cn } from 'flixburst-tailwind';

const props = defineProps<{
    isActive: boolean;
    isDisabled: boolean;
}>();
</script>

<template>
    <button
        :class="
            cn(
                'px-4 py-2 rounded transition-colors',
                isActive && 'bg-blue-500 text-white',
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600',
            )
        "
    >
        <slot />
    </button>
</template>
```

### Angular

```typescript
import { Component, Input } from '@angular/core';
import { cn } from 'flixburst-tailwind';

@Component({
    selector: 'app-button',
    template: `
        <button [class]="buttonClasses">
            <ng-content></ng-content>
        </button>
    `,
})
export class ButtonComponent {
    @Input() isActive = false;
    @Input() isDisabled = false;

    get buttonClasses() {
        return cn(
            'px-4 py-2 rounded transition-colors',
            this.isActive && 'bg-blue-500 text-white',
            this.isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600',
        );
    }
}
```

### SolidJS

```tsx
import { cn } from 'flixburst-tailwind';

function Button({ isActive, isDisabled, children }) {
    return (
        <button
            class={cn(
                'px-4 py-2 rounded transition-colors',
                isActive && 'bg-blue-500 text-white',
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600',
            )}
        >
            {children}
        </button>
    );
}
```

## Advanced Usage

### Dynamic Classes

```typescript
import { cn } from 'flixburst-tailwind';

// Dynamic class generation
const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    return cn(
        'rounded',
        size === 'sm' && 'px-2 py-1 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
    );
};

// Using with arrays
const classes = cn(
    ['text-red-500', 'font-bold'],
    ['hover:text-red-600', 'focus:ring-2'],
    isActive && ['bg-blue-500', 'text-white'],
);
```

### Component Variants

```typescript
import { cn } from 'flixburst-tailwind';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

const getVariantClasses = (variant: ButtonVariant) => {
    return cn(
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
        variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
    );
};
```

## License

MIT

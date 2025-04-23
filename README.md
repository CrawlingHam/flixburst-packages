# flixburst-zod

A collection of Zod schemas and utilities for type-safe API responses and data normalization.

## Features

- 🛡️ Type-safe API response handling
- 🔄 Data normalization utilities
- 📦 Predefined schemas for common use cases
- 🔒 Runtime type validation
- 🧩 Easy to integrate
- 📝 Comprehensive TypeScript support

## Installation

```bash
# Using npm
npm install flixburst-zod

# Using yarn
yarn add flixburst-zod

# Using pnpm
pnpm add flixburst-zod
```

## Usage

### CommonJS (CJS)

```javascript
const { profileSchema, normalizeResponse } = require('flixburst-zod');

// Validate profile data
const profile = profileSchema.parse({
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    picture: 'https://example.com/avatar.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
});

// Normalize API response
const normalized = normalizeResponse(apiResponse, profileSchema);
```

### ES Modules (ESM)

```javascript
import { profileSchema, normalizeResponse } from 'flixburst-zod';

// Validate profile data
const profile = profileSchema.parse({
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    picture: 'https://example.com/avatar.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
});

// Normalize API response
const normalized = normalizeResponse(apiResponse, profileSchema);
```

## API Reference

### Schemas

#### `profileSchema`

Zod schema for user profile data.

```typescript
const profileSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    picture: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});
```

#### `profileResponseSchema`

Zod schema for profile API responses.

```typescript
const profileResponseSchema = z.object({
    userProfile: profileSchema,
    message: z.string(),
});
```

### Types

#### `Profile`

Type inferred from `profileSchema`.

```typescript
type Profile = {
    id: string;
    name: string;
    email: string;
    role: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
};
```

#### `ProfileResponse`

Type inferred from `profileResponseSchema`.

```typescript
type ProfileResponse = {
    userProfile: Profile;
    message: string;
};
```

#### `ApiResponse`

Generic type for API responses.

```typescript
type ApiResponse<T = unknown> = {
    statusCode?: number;
    service?: string;
    message?: string;
    status?: number;
    result?: T;
    body?: T;
};
```

### Utilities

#### `normalizeResponse`

Normalizes API responses using a Zod schema.

```typescript
function normalizeResponse<T extends z.ZodType>(
    data: ApiResponse | z.infer<T>,
    schema: T,
): z.infer<T>;
```

**Parameters:**

- `data`: Raw API response data to normalize
- `schema`: Zod schema to validate against

**Returns:**

- Normalized response data

**Example:**

```typescript
const normalized = normalizeResponse(apiResponse, profileSchema);
```

#### `normalizeProfileResponse`

Normalizes profile API responses.

```typescript
function normalizeProfileResponse(
    data: ApiResponse<ProfileResponse> | ProfileResponse,
): ProfileResponse;
```

**Parameters:**

- `data`: Raw profile API response data

**Returns:**

- Normalized profile response

**Example:**

```typescript
const normalized = normalizeProfileResponse(apiResponse);
```

## Framework Examples

### React

```tsx
import { useEffect, useState } from 'react';
import { profileSchema, Profile } from 'flixburst-zod';

function ProfileComponent() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetch('/api/profile')
            .then((res) => res.json())
            .then((data) => {
                const validated = profileSchema.parse(data);
                setProfile(validated);
            });
    }, []);

    return (
        <div>
            {profile && (
                <>
                    <h1>{profile.name}</h1>
                    <p>{profile.email}</p>
                    <img src={profile.picture} alt="Profile" />
                </>
            )}
        </div>
    );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { profileSchema, type Profile } from 'flixburst-zod';

const profile = ref<Profile | null>(null);

onMounted(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    profile.value = profileSchema.parse(data);
});
</script>

<template>
    <div v-if="profile">
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.email }}</p>
        <img :src="profile.picture" alt="Profile" />
    </div>
</template>
```

### Angular

```typescript
import { Component, OnInit } from '@angular/core';
import { profileSchema, Profile } from 'flixburst-zod';

@Component({
    selector: 'app-profile',
    template: `
        <div *ngIf="profile">
            <h1>{{ profile.name }}</h1>
            <p>{{ profile.email }}</p>
            <img [src]="profile.picture" alt="Profile" />
        </div>
    `,
})
export class ProfileComponent implements OnInit {
    profile: Profile | null = null;

    async ngOnInit() {
        const response = await fetch('/api/profile');
        const data = await response.json();
        this.profile = profileSchema.parse(data);
    }
}
```

### SolidJS

```tsx
import { createSignal, onMount } from 'solid-js';
import { profileSchema, Profile } from 'flixburst-zod';

function ProfileComponent() {
    const [profile, setProfile] = createSignal<Profile | null>(null);

    onMount(async () => {
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(profileSchema.parse(data));
    });

    return (
        <div>
            <Show when={profile()}>
                {(p) => (
                    <>
                        <h1>{p().name}</h1>
                        <p>{p().email}</p>
                        <img src={p().picture} alt="Profile" />
                    </>
                )}
            </Show>
        </div>
    );
}
```

## License

MIT

import { z } from 'zod';

/**
 * Schema for the user profile
 */
export const profileSchema = z.object({
    updatedAt: z.string(),
    createdAt: z.string(),
    picture: z.string(),
    email: z.string(),
    name: z.string(),
    role: z.string(),
    id: z.string(),
});

/**
 * Schema for the profile API response
 */
export const profileResponseSchema = z.object({
    userProfile: profileSchema,
    message: z.string(),
});

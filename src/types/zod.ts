import { profileSchema, profileResponseSchema } from '../schemas/profile.z';
import { z } from 'zod';

/**
 * Type definition for the user profile, inferred from the profile schema
 * @example
 * ```ts
 * const profile: Profile = {
 *   id: 'user-123',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   // ... other profile fields
 * };
 * ```
 */
export type Profile = z.infer<typeof profileSchema>;

/**
 * Type definition for the profile API response
 */
export type ProfileResponse = z.infer<typeof profileResponseSchema>;

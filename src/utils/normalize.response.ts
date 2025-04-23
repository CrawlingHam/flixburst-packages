import { profileResponseSchema } from '../schemas/profile.z';
import { ApiResponse, ProfileResponse } from '../types';
import { z } from 'zod';

/**
 * Normalizes API responses using a Zod schema
 * @param data The raw API response data to normalize
 * @param schema The Zod schema to validate against
 * @returns Normalized response data
 */
export const normalizeResponse = <T extends z.ZodType>(
    data: ApiResponse | z.infer<T>,
    schema: T,
): z.infer<T> => {
    if (schema.safeParse(data).success) return data as z.infer<T>;

    // Extract the body/result from the API response
    const responseData = (data as ApiResponse).body || (data as ApiResponse).result || data;
    return schema.parse(responseData);
};

/**
 * Normalizes the profile response
 * @param data The raw API response data
 * @returns Normalized response
 */
export const normalizeProfileResponse = (
    data: ApiResponse<ProfileResponse> | ProfileResponse,
): ProfileResponse => {
    return normalizeResponse(data, profileResponseSchema);
};

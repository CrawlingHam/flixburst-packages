/**
 * Type for API response data that includes a service identifier
 */
export declare type ApiResponse<T = unknown> = {
    statusCode?: number;
    service?: string;
    message?: string;
    status?: number;
    result?: T;
    body?: T;
};

/** Base error for all eBay API failures. */
export declare class EbayError extends Error {
    readonly status: number;
    readonly errorId?: string;
    readonly errors?: EbayApiError[];
    readonly details?: unknown;
    constructor(message: string, status: number, details?: unknown);
}
export interface EbayApiError {
    errorId: number;
    domain: string;
    category: string;
    message: string;
    longMessage?: string;
    parameters?: Array<{
        name: string;
        value: string;
    }>;
}
/** Thrown when a request times out. */
export declare class EbayTimeoutError extends EbayError {
    constructor(method: string, url: string, timeoutMs: number);
}
/** Thrown when rate limit is exceeded (429). */
export declare class EbayRateLimitError extends EbayError {
    readonly retryAfterMs?: number;
    constructor(message: string, details?: unknown, retryAfterMs?: number);
}
/** Thrown when OAuth token request fails. */
export declare class EbayAuthError extends EbayError {
    constructor(message: string, status: number, details?: unknown);
}
//# sourceMappingURL=errors.d.ts.map
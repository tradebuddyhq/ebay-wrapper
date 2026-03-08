import type { Environment } from "./types.js";
export declare const BASE_URLS: {
    readonly production: {
        readonly api: "https://api.ebay.com";
        readonly oauth: "https://api.ebay.com/identity/v1/oauth2/token";
    };
    readonly sandbox: {
        readonly api: "https://api.sandbox.ebay.com";
        readonly oauth: "https://api.sandbox.ebay.com/identity/v1/oauth2/token";
    };
};
export declare function getBaseUrls(env: Environment): {
    readonly api: "https://api.ebay.com";
    readonly oauth: "https://api.ebay.com/identity/v1/oauth2/token";
} | {
    readonly api: "https://api.sandbox.ebay.com";
    readonly oauth: "https://api.sandbox.ebay.com/identity/v1/oauth2/token";
};
export interface HttpClientOptions {
    /** Max retries on 429 / 5xx. Default: 3 */
    maxRetries?: number;
    /** Base delay between retries in ms. Default: 1000 */
    retryBaseDelayMs?: number;
    /** Requests per second limit. Default: 5 */
    rateLimitPerSecond?: number;
}
export interface RequestOptions {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: string;
    timeoutMs: number;
}
export declare class HttpClient {
    private readonly rateLimiter;
    private readonly maxRetries;
    private readonly retryBaseDelayMs;
    constructor(opts?: HttpClientOptions);
    request<T>(opts: RequestOptions): Promise<T>;
    private execute;
    private getRetryDelay;
}
/** Standalone request function for backward compatibility. */
export declare function requestJson<T>(opts: RequestOptions): Promise<T>;
//# sourceMappingURL=http.d.ts.map
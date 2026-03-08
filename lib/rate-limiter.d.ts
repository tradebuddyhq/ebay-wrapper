/**
 * Token-bucket rate limiter.
 * Ensures requests stay within eBay's call limits.
 */
export declare class RateLimiter {
    private tokens;
    private readonly maxTokens;
    private readonly refillRateMs;
    private lastRefill;
    private readonly queue;
    constructor(requestsPerSecond: number);
    acquire(): Promise<void>;
    private refill;
    private processQueue;
}
//# sourceMappingURL=rate-limiter.d.ts.map
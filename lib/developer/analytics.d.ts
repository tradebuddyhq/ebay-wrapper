import { BaseAPI } from "../base-api.js";
import type { RateLimitResponse } from "../types.js";
/**
 * eBay Developer Analytics API — check API rate limits and usage.
 * @see https://developer.ebay.com/api-docs/developer/analytics/overview.html
 */
export declare class DeveloperAnalyticsAPI extends BaseAPI {
    private static readonly BASE;
    /** Get rate limits for all APIs or a specific API context. */
    getRateLimits(apiContext?: string, apiName?: string): Promise<RateLimitResponse>;
}
//# sourceMappingURL=analytics.d.ts.map
import { BaseAPI } from "../base-api.js";
/**
 * eBay Developer Analytics API — check API rate limits and usage.
 * @see https://developer.ebay.com/api-docs/developer/analytics/overview.html
 */
export class DeveloperAnalyticsAPI extends BaseAPI {
    static BASE = "/developer/analytics/v1_beta";
    /** Get rate limits for all APIs or a specific API context. */
    async getRateLimits(apiContext, apiName) {
        return this.get(`${this.ctx.baseUrl}${DeveloperAnalyticsAPI.BASE}/rate_limit`, {
            ...(apiContext ? { api_context: apiContext } : {}),
            ...(apiName ? { api_name: apiName } : {}),
        });
    }
}
//# sourceMappingURL=analytics.js.map
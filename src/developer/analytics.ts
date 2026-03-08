import { BaseAPI } from "../base-api.js";
import type { RateLimitResponse } from "../types.js";

/**
 * eBay Developer Analytics API — check API rate limits and usage.
 * @see https://developer.ebay.com/api-docs/developer/analytics/overview.html
 */
export class DeveloperAnalyticsAPI extends BaseAPI {
  private static readonly BASE = "/developer/analytics/v1_beta";

  /** Get rate limits for all APIs or a specific API context. */
  async getRateLimits(apiContext?: string, apiName?: string): Promise<RateLimitResponse> {
    return this.get<RateLimitResponse>(
      `${this.ctx.baseUrl}${DeveloperAnalyticsAPI.BASE}/rate_limit`,
      {
        ...(apiContext ? { api_context: apiContext } : {}),
        ...(apiName ? { api_name: apiName } : {}),
      },
    );
  }
}

import { BaseAPI } from "../base-api.js";
import type { MarketplaceInsightsSearchParams, MarketplaceInsightsSearchResponse } from "../types.js";

/**
 * eBay Buy Marketplace Insights API — search sold items for pricing/trend analysis.
 * @see https://developer.ebay.com/api-docs/buy/marketplace-insights/overview.html
 */
export class MarketplaceInsightsAPI extends BaseAPI {
  private static readonly BASE = "/buy/marketplace_insights/v1_beta";

  /** Search sold items for market analysis. */
  async search(params: MarketplaceInsightsSearchParams): Promise<MarketplaceInsightsSearchResponse> {
    return this.get<MarketplaceInsightsSearchResponse>(
      `${this.ctx.baseUrl}${MarketplaceInsightsAPI.BASE}/item_sales/search`,
      params as Record<string, string | number | undefined>,
    );
  }
}

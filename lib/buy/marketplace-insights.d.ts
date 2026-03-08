import { BaseAPI } from "../base-api.js";
import type { MarketplaceInsightsSearchParams, MarketplaceInsightsSearchResponse } from "../types.js";
/**
 * eBay Buy Marketplace Insights API — search sold items for pricing/trend analysis.
 * @see https://developer.ebay.com/api-docs/buy/marketplace-insights/overview.html
 */
export declare class MarketplaceInsightsAPI extends BaseAPI {
    private static readonly BASE;
    /** Search sold items for market analysis. */
    search(params: MarketplaceInsightsSearchParams): Promise<MarketplaceInsightsSearchResponse>;
}
//# sourceMappingURL=marketplace-insights.d.ts.map
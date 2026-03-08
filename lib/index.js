import { HttpClient, getBaseUrls } from "./http.js";
import { OAuthClient } from "./oauth.js";
import { BrowseAPI } from "./buy/browse.js";
import { OrderAPI } from "./buy/order.js";
import { MarketplaceInsightsAPI } from "./buy/marketplace-insights.js";
import { InventoryAPI } from "./sell/inventory.js";
import { FulfillmentAPI } from "./sell/fulfillment.js";
import { AccountAPI } from "./sell/account.js";
import { MarketingAPI } from "./sell/marketing.js";
import { FinancesAPI } from "./sell/finances.js";
import { TaxonomyAPI } from "./commerce/taxonomy.js";
import { CatalogAPI } from "./commerce/catalog.js";
import { DeveloperAnalyticsAPI } from "./developer/analytics.js";
/**
 * Main eBay API client.
 *
 * @example
 * ```ts
 * import { Client } from '@tradebuddyhq/ebay-wrapper';
 *
 * const client = new Client({
 *   clientId: process.env.EBAY_CLIENT_ID!,
 *   clientSecret: process.env.EBAY_CLIENT_SECRET!,
 *   marketplaceId: 'EBAY_US',
 * });
 *
 * // Browse items
 * const results = await client.buy.browse.search({ q: 'laptop', limit: 10 });
 *
 * // Get category suggestions
 * const cats = await client.commerce.taxonomy.getCategorySuggestions('0', 'laptop');
 *
 * // Sell APIs (requires user-level OAuth)
 * const orders = await client.sell.fulfillment.getOrders();
 * ```
 */
export class Client {
    buy;
    sell;
    commerce;
    developer;
    oauth;
    constructor(options) {
        const env = options.env ?? "production";
        const { api: baseUrl } = getBaseUrls(env);
        const httpOpts = {
            maxRetries: options.maxRetries,
            rateLimitPerSecond: options.rateLimitPerSecond,
        };
        const http = new HttpClient(httpOpts);
        const oauth = new OAuthClient(options);
        const ctx = { opts: options, oauth, http, baseUrl };
        this.oauth = oauth;
        this.buy = {
            browse: new BrowseAPI(ctx),
            order: new OrderAPI(ctx),
            marketplaceInsights: new MarketplaceInsightsAPI(ctx),
        };
        this.sell = {
            inventory: new InventoryAPI(ctx),
            fulfillment: new FulfillmentAPI(ctx),
            account: new AccountAPI(ctx),
            marketing: new MarketingAPI(ctx),
            finances: new FinancesAPI(ctx),
        };
        this.commerce = {
            taxonomy: new TaxonomyAPI(ctx),
            catalog: new CatalogAPI(ctx),
        };
        this.developer = {
            analytics: new DeveloperAnalyticsAPI(ctx),
        };
    }
}
// ── Re-exports ──────────────────────────────────────────────
export { EbayError, EbayTimeoutError, EbayRateLimitError, EbayAuthError } from "./errors.js";
export { OAuthClient } from "./oauth.js";
export { HttpClient } from "./http.js";
export { RateLimiter } from "./rate-limiter.js";
export { paginate, paginateAll } from "./pagination.js";
// API classes
export { BrowseAPI } from "./buy/browse.js";
export { OrderAPI } from "./buy/order.js";
export { MarketplaceInsightsAPI } from "./buy/marketplace-insights.js";
export { InventoryAPI } from "./sell/inventory.js";
export { FulfillmentAPI } from "./sell/fulfillment.js";
export { AccountAPI } from "./sell/account.js";
export { MarketingAPI } from "./sell/marketing.js";
export { FinancesAPI } from "./sell/finances.js";
export { TaxonomyAPI } from "./commerce/taxonomy.js";
export { CatalogAPI } from "./commerce/catalog.js";
export { DeveloperAnalyticsAPI } from "./developer/analytics.js";
//# sourceMappingURL=index.js.map
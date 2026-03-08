import { OAuthClient } from "./oauth.js";
import type { ClientOptions } from "./types.js";
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
export declare class Client {
    readonly buy: {
        browse: BrowseAPI;
        order: OrderAPI;
        marketplaceInsights: MarketplaceInsightsAPI;
    };
    readonly sell: {
        inventory: InventoryAPI;
        fulfillment: FulfillmentAPI;
        account: AccountAPI;
        marketing: MarketingAPI;
        finances: FinancesAPI;
    };
    readonly commerce: {
        taxonomy: TaxonomyAPI;
        catalog: CatalogAPI;
    };
    readonly developer: {
        analytics: DeveloperAnalyticsAPI;
    };
    readonly oauth: OAuthClient;
    constructor(options: ClientOptions);
}
export { EbayError, EbayTimeoutError, EbayRateLimitError, EbayAuthError } from "./errors.js";
export { OAuthClient } from "./oauth.js";
export { HttpClient } from "./http.js";
export { RateLimiter } from "./rate-limiter.js";
export { paginate, paginateAll } from "./pagination.js";
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
export type { Environment, ClientOptions, OAuthToken, UserAccessToken, Amount, ConvertedAmount, Image, Address, Contact, PhoneNumber, PagedResult, TimeDuration, BrowseSearchParams, ItemSummary, ItemDetail, SearchResponse, ItemGroupResponse, CompatibilityPayload, CompatibilityResponse, Seller, ShippingOption, MarketingPrice, EstimatedAvailability, Tax, TaxJurisdiction, GuestCheckoutSessionRequest, CheckoutSession, PurchaseOrderResponse, UpdateQuantityRequest, UpdateShippingAddressRequest, UpdatePaymentRequest, MarketplaceInsightsSearchParams, MarketplaceInsightsSearchResponse, SoldItemSummary, InventoryItem, InventoryItemResponse, InventoryItemsResponse, BulkInventoryItemRequest, BulkInventoryItemResponse, BulkPriceQuantityRequest, BulkPriceQuantityResponse, Offer, OfferResponse, OffersResponse, PublishResponse, WithdrawResponse, InventoryItemGroup, BulkMigrateListingRequest, BulkMigrateListingResponse, OrderSearchParams, Order, OrdersResponse, LineItem, ShippingFulfillment, ShippingFulfillmentsResponse, CreateShippingFulfillmentRequest, IssueRefundRequest, RefundResponse, FulfillmentPolicy, FulfillmentPoliciesResponse, PaymentPolicy, PaymentPoliciesResponse, ReturnPolicy, ReturnPoliciesResponse, SalesTax, SalesTaxesResponse, PrivilegesResponse, ProgramResponse, OptedInProgramsResponse, Campaign, CampaignsResponse, PromotionDetail, PromotionsResponse, Ad, AdsResponse, CreateAdRequest, CreateAdsByInventoryReferenceRequest, BulkCreateAdsByListingIdRequest, BulkCreateAdsResponse, TransactionSearchParams, Transaction, TransactionsResponse, PayoutSearchParams, Payout, PayoutsResponse, PayoutSummaryResponse, TransferSearchParams, Transfer, TransfersResponse, SellerFundsSummaryResponse, CategoryTree, CategoryTreeNode, CategorySuggestion, CategorySuggestionsResponse, CategorySubtree, AspectMetadata, CompatibilityProperty, CompatibilityPropertiesResponse, CompatibilityPropertyValue, CompatibilityPropertyValuesResponse, DefaultCategoryTreeIdResponse, CatalogSearchParams, CatalogProduct, CatalogSearchResponse, RateLimitResponse, } from "./types.js";
//# sourceMappingURL=index.d.ts.map
# ebay API Wrapper

A comprehensive, fully-typed TypeScript wrapper for the eBay REST APIs. (zero runtime dependencies, uses native `fetch`.

## Features

- **13 API modules** — Browse, Order, Marketplace Insights, Inventory, Fulfillment, Account, Marketing, Finances, Taxonomy, Catalog, Developer Analytics
- **100+ typed endpoints** with full request/response types
- **OAuth 2.0** — Client Credentials (app tokens) + Authorization Code Grant (user tokens)
- **Automatic token caching** with refresh-ahead
- **Rate limiting** — configurable token-bucket limiter
- **Retry with exponential backoff** — automatic retry on 429/5xx with jitter
- **Auto-pagination** — async iterators for paginated endpoints
- **Sandbox support** — toggle between production and sandbox environments
- **Zero dependencies** — uses native `fetch` (Node.js 18+)

## Install

```bash
npm install @tradebuddyhq/ebay-wrapper
```

## Quick Start

```ts
import { Client } from "@tradebuddyhq/ebay-wrapper";

const client = new Client({
  clientId: process.env.EBAY_CLIENT_ID!,
  clientSecret: process.env.EBAY_CLIENT_SECRET!,
  marketplaceId: "EBAY_US",
});

// Search for items
const results = await client.buy.browse.search({
  q: "mechanical keyboard",
  limit: 5,
});

for (const item of results.itemSummaries ?? []) {
  console.log(`${item.title} — ${item.price?.value} ${item.price?.currency}`);
}
```

## Configuration

```ts
const client = new Client({
  // Required
  clientId: "your-client-id",
  clientSecret: "your-client-secret",

  // Optional
  env: "production",        // "production" | "sandbox"
  marketplaceId: "EBAY_US", // eBay marketplace header
  acceptLanguage: "en-US",  // Accept-Language header
  timeoutMs: 15000,         // Request timeout (ms)
  maxRetries: 3,            // Retry attempts on 429/5xx
  rateLimitPerSecond: 5,    // Requests per second limit
  userAgent: "MyApp/1.0",   // Custom User-Agent

  // For user-level APIs (Sell APIs)
  refreshToken: "...",      // User OAuth refresh token
  accessToken: "...",       // Or supply a token directly
});
```

## API Reference

### Buy APIs

```ts
// Browse — search and view items
client.buy.browse.search(params)
client.buy.browse.getItem(itemId)
client.buy.browse.getItemByLegacyId(legacyItemId, options?)
client.buy.browse.getItems(itemIds)
client.buy.browse.getItemsByItemGroup(itemGroupId)
client.buy.browse.checkCompatibility(itemId, payload)

// Order — guest checkout
client.buy.order.initiateGuestCheckoutSession(request)
client.buy.order.getGuestCheckoutSession(sessionId)
client.buy.order.updateGuestQuantity(sessionId, request)
client.buy.order.updateGuestShippingAddress(sessionId, request)
client.buy.order.updateGuestPayment(sessionId, request)
client.buy.order.placeGuestOrder(sessionId)
client.buy.order.getGuestPurchaseOrder(orderId)

// Marketplace Insights — sold item analytics
client.buy.marketplaceInsights.search(params)
```

### Sell APIs

Sell APIs require user-level OAuth. Pass a `refreshToken` in the client config

```ts
// Inventory — manage listings
client.sell.inventory.createOrReplaceInventoryItem(sku, item)
client.sell.inventory.getInventoryItem(sku)
client.sell.inventory.getInventoryItems(params?)
client.sell.inventory.deleteInventoryItem(sku)
client.sell.inventory.bulkCreateOrReplaceInventoryItem(request)
client.sell.inventory.bulkUpdatePriceQuantity(request)
client.sell.inventory.createOffer(offer)
client.sell.inventory.getOffer(offerId)
client.sell.inventory.getOffers(params?)
client.sell.inventory.updateOffer(offerId, offer)
client.sell.inventory.deleteOffer(offerId)
client.sell.inventory.publishOffer(offerId)
client.sell.inventory.withdrawOffer(offerId)
client.sell.inventory.publishOfferByInventoryItemGroup(key)
client.sell.inventory.withdrawOfferByInventoryItemGroup(key)
client.sell.inventory.createOrReplaceInventoryItemGroup(key, group)
client.sell.inventory.getInventoryItemGroup(key)
client.sell.inventory.deleteInventoryItemGroup(key)
client.sell.inventory.bulkMigrateListing(request)

// Fulfillment — orders and shipping
client.sell.fulfillment.getOrders(params?)
client.sell.fulfillment.getOrder(orderId)
client.sell.fulfillment.getShippingFulfillments(orderId)
client.sell.fulfillment.getShippingFulfillment(orderId, fulfillmentId)
client.sell.fulfillment.createShippingFulfillment(orderId, request)
client.sell.fulfillment.issueRefund(orderId, request)

// Account — seller policies
client.sell.account.getPrivileges()
client.sell.account.getOptedInPrograms()
client.sell.account.optInToProgram(programType)
client.sell.account.optOutOfProgram(programType)
client.sell.account.getFulfillmentPolicies(marketplaceId)
client.sell.account.getFulfillmentPolicy(policyId)
client.sell.account.createFulfillmentPolicy(policy)
client.sell.account.updateFulfillmentPolicy(policyId, policy)
client.sell.account.deleteFulfillmentPolicy(policyId)
client.sell.account.getPaymentPolicies(marketplaceId)
client.sell.account.createPaymentPolicy(policy)
client.sell.account.updatePaymentPolicy(policyId, policy)
client.sell.account.deletePaymentPolicy(policyId)
client.sell.account.getReturnPolicies(marketplaceId)
client.sell.account.createReturnPolicy(policy)
client.sell.account.updateReturnPolicy(policyId, policy)
client.sell.account.deleteReturnPolicy(policyId)
client.sell.account.getSalesTaxes(countryCode)
client.sell.account.createOrReplaceSalesTax(countryCode, jurisdictionId, salesTax)
client.sell.account.deleteSalesTax(countryCode, jurisdictionId)

// Marketing — Promoted Listings & promotions
client.sell.marketing.getCampaigns(params?)
client.sell.marketing.getCampaign(campaignId)
client.sell.marketing.createCampaign(campaign)
client.sell.marketing.updateCampaign(campaignId, campaign)
client.sell.marketing.deleteCampaign(campaignId)
client.sell.marketing.pauseCampaign(campaignId)
client.sell.marketing.resumeCampaign(campaignId)
client.sell.marketing.endCampaign(campaignId)
client.sell.marketing.getAds(campaignId, params?)
client.sell.marketing.createAd(campaignId, request)
client.sell.marketing.bulkCreateAdsByListingId(campaignId, request)
client.sell.marketing.deleteAd(campaignId, adId)
client.sell.marketing.getPromotions(params?)
client.sell.marketing.createPromotion(promotion)
client.sell.marketing.updatePromotion(promotionId, promotion)
client.sell.marketing.deletePromotion(promotionId)

// Finances — payouts, transactions, transfers
client.sell.finances.getTransactions(params?)
client.sell.finances.getTransaction(transactionId)
client.sell.finances.getPayouts(params?)
client.sell.finances.getPayout(payoutId)
client.sell.finances.getPayoutSummary(filter?)
client.sell.finances.getTransfers(params?)
client.sell.finances.getTransfer(transferId)
client.sell.finances.getSellerFundsSummary()
```

### Commerce APIs

```ts
// Taxonomy — category trees and aspects
client.commerce.taxonomy.getDefaultCategoryTreeId(marketplaceId)
client.commerce.taxonomy.getCategoryTree(categoryTreeId)
client.commerce.taxonomy.getCategorySubtree(categoryTreeId, categoryId)
client.commerce.taxonomy.getCategorySuggestions(categoryTreeId, query)
client.commerce.taxonomy.getItemAspectsForCategory(categoryTreeId, categoryId)
client.commerce.taxonomy.getCompatibilityProperties(categoryTreeId, categoryId)
client.commerce.taxonomy.getCompatibilityPropertyValues(categoryTreeId, categoryId, propertyName)

// Catalog — product search
client.commerce.catalog.search(params)
client.commerce.catalog.getProduct(epid)
```

### Developer APIs

```ts
// Analytics — rate limit info
client.developer.analytics.getRateLimits(apiContext?, apiName?)
```

## OAuth: User Authorization Flow

For Sell APIs, you need user-level tokens via the Authorization Code Grant:

```ts
const client = new Client({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

// 1. generate the authorization URL
const authUrl = client.oauth.generateAuthUrl(
  "https://yourapp.com/callback",
  undefined, // default scopes for all Sell APIs
  "optional-state",
);
// redirect the user to authUrl

// 2. exchange the code (from the callback) for tokens
const tokens = await client.oauth.exchangeCodeForToken(
  "authorization-code-from-callback",
  "https://yourapp.com/callback",
);
// tokens.access_token, tokens.refresh_token

// 3. use the refresh token in future client instances
const authedClient = new Client({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  refreshToken: tokens.refresh_token,
});

const orders = await authedClient.sell.fulfillment.getOrders();
```

## Pagination

Auto paginate through results with async iterators:

```ts
import { paginate, paginateAll } from "@tradebuddyhq/ebay-wrapper";

// iterate page by page
for await (const page of paginate(
  (p) => client.buy.browse.search(p),
  { q: "laptop", limit: 50 },
)) {
  console.log(page.itemSummaries?.length, "items");
}

// or collect everything into one array
const allItems = await paginateAll(
  (p) => client.buy.browse.search(p),
  { q: "laptop", limit: 200 },
  (page) => page.itemSummaries,
);
```

## Error Handling

```ts
import { EbayError, EbayRateLimitError, EbayAuthError, EbayTimeoutError } from "@tradebuddyhq/ebay-wrapper";

try {
  await client.buy.browse.getItem("invalid-id");
} catch (err) {
  if (err instanceof EbayRateLimitError) {
    console.log("Rate limited, retry after:", err.retryAfterMs, "ms");
  } else if (err instanceof EbayAuthError) {
    console.log("Authentication failed");
  } else if (err instanceof EbayTimeoutError) {
    console.log("Request timed out");
  } else if (err instanceof EbayError) {
    console.log("eBay error:", err.status, err.errorId, err.errors);
  }
}
```

## Development

```bash
npm install
npm run build
npm test
npm run test:coverage
```

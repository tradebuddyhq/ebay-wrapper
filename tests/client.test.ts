import { describe, expect, it } from "vitest";
import { Client, EbayError, EbayAuthError, EbayRateLimitError, EbayTimeoutError, OAuthClient, HttpClient, RateLimiter, paginate, paginateAll } from "../src/index.js";

describe("Client", () => {
  it("should create a client with all API namespaces", () => {
    const client = new Client({
      clientId: "test-id",
      clientSecret: "test-secret",
    });

    // Buy APIs
    expect(client.buy.browse).toBeDefined();
    expect(client.buy.order).toBeDefined();
    expect(client.buy.marketplaceInsights).toBeDefined();

    // Sell APIs
    expect(client.sell.inventory).toBeDefined();
    expect(client.sell.fulfillment).toBeDefined();
    expect(client.sell.account).toBeDefined();
    expect(client.sell.marketing).toBeDefined();
    expect(client.sell.finances).toBeDefined();

    // Commerce APIs
    expect(client.commerce.taxonomy).toBeDefined();
    expect(client.commerce.catalog).toBeDefined();

    // Developer APIs
    expect(client.developer.analytics).toBeDefined();

    // OAuth
    expect(client.oauth).toBeDefined();
  });

  it("should use production URLs by default", () => {
    const client = new Client({
      clientId: "id",
      clientSecret: "secret",
    });
    expect(client).toBeDefined();
  });

  it("should accept sandbox environment", () => {
    const client = new Client({
      clientId: "id",
      clientSecret: "secret",
      env: "sandbox",
    });
    expect(client).toBeDefined();
  });

  it("should accept all configuration options", () => {
    const client = new Client({
      clientId: "id",
      clientSecret: "secret",
      env: "production",
      marketplaceId: "EBAY_US",
      acceptLanguage: "en-US",
      accessToken: "token",
      refreshToken: "refresh",
      timeoutMs: 30000,
      userAgent: "MyApp/1.0",
      maxRetries: 5,
      rateLimitPerSecond: 10,
    });
    expect(client).toBeDefined();
  });
});

describe("Exports", () => {
  it("should export all error classes", () => {
    expect(EbayError).toBeDefined();
    expect(EbayAuthError).toBeDefined();
    expect(EbayRateLimitError).toBeDefined();
    expect(EbayTimeoutError).toBeDefined();
  });

  it("should export infrastructure classes", () => {
    expect(OAuthClient).toBeDefined();
    expect(HttpClient).toBeDefined();
    expect(RateLimiter).toBeDefined();
  });

  it("should export pagination utilities", () => {
    expect(paginate).toBeDefined();
    expect(paginateAll).toBeDefined();
  });
});

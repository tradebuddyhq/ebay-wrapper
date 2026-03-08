import { describe, expect, it } from "vitest";
import { EbayError, EbayAuthError, EbayRateLimitError, EbayTimeoutError } from "../src/errors.js";

describe("EbayError", () => {
  it("should create basic error with status and details", () => {
    const err = new EbayError("test error", 404, { message: "not found" });
    expect(err.message).toBe("test error");
    expect(err.status).toBe(404);
    expect(err.details).toEqual({ message: "not found" });
    expect(err.name).toBe("EbayError");
  });

  it("should extract errorId from eBay error response", () => {
    const details = {
      errors: [{ errorId: 11001, domain: "API_BROWSE", category: "REQUEST", message: "Invalid value" }],
    };
    const err = new EbayError("test", 400, details);
    expect(err.errorId).toBe("11001");
    expect(err.errors).toHaveLength(1);
  });

  it("should be an instance of Error", () => {
    const err = new EbayError("test", 500);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(EbayError);
  });
});

describe("EbayTimeoutError", () => {
  it("should include timeout info", () => {
    const err = new EbayTimeoutError("GET", "https://api.ebay.com/test", 15000);
    expect(err.name).toBe("EbayTimeoutError");
    expect(err.message).toContain("15000ms");
    expect(err.status).toBe(0);
  });
});

describe("EbayRateLimitError", () => {
  it("should include retry-after info", () => {
    const err = new EbayRateLimitError("rate limited", undefined, 5000);
    expect(err.name).toBe("EbayRateLimitError");
    expect(err.status).toBe(429);
    expect(err.retryAfterMs).toBe(5000);
  });
});

describe("EbayAuthError", () => {
  it("should be identifiable as auth error", () => {
    const err = new EbayAuthError("invalid credentials", 401);
    expect(err.name).toBe("EbayAuthError");
    expect(err.status).toBe(401);
    expect(err).toBeInstanceOf(EbayError);
  });
});

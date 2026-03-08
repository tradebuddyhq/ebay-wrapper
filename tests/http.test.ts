import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HttpClient } from "../src/http.js";
import { EbayError, EbayRateLimitError, EbayTimeoutError } from "../src/errors.js";

describe("HttpClient", () => {
  const client = new HttpClient({ maxRetries: 2, rateLimitPerSecond: 100, retryBaseDelayMs: 10 });

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should parse JSON responses", async () => {
    const mockResponse = { itemId: "v1|123" };
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

    const result = await client.request<typeof mockResponse>({
      url: "https://api.ebay.com/test",
      method: "GET",
      timeoutMs: 5000,
    });

    expect(result).toEqual(mockResponse);
  });

  it("should return undefined for 204 responses", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 204 }));

    const result = await client.request({
      url: "https://api.ebay.com/test",
      method: "DELETE",
      timeoutMs: 5000,
    });

    expect(result).toBeUndefined();
  });

  it("should throw EbayError for 4xx responses", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ errors: [{ errorId: 11001, domain: "test", category: "REQUEST", message: "Not found" }] }), {
        status: 404,
        headers: { "content-type": "application/json" },
      }),
    );

    await expect(
      client.request({ url: "https://api.ebay.com/test", method: "GET", timeoutMs: 5000 }),
    ).rejects.toThrow(EbayError);
  });

  it("should throw EbayRateLimitError for 429 responses", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("rate limited", {
        status: 429,
        headers: { "retry-after": "2" },
      }),
    );

    await expect(
      client.request({ url: "https://api.ebay.com/test", method: "GET", timeoutMs: 5000 }),
    ).rejects.toThrow(EbayRateLimitError);
  });

  it("should retry on 5xx errors", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response("error", { status: 503 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );

    const result = await client.request<{ ok: boolean }>({
      url: "https://api.ebay.com/test",
      method: "GET",
      timeoutMs: 5000,
    });

    expect(result).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("should handle text responses", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("plain text", {
        status: 200,
        headers: { "content-type": "text/plain" },
      }),
    );

    const result = await client.request<string>({
      url: "https://api.ebay.com/test",
      method: "GET",
      timeoutMs: 5000,
    });

    expect(result).toBe("plain text");
  });

  it("should send correct headers and body", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

    await client.request({
      url: "https://api.ebay.com/test",
      method: "POST",
      headers: { Authorization: "Bearer token123", "Content-Type": "application/json" },
      body: JSON.stringify({ data: "test" }),
      timeoutMs: 5000,
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.ebay.com/test",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer token123" }),
        body: '{"data":"test"}',
      }),
    );
  });
});

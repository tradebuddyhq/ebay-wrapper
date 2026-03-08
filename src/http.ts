import { EbayError, EbayRateLimitError, EbayTimeoutError } from "./errors.js";
import { RateLimiter } from "./rate-limiter.js";
import type { Environment } from "./types.js";

export const BASE_URLS = {
  production: {
    api: "https://api.ebay.com",
    oauth: "https://api.ebay.com/identity/v1/oauth2/token",
  },
  sandbox: {
    api: "https://api.sandbox.ebay.com",
    oauth: "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
  },
} as const;

export function getBaseUrls(env: Environment) {
  return BASE_URLS[env];
}

export interface HttpClientOptions {
  /** Max retries on 429 / 5xx. Default: 3 */
  maxRetries?: number;
  /** Base delay between retries in ms. Default: 1000 */
  retryBaseDelayMs?: number;
  /** Requests per second limit. Default: 5 */
  rateLimitPerSecond?: number;
}

export interface RequestOptions {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
  timeoutMs: number;
}

const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

export class HttpClient {
  private readonly rateLimiter: RateLimiter;
  private readonly maxRetries: number;
  private readonly retryBaseDelayMs: number;

  constructor(opts: HttpClientOptions = {}) {
    this.rateLimiter = new RateLimiter(opts.rateLimitPerSecond ?? 5);
    this.maxRetries = opts.maxRetries ?? 3;
    this.retryBaseDelayMs = opts.retryBaseDelayMs ?? 1_000;
  }

  async request<T>(opts: RequestOptions): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      await this.rateLimiter.acquire();

      try {
        return await this.execute<T>(opts);
      } catch (err) {
        lastError = err as Error;

        if (err instanceof EbayTimeoutError) throw err;

        if (err instanceof EbayError && RETRYABLE_STATUS.has(err.status)) {
          if (attempt < this.maxRetries) {
            const delay = this.getRetryDelay(err, attempt);
            await sleep(delay);
            continue;
          }
        }

        throw err;
      }
    }

    throw lastError ?? new Error("Unexpected retry exhaustion");
  }

  private async execute<T>(opts: RequestOptions): Promise<T> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs);

    try {
      const res = await fetch(opts.url, {
        method: opts.method,
        headers: opts.headers,
        body: opts.body,
        signal: ctrl.signal,
      });

      const contentType = res.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");

      if (res.status >= 200 && res.status < 300) {
        if (res.status === 204) return undefined as T;
        if (!isJson) return (await res.text()) as unknown as T;
        return (await res.json()) as T;
      }

      let details: unknown;
      try {
        details = isJson ? await res.json() : await res.text();
      } catch {
        /* ignore parse errors */
      }

      const msg = `eBay API error ${res.status}: ${opts.method} ${opts.url}`;

      if (res.status === 429) {
        const retryAfter = res.headers.get("retry-after");
        const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1_000 : undefined;
        throw new EbayRateLimitError(msg, details, retryMs);
      }

      throw new EbayError(msg, res.status, details);
    } catch (err) {
      if (err instanceof EbayError) throw err;
      if ((err as Error).name === "AbortError") {
        throw new EbayTimeoutError(opts.method, opts.url, opts.timeoutMs);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  private getRetryDelay(err: Error, attempt: number): number {
    if (err instanceof EbayRateLimitError && err.retryAfterMs) {
      return err.retryAfterMs;
    }
    const jitter = Math.random() * 200;
    return this.retryBaseDelayMs * Math.pow(2, attempt) + jitter;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Standalone request function for backward compatibility. */
export async function requestJson<T>(opts: RequestOptions): Promise<T> {
  const client = new HttpClient({ maxRetries: 0, rateLimitPerSecond: 100 });
  return client.request<T>(opts);
}

/** Base error for all eBay API failures. */
export class EbayError extends Error {
  public readonly status: number;
  public readonly errorId?: string;
  public readonly errors?: EbayApiError[];
  public readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "EbayError";
    this.status = status;
    this.details = details;

    if (details && typeof details === "object" && "errors" in details) {
      this.errors = (details as { errors: EbayApiError[] }).errors;
      if (this.errors?.[0]?.errorId) {
        this.errorId = String(this.errors[0].errorId);
      }
    }
  }
}

export interface EbayApiError {
  errorId: number;
  domain: string;
  category: string;
  message: string;
  longMessage?: string;
  parameters?: Array<{ name: string; value: string }>;
}

/** Thrown when a request times out. */
export class EbayTimeoutError extends EbayError {
  constructor(method: string, url: string, timeoutMs: number) {
    super(`eBay request timed out after ${timeoutMs}ms: ${method} ${url}`, 0);
    this.name = "EbayTimeoutError";
  }
}

/** Thrown when rate limit is exceeded (429). */
export class EbayRateLimitError extends EbayError {
  public readonly retryAfterMs?: number;

  constructor(message: string, details?: unknown, retryAfterMs?: number) {
    super(message, 429, details);
    this.name = "EbayRateLimitError";
    this.retryAfterMs = retryAfterMs;
  }
}

/** Thrown when OAuth token request fails. */
export class EbayAuthError extends EbayError {
  constructor(message: string, status: number, details?: unknown) {
    super(message, status, details);
    this.name = "EbayAuthError";
  }
}

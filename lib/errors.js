/** Base error for all eBay API failures. */
export class EbayError extends Error {
    status;
    errorId;
    errors;
    details;
    constructor(message, status, details) {
        super(message);
        this.name = "EbayError";
        this.status = status;
        this.details = details;
        if (details && typeof details === "object" && "errors" in details) {
            this.errors = details.errors;
            if (this.errors?.[0]?.errorId) {
                this.errorId = String(this.errors[0].errorId);
            }
        }
    }
}
/** Thrown when a request times out. */
export class EbayTimeoutError extends EbayError {
    constructor(method, url, timeoutMs) {
        super(`eBay request timed out after ${timeoutMs}ms: ${method} ${url}`, 0);
        this.name = "EbayTimeoutError";
    }
}
/** Thrown when rate limit is exceeded (429). */
export class EbayRateLimitError extends EbayError {
    retryAfterMs;
    constructor(message, details, retryAfterMs) {
        super(message, 429, details);
        this.name = "EbayRateLimitError";
        this.retryAfterMs = retryAfterMs;
    }
}
/** Thrown when OAuth token request fails. */
export class EbayAuthError extends EbayError {
    constructor(message, status, details) {
        super(message, status, details);
        this.name = "EbayAuthError";
    }
}
//# sourceMappingURL=errors.js.map
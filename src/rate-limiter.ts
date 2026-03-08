/**
 * Token-bucket rate limiter.
 * Ensures requests stay within eBay's call limits.
 */
export class RateLimiter {
  private tokens: number;
  private readonly maxTokens: number;
  private readonly refillRateMs: number;
  private lastRefill: number;
  private readonly queue: Array<() => void> = [];

  constructor(requestsPerSecond: number) {
    this.maxTokens = requestsPerSecond;
    this.tokens = requestsPerSecond;
    this.refillRateMs = 1_000 / requestsPerSecond;
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }
    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
      setTimeout(() => this.processQueue(), this.refillRateMs);
    });
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const newTokens = elapsed / this.refillRateMs;
    this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
    this.lastRefill = now;
  }

  private processQueue(): void {
    this.refill();
    while (this.queue.length > 0 && this.tokens >= 1) {
      this.tokens -= 1;
      const next = this.queue.shift();
      next?.();
    }
    if (this.queue.length > 0) {
      setTimeout(() => this.processQueue(), this.refillRateMs);
    }
  }
}

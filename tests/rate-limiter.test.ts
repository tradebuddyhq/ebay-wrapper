import { describe, expect, it } from "vitest";
import { RateLimiter } from "../src/rate-limiter.js";

describe("RateLimiter", () => {
  it("should allow requests up to the limit immediately", async () => {
    const limiter = new RateLimiter(5);
    const start = Date.now();
    for (let i = 0; i < 5; i++) {
      await limiter.acquire();
    }
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });

  it("should delay when tokens are exhausted", async () => {
    const limiter = new RateLimiter(2);
    await limiter.acquire();
    await limiter.acquire();
    const start = Date.now();
    await limiter.acquire();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(200);
  });

  it("should process queued requests in order", async () => {
    const limiter = new RateLimiter(1);
    const order: number[] = [];
    await limiter.acquire();
    const p1 = limiter.acquire().then(() => order.push(1));
    const p2 = limiter.acquire().then(() => order.push(2));
    await Promise.all([p1, p2]);
    expect(order).toEqual([1, 2]);
  });
});

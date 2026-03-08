import { describe, expect, it, vi } from "vitest";
import { paginate, paginateAll } from "../src/pagination.js";

describe("paginate", () => {
  it("should iterate through pages", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ items: [1, 2], total: 5, next: "page2" })
      .mockResolvedValueOnce({ items: [3, 4], total: 5, next: "page3" })
      .mockResolvedValueOnce({ items: [5], total: 5 });

    const pages: Array<{ items: number[] }> = [];
    for await (const page of paginate(fetcher, { limit: 2, offset: 0 })) {
      pages.push(page as { items: number[] });
    }

    expect(pages).toHaveLength(3);
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher).toHaveBeenCalledWith({ limit: 2, offset: 0 });
    expect(fetcher).toHaveBeenCalledWith({ limit: 2, offset: 2 });
    expect(fetcher).toHaveBeenCalledWith({ limit: 2, offset: 4 });
  });

  it("should stop when no next link", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ items: [1, 2], total: 10 });

    const pages = [];
    for await (const page of paginate(fetcher, { limit: 2, offset: 0 })) {
      pages.push(page);
    }

    expect(pages).toHaveLength(1);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});

describe("paginateAll", () => {
  it("should collect all items from paginated results", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ items: ["a", "b"], total: 3, next: "page2" })
      .mockResolvedValueOnce({ items: ["c"], total: 3 });

    const all = await paginateAll(
      fetcher,
      { limit: 2, offset: 0 },
      (page) => (page as { items: string[] }).items,
    );

    expect(all).toEqual(["a", "b", "c"]);
  });

  it("should return empty array when no items", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ total: 0 });

    const all = await paginateAll(
      fetcher,
      { limit: 50, offset: 0 },
      (page) => (page as { items?: string[] }).items,
    );

    expect(all).toEqual([]);
  });
});

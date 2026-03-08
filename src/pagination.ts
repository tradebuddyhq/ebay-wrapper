/**
 * Async iterator that auto-paginates through eBay paged responses.
 *
 * Usage:
 * ```ts
 * for await (const page of paginate(params => client.buy.browse.search(params), { q: 'laptop', limit: 50 })) {
 *   console.log(page.itemSummaries);
 * }
 * ```
 */
export async function* paginate<TParams extends { limit?: number; offset?: number }, TResult extends { total?: number; next?: string; offset?: number; limit?: number }>(
  fetcher: (params: TParams) => Promise<TResult>,
  initialParams: TParams,
): AsyncGenerator<TResult, void, undefined> {
  const limit = initialParams.limit ?? 50;
  let offset = initialParams.offset ?? 0;
  let total = Infinity;

  while (offset < total) {
    const params = { ...initialParams, limit, offset } as TParams;
    const result = await fetcher(params);
    yield result;

    if (result.total !== undefined) {
      total = result.total;
    }

    offset += limit;

    if (!result.next) break;
  }
}

/** Collect all items from a paginated endpoint into a single array. */
export async function paginateAll<TParams extends { limit?: number; offset?: number }, TItem>(
  fetcher: (params: TParams) => Promise<{ total?: number; next?: string; offset?: number; limit?: number }>,
  initialParams: TParams,
  extract: (result: Awaited<ReturnType<typeof fetcher>>) => TItem[] | undefined,
): Promise<TItem[]> {
  const items: TItem[] = [];
  for await (const page of paginate(fetcher, initialParams)) {
    const batch = extract(page);
    if (batch) items.push(...batch);
  }
  return items;
}

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
export async function* paginate(fetcher, initialParams) {
    const limit = initialParams.limit ?? 50;
    let offset = initialParams.offset ?? 0;
    let total = Infinity;
    while (offset < total) {
        const params = { ...initialParams, limit, offset };
        const result = await fetcher(params);
        yield result;
        if (result.total !== undefined) {
            total = result.total;
        }
        offset += limit;
        if (!result.next)
            break;
    }
}
/** Collect all items from a paginated endpoint into a single array. */
export async function paginateAll(fetcher, initialParams, extract) {
    const items = [];
    for await (const page of paginate(fetcher, initialParams)) {
        const batch = extract(page);
        if (batch)
            items.push(...batch);
    }
    return items;
}
//# sourceMappingURL=pagination.js.map
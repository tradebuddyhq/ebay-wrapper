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
export declare function paginate<TParams extends {
    limit?: number;
    offset?: number;
}, TResult extends {
    total?: number;
    next?: string;
    offset?: number;
    limit?: number;
}>(fetcher: (params: TParams) => Promise<TResult>, initialParams: TParams): AsyncGenerator<TResult, void, undefined>;
/** Collect all items from a paginated endpoint into a single array. */
export declare function paginateAll<TParams extends {
    limit?: number;
    offset?: number;
}, TItem>(fetcher: (params: TParams) => Promise<{
    total?: number;
    next?: string;
    offset?: number;
    limit?: number;
}>, initialParams: TParams, extract: (result: Awaited<ReturnType<typeof fetcher>>) => TItem[] | undefined): Promise<TItem[]>;
//# sourceMappingURL=pagination.d.ts.map
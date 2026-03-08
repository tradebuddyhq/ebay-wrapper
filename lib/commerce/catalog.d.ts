import { BaseAPI } from "../base-api.js";
import type { CatalogProduct, CatalogSearchParams, CatalogSearchResponse } from "../types.js";
/**
 * eBay Commerce Catalog API — search eBay's product catalog.
 * @see https://developer.ebay.com/api-docs/commerce/catalog/overview.html
 */
export declare class CatalogAPI extends BaseAPI {
    private static readonly BASE;
    /** Search the eBay catalog for products. */
    search(params: CatalogSearchParams): Promise<CatalogSearchResponse>;
    /** Get a product by its ePID. */
    getProduct(epid: string): Promise<CatalogProduct>;
}
//# sourceMappingURL=catalog.d.ts.map
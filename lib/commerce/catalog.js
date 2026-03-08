import { BaseAPI } from "../base-api.js";
/**
 * eBay Commerce Catalog API — search eBay's product catalog.
 * @see https://developer.ebay.com/api-docs/commerce/catalog/overview.html
 */
export class CatalogAPI extends BaseAPI {
    static BASE = "/commerce/catalog/v1_beta";
    /** Search the eBay catalog for products. */
    async search(params) {
        return this.get(`${this.ctx.baseUrl}${CatalogAPI.BASE}/product_summary/search`, params);
    }
    /** Get a product by its ePID. */
    async getProduct(epid) {
        return this.get(`${this.ctx.baseUrl}${CatalogAPI.BASE}/product/${encodeURIComponent(epid)}`);
    }
}
//# sourceMappingURL=catalog.js.map
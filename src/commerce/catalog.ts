import { BaseAPI } from "../base-api.js";
import type {
  CatalogProduct,
  CatalogSearchParams,
  CatalogSearchResponse,
} from "../types.js";

/**
 * eBay Commerce Catalog API — search eBay's product catalog.
 * @see https://developer.ebay.com/api-docs/commerce/catalog/overview.html
 */
export class CatalogAPI extends BaseAPI {
  private static readonly BASE = "/commerce/catalog/v1_beta";

  /** Search the eBay catalog for products. */
  async search(params: CatalogSearchParams): Promise<CatalogSearchResponse> {
    return this.get<CatalogSearchResponse>(
      `${this.ctx.baseUrl}${CatalogAPI.BASE}/product_summary/search`,
      params as Record<string, string | number | undefined>,
    );
  }

  /** Get a product by its ePID. */
  async getProduct(epid: string): Promise<CatalogProduct> {
    return this.get<CatalogProduct>(
      `${this.ctx.baseUrl}${CatalogAPI.BASE}/product/${encodeURIComponent(epid)}`,
    );
  }
}

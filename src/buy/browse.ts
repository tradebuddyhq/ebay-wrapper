import { getBaseUrls, requestJson } from "../http.js";
import type { BrowseSearchParams, ClientOptions, ItemSummary } from "../types.js";
import { OAuthClient } from "../oauth.js";

export class BrowseAPI {
  private opts: ClientOptions;
  private oauth: OAuthClient;

  constructor(opts: ClientOptions) {
    this.opts = opts;
    this.oauth = new OAuthClient(opts);
  }

  private async headers() {
    const token = await this.oauth.getAppAccessToken();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (this.opts.marketplaceId) headers["X-EBAY-C-MARKETPLACE-ID"] = this.opts.marketplaceId;
    if (this.opts.acceptLanguage) headers["Accept-Language"] = this.opts.acceptLanguage;
    if (this.opts.userAgent) headers["User-Agent"] = this.opts.userAgent;

    return headers;
  }

  /**
   * Search items using Buy Browse API.
   * Docs: https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
   */
  async search(params: BrowseSearchParams) {
    const env = this.opts.env ?? "production";
    const { api } = getBaseUrls(env);

    const url = new URL(api + "/buy/browse/v1/item_summary/search");
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }

    return requestJson<{ itemSummaries?: ItemSummary[]; total?: number; href?: string }>({
      url: url.toString(),
      method: "GET",
      headers: await this.headers(),
      timeoutMs: this.opts.timeoutMs ?? 15000,
    });
  }

  /**
   * Get a single item by itemId.
   * Docs: https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItem
   */
  async getItem(itemId: string) {
    const env = this.opts.env ?? "production";
    const { api } = getBaseUrls(env);

    const url = api + `/buy/browse/v1/item/${encodeURIComponent(itemId)}`;
    return requestJson<any>({
      url,
      method: "GET",
      headers: await this.headers(),
      timeoutMs: this.opts.timeoutMs ?? 15000,
    });
  }
}

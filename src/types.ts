export type Environment = "production" | "sandbox";

export interface ClientOptions {
  /** eBay environment. Default: production */
  env?: Environment;

  /** eBay OAuth client id (a.k.a App ID). */
  clientId: string;

  /** eBay OAuth client secret (a.k.a Cert ID). */
  clientSecret: string;

  /** Default marketplace / locale for requests. Example: "EBAY_US" or "EBAY_GB". */
  marketplaceId?: string;

  /** Default language. Example: "en-US" */
  acceptLanguage?: string;

  /** Optional: override to supply your own access token (e.g. user token). */
  accessToken?: string;

  /** Optional: request timeout (ms). Default: 15000 */
  timeoutMs?: number;

  /** Optional: user agent appended to requests */
  userAgent?: string;
}

export class EbayError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "EbayError";
    this.status = status;
    this.details = details;
  }
}

export interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface BrowseSearchParams {
  q?: string;
  category_ids?: string;
  filter?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface ItemSummary {
  itemId: string;
  title?: string;
  price?: { value: string; currency: string };
  itemWebUrl?: string;
  image?: { imageUrl: string };
  condition?: string;
}

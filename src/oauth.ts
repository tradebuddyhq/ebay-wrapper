import { EbayAuthError } from "./errors.js";
import { getBaseUrls, requestJson } from "./http.js";
import type { ClientOptions, OAuthToken, UserAccessToken } from "./types.js";

const SCOPE_PUBLIC = "https://api.ebay.com/oauth/api_scope";

const SCOPE_SELL = [
  "https://api.ebay.com/oauth/api_scope",
  "https://api.ebay.com/oauth/api_scope/sell.inventory",
  "https://api.ebay.com/oauth/api_scope/sell.fulfillment",
  "https://api.ebay.com/oauth/api_scope/sell.account",
  "https://api.ebay.com/oauth/api_scope/sell.marketing",
  "https://api.ebay.com/oauth/api_scope/sell.finances",
  "https://api.ebay.com/oauth/api_scope/commerce.taxonomy.readonly",
  "https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly",
].join(" ");

interface CachedToken {
  token: string;
  expiresAt: number;
}

export class OAuthClient {
  private readonly opts: ClientOptions;
  private appTokenCache?: CachedToken;
  private userTokenCache?: CachedToken;
  private refreshToken?: string;

  constructor(opts: ClientOptions) {
    this.opts = opts;
    if (opts.refreshToken) {
      this.refreshToken = opts.refreshToken;
    }
  }

  /** Get an application-level access token (Client Credentials Grant). */
  async getAppAccessToken(): Promise<string> {
    if (this.opts.accessToken) return this.opts.accessToken;

    const now = Date.now();
    if (this.appTokenCache && now < this.appTokenCache.expiresAt - 30_000) {
      return this.appTokenCache.token;
    }

    const env = this.opts.env ?? "production";
    const { oauth } = getBaseUrls(env);
    const basic = Buffer.from(`${this.opts.clientId}:${this.opts.clientSecret}`).toString("base64");

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      scope: SCOPE_PUBLIC,
    }).toString();

    let token: OAuthToken;
    try {
      token = await requestJson<OAuthToken>({
        url: oauth,
        method: "POST",
        timeoutMs: this.opts.timeoutMs ?? 15_000,
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "OAuth token request failed";
      throw new EbayAuthError(msg, (err as { status?: number }).status ?? 0);
    }

    this.appTokenCache = {
      token: token.access_token,
      expiresAt: now + token.expires_in * 1_000,
    };

    return token.access_token;
  }

  /** Get a user-level access token (Authorization Code Grant). */
  async getUserAccessToken(): Promise<string> {
    if (this.opts.accessToken) return this.opts.accessToken;

    const now = Date.now();
    if (this.userTokenCache && now < this.userTokenCache.expiresAt - 60_000) {
      return this.userTokenCache.token;
    }

    if (!this.refreshToken) {
      throw new EbayAuthError(
        "User access token required but no refreshToken provided. Call generateAuthUrl() and exchange the code first.",
        0,
      );
    }

    return this.refreshUserToken();
  }

  /**
   * Generate the eBay authorization URL for the Authorization Code Grant flow.
   * The user should be redirected to this URL to grant permissions.
   */
  generateAuthUrl(redirectUri: string, scopes?: string[], state?: string): string {
    const env = this.opts.env ?? "production";
    const base = env === "production"
      ? "https://auth.ebay.com/oauth2/authorize"
      : "https://auth.sandbox.ebay.com/oauth2/authorize";

    const params = new URLSearchParams({
      client_id: this.opts.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopes?.join(" ") ?? SCOPE_SELL,
    });

    if (state) params.set("state", state);

    return `${base}?${params.toString()}`;
  }

  /** Exchange an authorization code for user access + refresh tokens. */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<UserAccessToken> {
    const env = this.opts.env ?? "production";
    const { oauth } = getBaseUrls(env);
    const basic = Buffer.from(`${this.opts.clientId}:${this.opts.clientSecret}`).toString("base64");

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }).toString();

    const result = await requestJson<UserAccessToken>({
      url: oauth,
      method: "POST",
      timeoutMs: this.opts.timeoutMs ?? 15_000,
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    this.refreshToken = result.refresh_token;
    this.userTokenCache = {
      token: result.access_token,
      expiresAt: Date.now() + result.expires_in * 1_000,
    };

    return result;
  }

  /** Use a refresh token to get a new access token. */
  async refreshUserToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new EbayAuthError("No refresh token available", 0);
    }

    const env = this.opts.env ?? "production";
    const { oauth } = getBaseUrls(env);
    const basic = Buffer.from(`${this.opts.clientId}:${this.opts.clientSecret}`).toString("base64");

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: this.refreshToken,
      scope: SCOPE_SELL,
    }).toString();

    const result = await requestJson<UserAccessToken>({
      url: oauth,
      method: "POST",
      timeoutMs: this.opts.timeoutMs ?? 15_000,
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    this.userTokenCache = {
      token: result.access_token,
      expiresAt: Date.now() + result.expires_in * 1_000,
    };

    if (result.refresh_token) {
      this.refreshToken = result.refresh_token;
    }

    return result.access_token;
  }
}

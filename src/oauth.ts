import { getBaseUrls, requestJson } from "./http.js";
import type { ClientOptions, OAuthToken } from "./types.js";

const SCOPE_BROWSE = "https://api.ebay.com/oauth/api_scope";

type CachedToken = {
  token: string;
  /** epoch ms */
  expiresAt: number;
};

export class OAuthClient {
  private opts: ClientOptions;
  private cached?: CachedToken;

  constructor(opts: ClientOptions) {
    this.opts = opts;
  }

  async getAppAccessToken(): Promise<string> {
    // If the user provided a token explicitly, always use it.
    if (this.opts.accessToken) return this.opts.accessToken;

    const now = Date.now();
    if (this.cached && now < this.cached.expiresAt - 30_000) return this.cached.token;

    const env = this.opts.env ?? "production";
    const { oauth } = getBaseUrls(env);

    const basic = Buffer.from(`${this.opts.clientId}:${this.opts.clientSecret}`).toString("base64");
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      scope: SCOPE_BROWSE,
    }).toString();

    const token = await requestJson<OAuthToken>({
      url: oauth,
      method: "POST",
      timeoutMs: this.opts.timeoutMs ?? 15000,
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    this.cached = {
      token: token.access_token,
      expiresAt: now + token.expires_in * 1000,
    };

    return token.access_token;
  }
}

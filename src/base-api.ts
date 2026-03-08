import type { HttpClient } from "./http.js";
import type { OAuthClient } from "./oauth.js";
import type { ClientOptions } from "./types.js";

export interface ApiContext {
  opts: ClientOptions;
  oauth: OAuthClient;
  http: HttpClient;
  baseUrl: string;
}

export abstract class BaseAPI {
  protected readonly ctx: ApiContext;

  constructor(ctx: ApiContext) {
    this.ctx = ctx;
  }

  protected async headers(userAuth = false): Promise<Record<string, string>> {
    const token = userAuth
      ? await this.ctx.oauth.getUserAccessToken()
      : await this.ctx.oauth.getAppAccessToken();

    const h: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (this.ctx.opts.marketplaceId) h["X-EBAY-C-MARKETPLACE-ID"] = this.ctx.opts.marketplaceId;
    if (this.ctx.opts.acceptLanguage) h["Accept-Language"] = this.ctx.opts.acceptLanguage;
    if (this.ctx.opts.userAgent) h["User-Agent"] = this.ctx.opts.userAgent;

    return h;
  }

  protected async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>, userAuth = false): Promise<T> {
    const url = new URL(path, this.ctx.baseUrl);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      }
    }
    return this.ctx.http.request<T>({
      url: url.toString(),
      method: "GET",
      headers: await this.headers(userAuth),
      timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
    });
  }

  protected async post<T>(path: string, body?: unknown, userAuth = false): Promise<T> {
    return this.ctx.http.request<T>({
      url: `${this.ctx.baseUrl}${path}`,
      method: "POST",
      headers: await this.headers(userAuth),
      body: body ? JSON.stringify(body) : undefined,
      timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
    });
  }

  protected async put<T>(path: string, body?: unknown, userAuth = false): Promise<T> {
    return this.ctx.http.request<T>({
      url: `${this.ctx.baseUrl}${path}`,
      method: "PUT",
      headers: await this.headers(userAuth),
      body: body ? JSON.stringify(body) : undefined,
      timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
    });
  }

  protected async del<T>(path: string, userAuth = false): Promise<T> {
    return this.ctx.http.request<T>({
      url: `${this.ctx.baseUrl}${path}`,
      method: "DELETE",
      headers: await this.headers(userAuth),
      timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
    });
  }
}

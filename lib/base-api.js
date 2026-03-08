export class BaseAPI {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    async headers(userAuth = false) {
        const token = userAuth
            ? await this.ctx.oauth.getUserAccessToken()
            : await this.ctx.oauth.getAppAccessToken();
        const h = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        if (this.ctx.opts.marketplaceId)
            h["X-EBAY-C-MARKETPLACE-ID"] = this.ctx.opts.marketplaceId;
        if (this.ctx.opts.acceptLanguage)
            h["Accept-Language"] = this.ctx.opts.acceptLanguage;
        if (this.ctx.opts.userAgent)
            h["User-Agent"] = this.ctx.opts.userAgent;
        return h;
    }
    async get(path, params, userAuth = false) {
        const url = new URL(path, this.ctx.baseUrl);
        if (params) {
            for (const [k, v] of Object.entries(params)) {
                if (v !== undefined && v !== null)
                    url.searchParams.set(k, String(v));
            }
        }
        return this.ctx.http.request({
            url: url.toString(),
            method: "GET",
            headers: await this.headers(userAuth),
            timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
        });
    }
    async post(path, body, userAuth = false) {
        return this.ctx.http.request({
            url: `${this.ctx.baseUrl}${path}`,
            method: "POST",
            headers: await this.headers(userAuth),
            body: body ? JSON.stringify(body) : undefined,
            timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
        });
    }
    async put(path, body, userAuth = false) {
        return this.ctx.http.request({
            url: `${this.ctx.baseUrl}${path}`,
            method: "PUT",
            headers: await this.headers(userAuth),
            body: body ? JSON.stringify(body) : undefined,
            timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
        });
    }
    async del(path, userAuth = false) {
        return this.ctx.http.request({
            url: `${this.ctx.baseUrl}${path}`,
            method: "DELETE",
            headers: await this.headers(userAuth),
            timeoutMs: this.ctx.opts.timeoutMs ?? 15_000,
        });
    }
}
//# sourceMappingURL=base-api.js.map
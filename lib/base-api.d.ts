import type { HttpClient } from "./http.js";
import type { OAuthClient } from "./oauth.js";
import type { ClientOptions } from "./types.js";
export interface ApiContext {
    opts: ClientOptions;
    oauth: OAuthClient;
    http: HttpClient;
    baseUrl: string;
}
export declare abstract class BaseAPI {
    protected readonly ctx: ApiContext;
    constructor(ctx: ApiContext);
    protected headers(userAuth?: boolean): Promise<Record<string, string>>;
    protected get<T>(path: string, params?: Record<string, string | number | boolean | undefined>, userAuth?: boolean): Promise<T>;
    protected post<T>(path: string, body?: unknown, userAuth?: boolean): Promise<T>;
    protected put<T>(path: string, body?: unknown, userAuth?: boolean): Promise<T>;
    protected del<T>(path: string, userAuth?: boolean): Promise<T>;
}
//# sourceMappingURL=base-api.d.ts.map
import type { ClientOptions, UserAccessToken } from "./types.js";
export declare class OAuthClient {
    private readonly opts;
    private appTokenCache?;
    private userTokenCache?;
    private refreshToken?;
    constructor(opts: ClientOptions);
    /** Get an application-level access token (Client Credentials Grant). */
    getAppAccessToken(): Promise<string>;
    /** Get a user-level access token (Authorization Code Grant). */
    getUserAccessToken(): Promise<string>;
    /**
     * Generate the eBay authorization URL for the Authorization Code Grant flow.
     * The user should be redirected to this URL to grant permissions.
     */
    generateAuthUrl(redirectUri: string, scopes?: string[], state?: string): string;
    /** Exchange an authorization code for user access + refresh tokens. */
    exchangeCodeForToken(code: string, redirectUri: string): Promise<UserAccessToken>;
    /** Use a refresh token to get a new access token. */
    refreshUserToken(): Promise<string>;
}
//# sourceMappingURL=oauth.d.ts.map
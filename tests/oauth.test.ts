import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OAuthClient } from "../src/oauth.js";

describe("OAuthClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return user-supplied access token directly", async () => {
    const oauth = new OAuthClient({
      clientId: "test-id",
      clientSecret: "test-secret",
      accessToken: "my-token",
    });

    const token = await oauth.getAppAccessToken();
    expect(token).toBe("my-token");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should request a new token via client credentials", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: "new-token-123",
          token_type: "Application Access Token",
          expires_in: 7200,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );

    const oauth = new OAuthClient({
      clientId: "test-id",
      clientSecret: "test-secret",
    });

    const token = await oauth.getAppAccessToken();
    expect(token).toBe("new-token-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.ebay.com/identity/v1/oauth2/token",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }),
    );
  });

  it("should cache the token and reuse it", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: "cached-token",
          token_type: "Application Access Token",
          expires_in: 7200,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );

    const oauth = new OAuthClient({
      clientId: "test-id",
      clientSecret: "test-secret",
    });

    const token1 = await oauth.getAppAccessToken();
    const token2 = await oauth.getAppAccessToken();

    expect(token1).toBe("cached-token");
    expect(token2).toBe("cached-token");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should use sandbox URL when env is sandbox", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: "sandbox-token",
          token_type: "Application Access Token",
          expires_in: 7200,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    );

    const oauth = new OAuthClient({
      clientId: "test-id",
      clientSecret: "test-secret",
      env: "sandbox",
    });

    await oauth.getAppAccessToken();

    expect(fetch).toHaveBeenCalledWith(
      "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
      expect.anything(),
    );
  });

  it("should generate an auth URL for Authorization Code Grant", () => {
    const oauth = new OAuthClient({
      clientId: "my-client-id",
      clientSecret: "secret",
    });

    const url = oauth.generateAuthUrl("https://myapp.com/callback", undefined, "xyz");

    expect(url).toContain("https://auth.ebay.com/oauth2/authorize");
    expect(url).toContain("client_id=my-client-id");
    expect(url).toContain("response_type=code");
    expect(url).toContain("redirect_uri=https%3A%2F%2Fmyapp.com%2Fcallback");
    expect(url).toContain("state=xyz");
  });

  it("should generate sandbox auth URL", () => {
    const oauth = new OAuthClient({
      clientId: "id",
      clientSecret: "secret",
      env: "sandbox",
    });

    const url = oauth.generateAuthUrl("https://myapp.com/callback");
    expect(url).toContain("https://auth.sandbox.ebay.com/oauth2/authorize");
  });
});

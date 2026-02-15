import { EbayError, type Environment } from "./types.js";

const BASE = {
  production: {
    api: "https://api.ebay.com",
    oauth: "https://api.ebay.com/identity/v1/oauth2/token",
  },
  sandbox: {
    api: "https://api.sandbox.ebay.com",
    oauth: "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
  },
} as const;

export function getBaseUrls(env: Environment) {
  return BASE[env];
}

export async function requestJson<T>(opts: {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
  timeoutMs: number;
}): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts.timeoutMs);
  try {
    const res = await fetch(opts.url, {
      method: opts.method,
      headers: opts.headers,
      body: opts.body,
      signal: ctrl.signal,
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (res.status >= 200 && res.status < 300) {
      if (res.status === 204) return undefined as T;
      if (!isJson) return (await res.text()) as unknown as T;
      return (await res.json()) as T;
    }

    let details: unknown = undefined;
    try {
      details = isJson ? await res.json() : await res.text();
    } catch {
      // ignore
    }

    const msg = `eBay request failed (${res.status}) ${opts.method} ${opts.url}`;
    throw new EbayError(msg, res.status, details);
  } finally {
    clearTimeout(t);
  }
}

# ebay-wrapper

A small, typed, zero-dependency-ish (just `fetch`) **TypeScript wrapper for the eBay REST APIs**.

This repo started as a skeleton — it now includes a working, production-ready foundation:
- OAuth **Client Credentials** token management (cached + auto refresh)
- Robust HTTP client with timeouts + helpful errors
- First implemented API: **Buy → Browse** (`search`, `getItem`)

> This is **not** a complete eBay SDK yet (eBay has a lot of APIs). It is a solid base you can extend safely.

## Install

```bash
npm i ebay-wrapper
```

## Quick start

```ts
import { Client } from "ebay-wrapper";

const client = new Client({
  env: "production", // or "sandbox"
  clientId: process.env.EBAY_CLIENT_ID!,
  clientSecret: process.env.EBAY_CLIENT_SECRET!,
  marketplaceId: "EBAY_US",
  acceptLanguage: "en-US",
});

const results = await client.buy.browse.search({
  q: "graphing calculator",
  limit: 3,
});

console.log(results.itemSummaries?.map(i => ({ id: i.itemId, title: i.title, price: i.price })));
```

## Implemented APIs

### Buy → Browse
- `client.buy.browse.search(params)`
- `client.buy.browse.getItem(itemId)`

## Error handling

Errors throw `EbayError` with:
- `status` (HTTP status code)
- `details` (best-effort JSON or text body)

## Development

```bash
npm install
npm run build
```

## To do

- Rate limit handling + retry/backoff
- More Browse endpoints: getItemByLegacyId, getItems, getItemAccessors
- Buy → Feed
- Sell → Inventory
- Commerce → Taxonomy

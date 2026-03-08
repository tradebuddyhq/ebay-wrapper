import { BaseAPI } from "../base-api.js";
import type {
  BulkInventoryItemRequest,
  BulkInventoryItemResponse,
  BulkMigrateListingRequest,
  BulkMigrateListingResponse,
  BulkPriceQuantityRequest,
  BulkPriceQuantityResponse,
  InventoryItem,
  InventoryItemGroup,
  InventoryItemResponse,
  InventoryItemsResponse,
  Offer,
  OfferResponse,
  OffersResponse,
  PublishResponse,
  WithdrawResponse,
} from "../types.js";

/**
 * eBay Sell Inventory API — manage inventory items, offers, and listings.
 * Requires user-level OAuth (Authorization Code Grant).
 * @see https://developer.ebay.com/api-docs/sell/inventory/overview.html
 */
export class InventoryAPI extends BaseAPI {
  private static readonly BASE = "/sell/inventory/v1";

  // ── Inventory Items ───────────────────────────────────────

  /** Create or replace an inventory item by SKU. */
  async createOrReplaceInventoryItem(sku: string, item: InventoryItem): Promise<void> {
    await this.put<void>(
      `${InventoryAPI.BASE}/inventory_item/${encodeURIComponent(sku)}`,
      item,
      true,
    );
  }

  /** Get an inventory item by SKU. */
  async getInventoryItem(sku: string): Promise<InventoryItemResponse> {
    return this.get<InventoryItemResponse>(
      `${this.ctx.baseUrl}${InventoryAPI.BASE}/inventory_item/${encodeURIComponent(sku)}`,
      undefined,
      true,
    );
  }

  /** List all inventory items. */
  async getInventoryItems(params?: { limit?: number; offset?: number }): Promise<InventoryItemsResponse> {
    return this.get<InventoryItemsResponse>(
      `${this.ctx.baseUrl}${InventoryAPI.BASE}/inventory_item`,
      params as Record<string, number | undefined>,
      true,
    );
  }

  /** Delete an inventory item by SKU. */
  async deleteInventoryItem(sku: string): Promise<void> {
    await this.del<void>(
      `${InventoryAPI.BASE}/inventory_item/${encodeURIComponent(sku)}`,
      true,
    );
  }

  /** Bulk create or replace inventory items. */
  async bulkCreateOrReplaceInventoryItem(request: BulkInventoryItemRequest): Promise<BulkInventoryItemResponse> {
    return this.post<BulkInventoryItemResponse>(
      `${InventoryAPI.BASE}/bulk_create_or_replace_inventory_item`,
      request,
      true,
    );
  }

  /** Bulk update price and/or quantity. */
  async bulkUpdatePriceQuantity(request: BulkPriceQuantityRequest): Promise<BulkPriceQuantityResponse> {
    return this.post<BulkPriceQuantityResponse>(
      `${InventoryAPI.BASE}/bulk_update_price_quantity`,
      request,
      true,
    );
  }

  // ── Offers ────────────────────────────────────────────────

  /** Create an offer for an inventory item. */
  async createOffer(offer: Offer): Promise<{ offerId: string }> {
    return this.post<{ offerId: string }>(
      `${InventoryAPI.BASE}/offer`,
      offer,
      true,
    );
  }

  /** Get an offer by ID. */
  async getOffer(offerId: string): Promise<OfferResponse> {
    return this.get<OfferResponse>(
      `${this.ctx.baseUrl}${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}`,
      undefined,
      true,
    );
  }

  /** List offers, optionally filtered by SKU. */
  async getOffers(params?: { sku?: string; marketplace_id?: string; format?: string; limit?: number; offset?: number }): Promise<OffersResponse> {
    return this.get<OffersResponse>(
      `${this.ctx.baseUrl}${InventoryAPI.BASE}/offer`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Update an existing offer. */
  async updateOffer(offerId: string, offer: Partial<Offer>): Promise<OfferResponse> {
    return this.put<OfferResponse>(
      `${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}`,
      offer,
      true,
    );
  }

  /** Delete an offer. */
  async deleteOffer(offerId: string): Promise<void> {
    await this.del<void>(
      `${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}`,
      true,
    );
  }

  /** Publish an offer to create an eBay listing. */
  async publishOffer(offerId: string): Promise<PublishResponse> {
    return this.post<PublishResponse>(
      `${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}/publish`,
      undefined,
      true,
    );
  }

  /** Withdraw a published offer/listing. */
  async withdrawOffer(offerId: string): Promise<WithdrawResponse> {
    return this.post<WithdrawResponse>(
      `${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}/withdraw`,
      undefined,
      true,
    );
  }

  /** Publish offers for an inventory item group. */
  async publishOfferByInventoryItemGroup(inventoryItemGroupKey: string): Promise<PublishResponse> {
    return this.post<PublishResponse>(
      `${InventoryAPI.BASE}/offer/publish_by_inventory_item_group`,
      { inventoryItemGroupKey },
      true,
    );
  }

  /** Withdraw offers for an inventory item group. */
  async withdrawOfferByInventoryItemGroup(inventoryItemGroupKey: string): Promise<void> {
    await this.post<void>(
      `${InventoryAPI.BASE}/offer/withdraw_by_inventory_item_group`,
      { inventoryItemGroupKey },
      true,
    );
  }

  // ── Inventory Item Groups ─────────────────────────────────

  /** Create or replace an inventory item group (for multi-variation listings). */
  async createOrReplaceInventoryItemGroup(key: string, group: InventoryItemGroup): Promise<void> {
    await this.put<void>(
      `${InventoryAPI.BASE}/inventory_item_group/${encodeURIComponent(key)}`,
      group,
      true,
    );
  }

  /** Get an inventory item group. */
  async getInventoryItemGroup(key: string): Promise<InventoryItemGroup> {
    return this.get<InventoryItemGroup>(
      `${this.ctx.baseUrl}${InventoryAPI.BASE}/inventory_item_group/${encodeURIComponent(key)}`,
      undefined,
      true,
    );
  }

  /** Delete an inventory item group. */
  async deleteInventoryItemGroup(key: string): Promise<void> {
    await this.del<void>(
      `${InventoryAPI.BASE}/inventory_item_group/${encodeURIComponent(key)}`,
      true,
    );
  }

  // ── Listing Migration ─────────────────────────────────────

  /** Migrate existing listings to the inventory model. */
  async bulkMigrateListing(request: BulkMigrateListingRequest): Promise<BulkMigrateListingResponse> {
    return this.post<BulkMigrateListingResponse>(
      `${InventoryAPI.BASE}/bulk_migrate_listing`,
      request,
      true,
    );
  }
}

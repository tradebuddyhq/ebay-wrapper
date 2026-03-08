import { BaseAPI } from "../base-api.js";
import type { BulkInventoryItemRequest, BulkInventoryItemResponse, BulkMigrateListingRequest, BulkMigrateListingResponse, BulkPriceQuantityRequest, BulkPriceQuantityResponse, InventoryItem, InventoryItemGroup, InventoryItemResponse, InventoryItemsResponse, Offer, OfferResponse, OffersResponse, PublishResponse, WithdrawResponse } from "../types.js";
/**
 * eBay Sell Inventory API — manage inventory items, offers, and listings.
 * Requires user-level OAuth (Authorization Code Grant).
 * @see https://developer.ebay.com/api-docs/sell/inventory/overview.html
 */
export declare class InventoryAPI extends BaseAPI {
    private static readonly BASE;
    /** Create or replace an inventory item by SKU. */
    createOrReplaceInventoryItem(sku: string, item: InventoryItem): Promise<void>;
    /** Get an inventory item by SKU. */
    getInventoryItem(sku: string): Promise<InventoryItemResponse>;
    /** List all inventory items. */
    getInventoryItems(params?: {
        limit?: number;
        offset?: number;
    }): Promise<InventoryItemsResponse>;
    /** Delete an inventory item by SKU. */
    deleteInventoryItem(sku: string): Promise<void>;
    /** Bulk create or replace inventory items. */
    bulkCreateOrReplaceInventoryItem(request: BulkInventoryItemRequest): Promise<BulkInventoryItemResponse>;
    /** Bulk update price and/or quantity. */
    bulkUpdatePriceQuantity(request: BulkPriceQuantityRequest): Promise<BulkPriceQuantityResponse>;
    /** Create an offer for an inventory item. */
    createOffer(offer: Offer): Promise<{
        offerId: string;
    }>;
    /** Get an offer by ID. */
    getOffer(offerId: string): Promise<OfferResponse>;
    /** List offers, optionally filtered by SKU. */
    getOffers(params?: {
        sku?: string;
        marketplace_id?: string;
        format?: string;
        limit?: number;
        offset?: number;
    }): Promise<OffersResponse>;
    /** Update an existing offer. */
    updateOffer(offerId: string, offer: Partial<Offer>): Promise<OfferResponse>;
    /** Delete an offer. */
    deleteOffer(offerId: string): Promise<void>;
    /** Publish an offer to create an eBay listing. */
    publishOffer(offerId: string): Promise<PublishResponse>;
    /** Withdraw a published offer/listing. */
    withdrawOffer(offerId: string): Promise<WithdrawResponse>;
    /** Publish offers for an inventory item group. */
    publishOfferByInventoryItemGroup(inventoryItemGroupKey: string): Promise<PublishResponse>;
    /** Withdraw offers for an inventory item group. */
    withdrawOfferByInventoryItemGroup(inventoryItemGroupKey: string): Promise<void>;
    /** Create or replace an inventory item group (for multi-variation listings). */
    createOrReplaceInventoryItemGroup(key: string, group: InventoryItemGroup): Promise<void>;
    /** Get an inventory item group. */
    getInventoryItemGroup(key: string): Promise<InventoryItemGroup>;
    /** Delete an inventory item group. */
    deleteInventoryItemGroup(key: string): Promise<void>;
    /** Migrate existing listings to the inventory model. */
    bulkMigrateListing(request: BulkMigrateListingRequest): Promise<BulkMigrateListingResponse>;
}
//# sourceMappingURL=inventory.d.ts.map
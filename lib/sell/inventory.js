import { BaseAPI } from "../base-api.js";
/**
 * eBay Sell Inventory API — manage inventory items, offers, and listings.
 * Requires user-level OAuth (Authorization Code Grant).
 * @see https://developer.ebay.com/api-docs/sell/inventory/overview.html
 */
export class InventoryAPI extends BaseAPI {
    static BASE = "/sell/inventory/v1";
    // ── Inventory Items ───────────────────────────────────────
    /** Create or replace an inventory item by SKU. */
    async createOrReplaceInventoryItem(sku, item) {
        await this.put(`${InventoryAPI.BASE}/inventory_item/${encodeURIComponent(sku)}`, item, true);
    }
    /** Get an inventory item by SKU. */
    async getInventoryItem(sku) {
        return this.get(`${this.ctx.baseUrl}${InventoryAPI.BASE}/inventory_item/${encodeURIComponent(sku)}`, undefined, true);
    }
    /** List all inventory items. */
    async getInventoryItems(params) {
        return this.get(`${this.ctx.baseUrl}${InventoryAPI.BASE}/inventory_item`, params, true);
    }
    /** Delete an inventory item by SKU. */
    async deleteInventoryItem(sku) {
        await this.del(`${InventoryAPI.BASE}/inventory_item/${encodeURIComponent(sku)}`, true);
    }
    /** Bulk create or replace inventory items. */
    async bulkCreateOrReplaceInventoryItem(request) {
        return this.post(`${InventoryAPI.BASE}/bulk_create_or_replace_inventory_item`, request, true);
    }
    /** Bulk update price and/or quantity. */
    async bulkUpdatePriceQuantity(request) {
        return this.post(`${InventoryAPI.BASE}/bulk_update_price_quantity`, request, true);
    }
    // ── Offers ────────────────────────────────────────────────
    /** Create an offer for an inventory item. */
    async createOffer(offer) {
        return this.post(`${InventoryAPI.BASE}/offer`, offer, true);
    }
    /** Get an offer by ID. */
    async getOffer(offerId) {
        return this.get(`${this.ctx.baseUrl}${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}`, undefined, true);
    }
    /** List offers, optionally filtered by SKU. */
    async getOffers(params) {
        return this.get(`${this.ctx.baseUrl}${InventoryAPI.BASE}/offer`, params, true);
    }
    /** Update an existing offer. */
    async updateOffer(offerId, offer) {
        return this.put(`${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}`, offer, true);
    }
    /** Delete an offer. */
    async deleteOffer(offerId) {
        await this.del(`${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}`, true);
    }
    /** Publish an offer to create an eBay listing. */
    async publishOffer(offerId) {
        return this.post(`${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}/publish`, undefined, true);
    }
    /** Withdraw a published offer/listing. */
    async withdrawOffer(offerId) {
        return this.post(`${InventoryAPI.BASE}/offer/${encodeURIComponent(offerId)}/withdraw`, undefined, true);
    }
    /** Publish offers for an inventory item group. */
    async publishOfferByInventoryItemGroup(inventoryItemGroupKey) {
        return this.post(`${InventoryAPI.BASE}/offer/publish_by_inventory_item_group`, { inventoryItemGroupKey }, true);
    }
    /** Withdraw offers for an inventory item group. */
    async withdrawOfferByInventoryItemGroup(inventoryItemGroupKey) {
        await this.post(`${InventoryAPI.BASE}/offer/withdraw_by_inventory_item_group`, { inventoryItemGroupKey }, true);
    }
    // ── Inventory Item Groups ─────────────────────────────────
    /** Create or replace an inventory item group (for multi-variation listings). */
    async createOrReplaceInventoryItemGroup(key, group) {
        await this.put(`${InventoryAPI.BASE}/inventory_item_group/${encodeURIComponent(key)}`, group, true);
    }
    /** Get an inventory item group. */
    async getInventoryItemGroup(key) {
        return this.get(`${this.ctx.baseUrl}${InventoryAPI.BASE}/inventory_item_group/${encodeURIComponent(key)}`, undefined, true);
    }
    /** Delete an inventory item group. */
    async deleteInventoryItemGroup(key) {
        await this.del(`${InventoryAPI.BASE}/inventory_item_group/${encodeURIComponent(key)}`, true);
    }
    // ── Listing Migration ─────────────────────────────────────
    /** Migrate existing listings to the inventory model. */
    async bulkMigrateListing(request) {
        return this.post(`${InventoryAPI.BASE}/bulk_migrate_listing`, request, true);
    }
}
//# sourceMappingURL=inventory.js.map
import { BaseAPI } from "../base-api.js";
/**
 * eBay Buy Browse API — search, view, and check compatibility of items.
 * @see https://developer.ebay.com/api-docs/buy/browse/overview.html
 */
export class BrowseAPI extends BaseAPI {
    static BASE = "/buy/browse/v1";
    /** Search for items. */
    async search(params) {
        return this.get(`${this.ctx.baseUrl}${BrowseAPI.BASE}/item_summary/search`, params);
    }
    /** Get a single item by its eBay item ID. */
    async getItem(itemId, fieldgroups) {
        const path = `${BrowseAPI.BASE}/item/${encodeURIComponent(itemId)}`;
        return this.get(`${this.ctx.baseUrl}${path}`, fieldgroups ? { fieldgroups } : undefined);
    }
    /** Get a single item using its legacy (v1) item ID. */
    async getItemByLegacyId(legacyItemId, options) {
        return this.get(`${this.ctx.baseUrl}${BrowseAPI.BASE}/item/get_item_by_legacy_id`, { legacy_item_id: legacyItemId, ...options });
    }
    /** Get multiple items by their item IDs (max 20). */
    async getItems(itemIds, fieldgroups) {
        return this.get(`${this.ctx.baseUrl}${BrowseAPI.BASE}/item/`, {
            item_ids: itemIds.join(","),
            ...(fieldgroups ? { fieldgroups } : {}),
        });
    }
    /** Get items in a group (variations). */
    async getItemsByItemGroup(itemGroupId, fieldgroups) {
        return this.get(`${this.ctx.baseUrl}${BrowseAPI.BASE}/item/get_items_by_item_group`, {
            item_group_id: itemGroupId,
            ...(fieldgroups ? { fieldgroups } : {}),
        });
    }
    /** Check if an item is compatible with a given set of properties. */
    async checkCompatibility(itemId, payload) {
        return this.post(`${BrowseAPI.BASE}/item/${encodeURIComponent(itemId)}/check_compatibility`, payload);
    }
}
//# sourceMappingURL=browse.js.map
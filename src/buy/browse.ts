import { BaseAPI } from "../base-api.js";
import type {
  BrowseSearchParams,
  CompatibilityPayload,
  CompatibilityResponse,
  ItemDetail,
  ItemGroupResponse,
  SearchResponse,
} from "../types.js";

/**
 * eBay Buy Browse API — search, view, and check compatibility of items.
 * @see https://developer.ebay.com/api-docs/buy/browse/overview.html
 */
export class BrowseAPI extends BaseAPI {
  private static readonly BASE = "/buy/browse/v1";

  /** Search for items. */
  async search(params: BrowseSearchParams): Promise<SearchResponse> {
    return this.get<SearchResponse>(
      `${this.ctx.baseUrl}${BrowseAPI.BASE}/item_summary/search`,
      params as Record<string, string | number | undefined>,
    );
  }

  /** Get a single item by its eBay item ID. */
  async getItem(itemId: string, fieldgroups?: string): Promise<ItemDetail> {
    const path = `${BrowseAPI.BASE}/item/${encodeURIComponent(itemId)}`;
    return this.get<ItemDetail>(
      `${this.ctx.baseUrl}${path}`,
      fieldgroups ? { fieldgroups } : undefined,
    );
  }

  /** Get a single item using its legacy (v1) item ID. */
  async getItemByLegacyId(
    legacyItemId: string,
    options?: { legacy_variation_id?: string; legacy_variation_sku?: string; fieldgroups?: string },
  ): Promise<ItemDetail> {
    return this.get<ItemDetail>(
      `${this.ctx.baseUrl}${BrowseAPI.BASE}/item/get_item_by_legacy_id`,
      { legacy_item_id: legacyItemId, ...options } as Record<string, string | undefined>,
    );
  }

  /** Get multiple items by their item IDs (max 20). */
  async getItems(itemIds: string[], fieldgroups?: string): Promise<{ items?: ItemDetail[]; warnings?: Array<{ errorId: number; domain: string; category: string; message: string }> }> {
    return this.get<{ items?: ItemDetail[]; warnings?: Array<{ errorId: number; domain: string; category: string; message: string }> }>(
      `${this.ctx.baseUrl}${BrowseAPI.BASE}/item/`,
      {
        item_ids: itemIds.join(","),
        ...(fieldgroups ? { fieldgroups } : {}),
      },
    );
  }

  /** Get items in a group (variations). */
  async getItemsByItemGroup(itemGroupId: string, fieldgroups?: string): Promise<ItemGroupResponse> {
    return this.get<ItemGroupResponse>(
      `${this.ctx.baseUrl}${BrowseAPI.BASE}/item/get_items_by_item_group`,
      {
        item_group_id: itemGroupId,
        ...(fieldgroups ? { fieldgroups } : {}),
      },
    );
  }

  /** Check if an item is compatible with a given set of properties. */
  async checkCompatibility(itemId: string, payload: CompatibilityPayload): Promise<CompatibilityResponse> {
    return this.post<CompatibilityResponse>(
      `${BrowseAPI.BASE}/item/${encodeURIComponent(itemId)}/check_compatibility`,
      payload,
    );
  }
}

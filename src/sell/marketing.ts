import { BaseAPI } from "../base-api.js";
import type {
  Ad,
  AdsResponse,
  BulkCreateAdsByListingIdRequest,
  BulkCreateAdsResponse,
  Campaign,
  CampaignsResponse,
  CreateAdRequest,
  CreateAdsByInventoryReferenceRequest,
  PromotionDetail,
  PromotionsResponse,
} from "../types.js";

/**
 * eBay Sell Marketing API — manage Promoted Listings campaigns, ads, and promotions.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/marketing/overview.html
 */
export class MarketingAPI extends BaseAPI {
  private static readonly BASE = "/sell/marketing/v1";

  // ── Campaigns ─────────────────────────────────────────────

  /** List campaigns with optional filters. */
  async getCampaigns(params?: { campaign_name?: string; campaign_status?: string; limit?: number; offset?: number }): Promise<CampaignsResponse> {
    return this.get<CampaignsResponse>(
      `${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get a campaign by ID. */
  async getCampaign(campaignId: string): Promise<Campaign> {
    return this.get<Campaign>(
      `${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}`,
      undefined,
      true,
    );
  }

  /** Create a Promoted Listings campaign. */
  async createCampaign(campaign: Campaign): Promise<{ campaignId: string }> {
    return this.post<{ campaignId: string }>(
      `${MarketingAPI.BASE}/ad_campaign`,
      campaign,
      true,
    );
  }

  /** Update a campaign. */
  async updateCampaign(campaignId: string, campaign: Partial<Campaign>): Promise<void> {
    await this.put<void>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}`,
      campaign,
      true,
    );
  }

  /** Delete a campaign. */
  async deleteCampaign(campaignId: string): Promise<void> {
    await this.del<void>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}`,
      true,
    );
  }

  /** Pause a campaign. */
  async pauseCampaign(campaignId: string): Promise<void> {
    await this.post<void>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/pause`,
      undefined,
      true,
    );
  }

  /** Resume a paused campaign. */
  async resumeCampaign(campaignId: string): Promise<void> {
    await this.post<void>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/resume`,
      undefined,
      true,
    );
  }

  /** End a campaign. */
  async endCampaign(campaignId: string): Promise<void> {
    await this.post<void>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/end`,
      undefined,
      true,
    );
  }

  // ── Ads ───────────────────────────────────────────────────

  /** List ads in a campaign. */
  async getAds(campaignId: string, params?: { listing_ids?: string; limit?: number; offset?: number }): Promise<AdsResponse> {
    return this.get<AdsResponse>(
      `${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get an ad by ID. */
  async getAd(campaignId: string, adId: string): Promise<Ad> {
    return this.get<Ad>(
      `${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad/${encodeURIComponent(adId)}`,
      undefined,
      true,
    );
  }

  /** Create an ad from a listing ID. */
  async createAd(campaignId: string, request: CreateAdRequest): Promise<{ adId: string }> {
    return this.post<{ adId: string }>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad`,
      request,
      true,
    );
  }

  /** Create an ad from an inventory reference. */
  async createAdByInventoryReference(campaignId: string, request: CreateAdsByInventoryReferenceRequest): Promise<{ adId: string }> {
    return this.post<{ adId: string }>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/create_ads_by_inventory_reference`,
      request,
      true,
    );
  }

  /** Bulk create ads by listing IDs. */
  async bulkCreateAdsByListingId(campaignId: string, request: BulkCreateAdsByListingIdRequest): Promise<BulkCreateAdsResponse> {
    return this.post<BulkCreateAdsResponse>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/bulk_create_ads_by_listing_id`,
      request,
      true,
    );
  }

  /** Delete an ad. */
  async deleteAd(campaignId: string, adId: string): Promise<void> {
    await this.del<void>(
      `${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad/${encodeURIComponent(adId)}`,
      true,
    );
  }

  // ── Promotions ────────────────────────────────────────────

  /** List promotions. */
  async getPromotions(params?: { marketplace_id?: string; promotion_status?: string; limit?: number; offset?: number }): Promise<PromotionsResponse> {
    return this.get<PromotionsResponse>(
      `${this.ctx.baseUrl}${MarketingAPI.BASE}/promotion`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get a promotion by ID. */
  async getPromotion(promotionId: string): Promise<PromotionDetail> {
    return this.get<PromotionDetail>(
      `${this.ctx.baseUrl}${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}`,
      undefined,
      true,
    );
  }

  /** Create a promotion (item price markdown, order discount, volume pricing, etc.). */
  async createPromotion(promotion: PromotionDetail): Promise<{ promotionId: string }> {
    return this.post<{ promotionId: string }>(
      `${MarketingAPI.BASE}/promotion`,
      promotion,
      true,
    );
  }

  /** Update a promotion. */
  async updatePromotion(promotionId: string, promotion: Partial<PromotionDetail>): Promise<void> {
    await this.put<void>(
      `${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}`,
      promotion,
      true,
    );
  }

  /** Delete a promotion. */
  async deletePromotion(promotionId: string): Promise<void> {
    await this.del<void>(
      `${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}`,
      true,
    );
  }

  /** Pause a promotion. */
  async pausePromotion(promotionId: string): Promise<void> {
    await this.post<void>(
      `${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}/pause`,
      undefined,
      true,
    );
  }

  /** Resume a paused promotion. */
  async resumePromotion(promotionId: string): Promise<void> {
    await this.post<void>(
      `${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}/resume`,
      undefined,
      true,
    );
  }
}

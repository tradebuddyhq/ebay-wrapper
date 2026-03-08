import { BaseAPI } from "../base-api.js";
/**
 * eBay Sell Marketing API — manage Promoted Listings campaigns, ads, and promotions.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/marketing/overview.html
 */
export class MarketingAPI extends BaseAPI {
    static BASE = "/sell/marketing/v1";
    // ── Campaigns ─────────────────────────────────────────────
    /** List campaigns with optional filters. */
    async getCampaigns(params) {
        return this.get(`${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign`, params, true);
    }
    /** Get a campaign by ID. */
    async getCampaign(campaignId) {
        return this.get(`${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}`, undefined, true);
    }
    /** Create a Promoted Listings campaign. */
    async createCampaign(campaign) {
        return this.post(`${MarketingAPI.BASE}/ad_campaign`, campaign, true);
    }
    /** Update a campaign. */
    async updateCampaign(campaignId, campaign) {
        await this.put(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}`, campaign, true);
    }
    /** Delete a campaign. */
    async deleteCampaign(campaignId) {
        await this.del(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}`, true);
    }
    /** Pause a campaign. */
    async pauseCampaign(campaignId) {
        await this.post(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/pause`, undefined, true);
    }
    /** Resume a paused campaign. */
    async resumeCampaign(campaignId) {
        await this.post(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/resume`, undefined, true);
    }
    /** End a campaign. */
    async endCampaign(campaignId) {
        await this.post(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/end`, undefined, true);
    }
    // ── Ads ───────────────────────────────────────────────────
    /** List ads in a campaign. */
    async getAds(campaignId, params) {
        return this.get(`${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad`, params, true);
    }
    /** Get an ad by ID. */
    async getAd(campaignId, adId) {
        return this.get(`${this.ctx.baseUrl}${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad/${encodeURIComponent(adId)}`, undefined, true);
    }
    /** Create an ad from a listing ID. */
    async createAd(campaignId, request) {
        return this.post(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad`, request, true);
    }
    /** Create an ad from an inventory reference. */
    async createAdByInventoryReference(campaignId, request) {
        return this.post(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/create_ads_by_inventory_reference`, request, true);
    }
    /** Bulk create ads by listing IDs. */
    async bulkCreateAdsByListingId(campaignId, request) {
        return this.post(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/bulk_create_ads_by_listing_id`, request, true);
    }
    /** Delete an ad. */
    async deleteAd(campaignId, adId) {
        await this.del(`${MarketingAPI.BASE}/ad_campaign/${encodeURIComponent(campaignId)}/ad/${encodeURIComponent(adId)}`, true);
    }
    // ── Promotions ────────────────────────────────────────────
    /** List promotions. */
    async getPromotions(params) {
        return this.get(`${this.ctx.baseUrl}${MarketingAPI.BASE}/promotion`, params, true);
    }
    /** Get a promotion by ID. */
    async getPromotion(promotionId) {
        return this.get(`${this.ctx.baseUrl}${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}`, undefined, true);
    }
    /** Create a promotion (item price markdown, order discount, volume pricing, etc.). */
    async createPromotion(promotion) {
        return this.post(`${MarketingAPI.BASE}/promotion`, promotion, true);
    }
    /** Update a promotion. */
    async updatePromotion(promotionId, promotion) {
        await this.put(`${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}`, promotion, true);
    }
    /** Delete a promotion. */
    async deletePromotion(promotionId) {
        await this.del(`${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}`, true);
    }
    /** Pause a promotion. */
    async pausePromotion(promotionId) {
        await this.post(`${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}/pause`, undefined, true);
    }
    /** Resume a paused promotion. */
    async resumePromotion(promotionId) {
        await this.post(`${MarketingAPI.BASE}/promotion/${encodeURIComponent(promotionId)}/resume`, undefined, true);
    }
}
//# sourceMappingURL=marketing.js.map
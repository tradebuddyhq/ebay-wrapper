import { BaseAPI } from "../base-api.js";
import type { Ad, AdsResponse, BulkCreateAdsByListingIdRequest, BulkCreateAdsResponse, Campaign, CampaignsResponse, CreateAdRequest, CreateAdsByInventoryReferenceRequest, PromotionDetail, PromotionsResponse } from "../types.js";
/**
 * eBay Sell Marketing API — manage Promoted Listings campaigns, ads, and promotions.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/marketing/overview.html
 */
export declare class MarketingAPI extends BaseAPI {
    private static readonly BASE;
    /** List campaigns with optional filters. */
    getCampaigns(params?: {
        campaign_name?: string;
        campaign_status?: string;
        limit?: number;
        offset?: number;
    }): Promise<CampaignsResponse>;
    /** Get a campaign by ID. */
    getCampaign(campaignId: string): Promise<Campaign>;
    /** Create a Promoted Listings campaign. */
    createCampaign(campaign: Campaign): Promise<{
        campaignId: string;
    }>;
    /** Update a campaign. */
    updateCampaign(campaignId: string, campaign: Partial<Campaign>): Promise<void>;
    /** Delete a campaign. */
    deleteCampaign(campaignId: string): Promise<void>;
    /** Pause a campaign. */
    pauseCampaign(campaignId: string): Promise<void>;
    /** Resume a paused campaign. */
    resumeCampaign(campaignId: string): Promise<void>;
    /** End a campaign. */
    endCampaign(campaignId: string): Promise<void>;
    /** List ads in a campaign. */
    getAds(campaignId: string, params?: {
        listing_ids?: string;
        limit?: number;
        offset?: number;
    }): Promise<AdsResponse>;
    /** Get an ad by ID. */
    getAd(campaignId: string, adId: string): Promise<Ad>;
    /** Create an ad from a listing ID. */
    createAd(campaignId: string, request: CreateAdRequest): Promise<{
        adId: string;
    }>;
    /** Create an ad from an inventory reference. */
    createAdByInventoryReference(campaignId: string, request: CreateAdsByInventoryReferenceRequest): Promise<{
        adId: string;
    }>;
    /** Bulk create ads by listing IDs. */
    bulkCreateAdsByListingId(campaignId: string, request: BulkCreateAdsByListingIdRequest): Promise<BulkCreateAdsResponse>;
    /** Delete an ad. */
    deleteAd(campaignId: string, adId: string): Promise<void>;
    /** List promotions. */
    getPromotions(params?: {
        marketplace_id?: string;
        promotion_status?: string;
        limit?: number;
        offset?: number;
    }): Promise<PromotionsResponse>;
    /** Get a promotion by ID. */
    getPromotion(promotionId: string): Promise<PromotionDetail>;
    /** Create a promotion (item price markdown, order discount, volume pricing, etc.). */
    createPromotion(promotion: PromotionDetail): Promise<{
        promotionId: string;
    }>;
    /** Update a promotion. */
    updatePromotion(promotionId: string, promotion: Partial<PromotionDetail>): Promise<void>;
    /** Delete a promotion. */
    deletePromotion(promotionId: string): Promise<void>;
    /** Pause a promotion. */
    pausePromotion(promotionId: string): Promise<void>;
    /** Resume a paused promotion. */
    resumePromotion(promotionId: string): Promise<void>;
}
//# sourceMappingURL=marketing.d.ts.map
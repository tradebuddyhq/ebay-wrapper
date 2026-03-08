// ──────────────────────────────────────────────────────────────
// Environment & Client
// ──────────────────────────────────────────────────────────────

export type Environment = "production" | "sandbox";

export interface ClientOptions {
  /** eBay environment. Default: "production" */
  env?: Environment;
  /** eBay OAuth Client ID (App ID). */
  clientId: string;
  /** eBay OAuth Client Secret (Cert ID). */
  clientSecret: string;
  /** Default marketplace header. Example: "EBAY_US" */
  marketplaceId?: string;
  /** Default Accept-Language header. Example: "en-US" */
  acceptLanguage?: string;
  /** Supply your own access token directly. */
  accessToken?: string;
  /** Refresh token for user-level API access (Sell APIs). */
  refreshToken?: string;
  /** Request timeout in ms. Default: 15000 */
  timeoutMs?: number;
  /** Custom User-Agent string. */
  userAgent?: string;
  /** Max retries on 429 / 5xx errors. Default: 3 */
  maxRetries?: number;
  /** Requests per second rate limit. Default: 5 */
  rateLimitPerSecond?: number;
}

// ──────────────────────────────────────────────────────────────
// OAuth
// ──────────────────────────────────────────────────────────────

export interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserAccessToken extends OAuthToken {
  refresh_token: string;
  refresh_token_expires_in: number;
}

// ──────────────────────────────────────────────────────────────
// Common / Shared
// ──────────────────────────────────────────────────────────────

export interface Amount {
  value: string;
  currency: string;
}

export interface ConvertedAmount extends Amount {
  convertedFromValue?: string;
  convertedFromCurrency?: string;
}

export interface Image {
  imageUrl: string;
  height?: number;
  width?: number;
}

export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  countryCode?: string;
  county?: string;
}

export interface PhoneNumber {
  phoneNumber: string;
}

export interface Contact {
  fullName?: string;
  email?: string;
  primaryPhone?: PhoneNumber;
}

export interface PagedResult {
  total?: number;
  limit?: number;
  offset?: number;
  href?: string;
  next?: string;
  prev?: string;
}

export interface TimeDuration {
  value: number;
  unit: string;
}

// ──────────────────────────────────────────────────────────────
// Buy → Browse
// ──────────────────────────────────────────────────────────────

export interface BrowseSearchParams {
  /** Search keyword(s). */
  q?: string;
  /** Comma-separated category IDs. */
  category_ids?: string;
  /** eBay filter expression. */
  filter?: string;
  /** Sort order (e.g. "price", "-price", "newlyListed"). */
  sort?: string;
  /** Max items per page. Default: 50, Max: 200 */
  limit?: number;
  /** Pagination offset. */
  offset?: number;
  /** Aspect filter. */
  aspect_filter?: string;
  /** Comma-separated field groups. */
  fieldgroups?: string;
  /** Charity IDs to filter by. */
  charity_ids?: string;
  /** Compatibility filter. */
  compatibility_filter?: string;
  /** Auto-correct keyword spelling. */
  auto_correct?: string;
  /** X-EBAY-C-ENDUSERCTX header value. */
  epid?: string;
}

export interface Seller {
  username: string;
  feedbackPercentage?: string;
  feedbackScore?: number;
  sellerAccountType?: string;
}

export interface ShippingOption {
  shippingCostType?: string;
  shippingCost?: Amount;
  minEstimatedDeliveryDate?: string;
  maxEstimatedDeliveryDate?: string;
  guaranteedDelivery?: boolean;
  additionalShippingCostPerUnit?: Amount;
  shippingCarrierCode?: string;
  type?: string;
}

export interface TaxJurisdiction {
  region?: { regionName: string; regionType: string };
  taxJurisdictionId?: string;
}

export interface Tax {
  taxJurisdiction?: TaxJurisdiction;
  taxType?: string;
  amount?: Amount;
  shippingAndHandlingTaxed?: boolean;
  includedInPrice?: boolean;
  ebayCollectAndRemitTax?: boolean;
}

export interface MarketingPrice {
  originalPrice?: Amount;
  discountPercentage?: string;
  discountAmount?: Amount;
  priceTreatment?: string;
}

export interface EstimatedAvailability {
  deliveryOptions?: string[];
  estimatedAvailabilityStatus?: string;
  estimatedAvailableQuantity?: number;
  estimatedSoldQuantity?: number;
}

export interface ItemSummary {
  itemId: string;
  title: string;
  price?: ConvertedAmount;
  itemWebUrl?: string;
  image?: Image;
  additionalImages?: Image[];
  condition?: string;
  conditionId?: string;
  seller?: Seller;
  shippingOptions?: ShippingOption[];
  categories?: Array<{ categoryId: string; categoryName?: string }>;
  currentBidPrice?: Amount;
  buyingOptions?: string[];
  itemLocation?: { city?: string; stateOrProvince?: string; postalCode?: string; country?: string };
  itemGroupHref?: string;
  itemGroupType?: string;
  thumbnailImages?: Image[];
  marketingPrice?: MarketingPrice;
  leafCategoryIds?: string[];
  topRatedBuyingExperience?: boolean;
  legacyItemId?: string;
  adultOnly?: boolean;
  bidCount?: number;
  estimatedAvailabilities?: EstimatedAvailability[];
  itemAffiliateWebUrl?: string;
  shortDescription?: string;
  epid?: string;
  itemCreationDate?: string;
  itemEndDate?: string;
  priorityListing?: boolean;
  qualifiedPrograms?: string[];
  watchCount?: number;
}

export interface SearchResponse extends PagedResult {
  itemSummaries?: ItemSummary[];
  refinement?: {
    aspectDistributions?: Array<{
      localizedAspectName: string;
      aspectValueDistributions: Array<{ localizedAspectValue: string; matchCount: number; refinementHref: string }>;
    }>;
    buyingOptionDistributions?: Array<{ buyingOption: string; matchCount: number; refinementHref: string }>;
    categoryDistributions?: Array<{ categoryId: string; categoryName: string; matchCount: number; refinementHref: string }>;
    conditionDistributions?: Array<{ condition: string; conditionId: string; matchCount: number; refinementHref: string }>;
  };
  warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
  autoCorrections?: { q?: string };
}

export interface ItemDetail {
  itemId: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  description?: string;
  price?: ConvertedAmount;
  categoryPath?: string;
  categoryIdPath?: string;
  condition?: string;
  conditionId?: string;
  conditionDescription?: string;
  itemWebUrl?: string;
  itemAffiliateWebUrl?: string;
  image?: Image;
  additionalImages?: Image[];
  color?: string;
  size?: string;
  brand?: string;
  mpn?: string;
  gtin?: string;
  epid?: string;
  seller?: Seller;
  shippingOptions?: ShippingOption[];
  shipToLocations?: { regionIncluded?: Array<{ regionName: string; regionType: string }>; regionExcluded?: Array<{ regionName: string; regionType: string }> };
  returnTerms?: { returnsAccepted?: boolean; refundMethod?: string; returnPeriod?: TimeDuration; returnShippingCostPayer?: string; returnMethod?: string };
  taxes?: Tax[];
  localizedAspects?: Array<{ type: string; name: string; value: string }>;
  topRatedBuyingExperience?: boolean;
  buyingOptions?: string[];
  currentBidPrice?: Amount;
  bidCount?: number;
  minimumPriceToBid?: Amount;
  uniqueBidderCount?: number;
  estimatedAvailabilities?: EstimatedAvailability[];
  primaryProductReviewRating?: { reviewCount: number; averageRating: string };
  primaryItemGroup?: { itemGroupId: string; itemGroupType: string; itemGroupHref: string };
  enabledForGuestCheckout?: boolean;
  eligibleForInlineCheckout?: boolean;
  legacyItemId?: string;
  priorityListing?: boolean;
  adultOnly?: boolean;
  listingMarketplaceId?: string;
  itemCreationDate?: string;
  itemEndDate?: string;
  itemLocation?: Address;
  quantityLimitPerBuyer?: number;
  paymentMethods?: Array<{ paymentMethodType: string; paymentMethodBrands?: Array<{ logoImage?: Image; paymentMethodBrandType: string }> }>;
  marketingPrice?: MarketingPrice;
  availableCoupons?: Array<{ redemptionCode: string; discountAmount?: Amount; discountType?: string; message?: string; terms?: string }>;
  watchCount?: number;
}

export interface ItemGroupResponse {
  items?: ItemDetail[];
  commonDescriptions?: Array<{ description: string; itemIds: string[] }>;
}

export interface CompatibilityPayload {
  compatibilityProperties: Array<{ name: string; value: string }>;
}

export interface CompatibilityResponse {
  compatibilityStatus?: string;
  warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
}

// ──────────────────────────────────────────────────────────────
// Buy → Order
// ──────────────────────────────────────────────────────────────

export interface GuestCheckoutSessionRequest {
  contactEmail: string;
  contactFirstName: string;
  contactLastName: string;
  shippingAddress: Address;
  lineItemInputs: Array<{
    itemId: string;
    quantity: number;
    offerId?: string;
  }>;
}

export interface CheckoutSession {
  checkoutSessionId: string;
  expirationDate?: string;
  lineItems?: Array<{
    itemId: string;
    title: string;
    quantity: number;
    lineItemId: string;
    image?: Image;
    netPrice?: Amount;
    shippingCost?: Amount;
    baseUnitPrice?: Amount;
    promotions?: Array<{ discount?: Amount; message?: string }>;
  }>;
  pricingSummary?: {
    lineItemSubtotal?: Amount;
    shippingCost?: Amount;
    tax?: Amount;
    total?: Amount;
    deliveryDiscount?: Amount;
    priceDiscount?: Amount;
    fee?: Amount;
  };
  warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
}

export interface PurchaseOrderResponse {
  purchaseOrderId: string;
  purchaseOrderStatus?: string;
  purchaseOrderPaymentStatus?: string;
  purchaseOrderCreationDate?: string;
  warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
}

export interface UpdateQuantityRequest {
  lineItemId: string;
  quantity: number;
}

export interface UpdateShippingAddressRequest {
  shippingAddress: Address;
}

export interface UpdatePaymentRequest {
  paymentMethodType: string;
  paymentMethodBrandType?: string;
}

// ──────────────────────────────────────────────────────────────
// Buy → Marketplace Insights
// ──────────────────────────────────────────────────────────────

export interface MarketplaceInsightsSearchParams {
  q?: string;
  category_ids?: string;
  filter?: string;
  sort?: string;
  limit?: number;
  offset?: number;
  aspect_filter?: string;
  fieldgroups?: string;
  epid?: string;
  gtin?: string;
}

export interface SoldItemSummary {
  itemId: string;
  title: string;
  price?: ConvertedAmount;
  soldDate?: string;
  soldQuantity?: number;
  totalSoldQuantity?: number;
  condition?: string;
  conditionId?: string;
  image?: Image;
  additionalImages?: Image[];
  categories?: Array<{ categoryId: string; categoryName?: string }>;
  seller?: Seller;
  buyingOptions?: string[];
  itemLocation?: { city?: string; stateOrProvince?: string; postalCode?: string; country?: string };
  epid?: string;
  lastSoldDate?: string;
  lastSoldPrice?: Amount;
  bidCount?: number;
  qualifiedPrograms?: string[];
}

export interface MarketplaceInsightsSearchResponse extends PagedResult {
  itemSummaries?: SoldItemSummary[];
  refinement?: SearchResponse["refinement"];
}

// ──────────────────────────────────────────────────────────────
// Sell → Inventory
// ──────────────────────────────────────────────────────────────

export interface InventoryItem {
  sku?: string;
  locale?: string;
  product?: {
    title?: string;
    description?: string;
    aspects?: Record<string, string[]>;
    brand?: string;
    mpn?: string;
    epid?: string;
    imageUrls?: string[];
    ean?: string[];
    isbn?: string[];
    upc?: string[];
    subtitle?: string;
  };
  condition?: string;
  conditionDescription?: string;
  availability?: {
    shipToLocationAvailability?: {
      quantity: number;
      allocationByFormat?: { fixedPrice?: number; auction?: number };
    };
    pickupAtLocationAvailability?: Array<{
      merchantLocationKey: string;
      quantity: number;
      fulfillmentTime?: TimeDuration;
      availabilityType?: string;
    }>;
  };
  packageWeightAndSize?: {
    packageType?: string;
    weight?: { value: number; unit: string };
    dimensions?: { height: number; length: number; width: number; unit: string };
  };
  groupIds?: string[];
  inventoryItemGroupKeys?: string[];
}

export interface InventoryItemResponse extends InventoryItem {
  sku: string;
}

export interface InventoryItemsResponse extends PagedResult {
  inventoryItems?: InventoryItemResponse[];
}

export interface BulkInventoryItemRequest {
  requests: Array<{
    sku: string;
    locale: string;
    shipToLocationAvailability: { quantity: number };
    product?: InventoryItem["product"];
    condition?: string;
    conditionDescription?: string;
    packageWeightAndSize?: InventoryItem["packageWeightAndSize"];
  }>;
}

export interface BulkInventoryItemResponse {
  responses: Array<{
    statusCode: number;
    sku?: string;
    errors?: Array<{ errorId: number; domain: string; category: string; message: string }>;
    warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
  }>;
}

export interface BulkPriceQuantityRequest {
  requests: Array<{
    sku: string;
    offers: Array<{
      offerId: string;
      availableQuantity?: number;
      price?: Amount;
    }>;
    shipToLocationAvailability?: { quantity: number };
  }>;
}

export interface BulkPriceQuantityResponse {
  responses: Array<{
    statusCode: number;
    sku?: string;
    offerId?: string;
    errors?: Array<{ errorId: number; domain: string; category: string; message: string }>;
  }>;
}

export interface Offer {
  offerId?: string;
  sku: string;
  marketplaceId: string;
  format: string;
  listingDescription?: string;
  availableQuantity?: number;
  pricingSummary?: {
    price: Amount;
    minimumAdvertisedPrice?: Amount;
    originallySoldForRetailPriceOn?: string;
    originalRetailPrice?: Amount;
    pricingVisibility?: string;
  };
  quantityLimitPerBuyer?: number;
  listingPolicies?: {
    paymentPolicyId: string;
    returnPolicyId: string;
    fulfillmentPolicyId: string;
    shippingCostOverrides?: Array<{
      priority?: number;
      surcharge?: Amount;
      additionalShippingCost?: Amount;
      shippingCost?: Amount;
      shippingServiceType?: string;
    }>;
    ebayPlusIfEligible?: boolean;
  };
  categoryId?: string;
  merchantLocationKey?: string;
  tax?: { vatPercentage?: number; salesTax?: { percentage?: string; applyTax?: boolean } };
  storeCategoryNames?: string[];
  listingDuration?: string;
  includeCatalogProductDetails?: boolean;
  hideBuyerDetails?: boolean;
  listingStartDate?: string;
  lotSize?: number;
  status?: string;
  listing?: { listingId: string; listingStatus: string };
}

export interface OfferResponse extends Offer {
  offerId: string;
}

export interface OffersResponse extends PagedResult {
  offers?: OfferResponse[];
}

export interface PublishResponse {
  listingId: string;
  warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
}

export interface WithdrawResponse {
  listingId?: string;
  warnings?: Array<{ errorId: number; domain: string; category: string; message: string }>;
}

export interface InventoryItemGroup {
  inventoryItemGroupKey: string;
  aspects?: Record<string, string[]>;
  title?: string;
  description?: string;
  imageUrls?: string[];
  variantSKUs?: string[];
  variesBy?: {
    aspectsImageVariesBy?: string[];
    specifications?: Array<{ name: string; values: string[] }>;
  };
  subtitle?: string;
  videoIds?: string[];
}

export interface BulkMigrateListingRequest {
  requests: Array<{ listingId: string }>;
}

export interface BulkMigrateListingResponse {
  responses: Array<{
    statusCode: number;
    listingId?: string;
    inventoryItemGroupKey?: string;
    inventoryItems?: Array<{ sku: string; offerId: string }>;
    errors?: Array<{ errorId: number; domain: string; category: string; message: string }>;
  }>;
}

// ──────────────────────────────────────────────────────────────
// Sell → Fulfillment
// ──────────────────────────────────────────────────────────────

export interface OrderSearchParams {
  filter?: string;
  limit?: number;
  offset?: number;
  orderIds?: string;
  fieldGroups?: string;
}

export interface LineItem {
  lineItemId: string;
  legacyItemId?: string;
  title: string;
  sku?: string;
  lineItemCost?: Amount;
  quantity: number;
  soldFormat?: string;
  deliveryCost?: { shippingCost?: Amount; handlingCost?: Amount; importCharges?: Amount };
  appliedPromotions?: Array<{ promotionId?: string; description?: string; discountAmount?: Amount }>;
  taxes?: Array<{ taxType?: string; amount?: Amount; ebayCollectAndRemitTax?: boolean }>;
  properties?: { buyerProtection?: boolean; fromBestOffer?: boolean };
  lineItemFulfillmentStatus?: string;
  lineItemFulfillmentInstructions?: {
    guaranteedDelivery?: boolean;
    maxEstimatedDeliveryDate?: string;
    minEstimatedDeliveryDate?: string;
    shipByDate?: string;
  };
  itemLocation?: Address;
}

export interface Order {
  orderId: string;
  legacyOrderId?: string;
  creationDate?: string;
  lastModifiedDate?: string;
  orderFulfillmentStatus?: string;
  orderPaymentStatus?: string;
  buyer?: {
    username?: string;
    taxAddress?: Address;
    taxIdentifier?: { taxpayerType?: string; taxIdentifierType?: string; issuingCountry?: string };
    buyerRegistrationAddress?: Address;
  };
  pricingSummary?: {
    priceSubtotal?: Amount;
    deliveryCost?: Amount;
    tax?: Amount;
    total?: Amount;
    priceDiscount?: Amount;
    deliveryDiscount?: Amount;
    fee?: Amount;
    adjustment?: Amount;
  };
  cancelStatus?: {
    cancelState?: string;
    cancelRequests?: Array<{
      cancelRequestId?: string;
      cancelReason?: string;
      cancelRequestedDate?: string;
      cancelState?: string;
      cancelCompletedDate?: string;
    }>;
  };
  paymentSummary?: {
    totalDueSeller?: Amount;
    payments?: Array<{
      paymentMethod?: string;
      paymentReferenceId?: string;
      paymentDate?: string;
      amount?: Amount;
      paymentStatus?: string;
    }>;
    refunds?: Array<{
      refundId?: string;
      refundDate?: string;
      amount?: Amount;
      refundReferenceId?: string;
      refundStatus?: string;
    }>;
  };
  fulfillmentStartInstructions?: Array<{
    fulfillmentInstructionsType?: string;
    shippingStep?: {
      shipTo?: Contact & { companyName?: string; contactAddress?: Address };
      shippingCarrierCode?: string;
      shippingServiceCode?: string;
    };
    ebaySupportedFulfillment?: boolean;
    maxEstimatedDeliveryDate?: string;
    minEstimatedDeliveryDate?: string;
  }>;
  fulfillmentHrefs?: string[];
  lineItems: LineItem[];
  salesRecordReference?: string;
  totalFeeBasisAmount?: Amount;
  totalMarketplaceFee?: Amount;
}

export interface OrdersResponse extends PagedResult {
  orders?: Order[];
}

export interface ShippingFulfillment {
  fulfillmentId: string;
  shipmentTrackingNumber?: string;
  shippingCarrierCode?: string;
  shippedDate?: string;
  lineItems?: Array<{ lineItemId: string; quantity: number }>;
}

export interface ShippingFulfillmentsResponse {
  fulfillments?: ShippingFulfillment[];
}

export interface CreateShippingFulfillmentRequest {
  lineItems: Array<{ lineItemId: string; quantity: number }>;
  shippedDate: string;
  shippingCarrierCode: string;
  trackingNumber: string;
}

export interface IssueRefundRequest {
  reasonForRefund: string;
  comment?: string;
  refundItems?: Array<{
    refundAmount: Amount;
    lineItemId: string;
  }>;
  orderLevelRefundAmount?: Amount;
}

export interface RefundResponse {
  refundId: string;
  refundStatus: string;
}

// ──────────────────────────────────────────────────────────────
// Sell → Account
// ──────────────────────────────────────────────────────────────

export interface FulfillmentPolicy {
  fulfillmentPolicyId?: string;
  name: string;
  marketplaceId: string;
  categoryTypes: Array<{ name: string; default?: boolean }>;
  handlingTime: TimeDuration;
  shippingOptions: Array<{
    optionType: string;
    costType: string;
    shippingServices: Array<{
      shippingCarrierCode: string;
      shippingServiceCode: string;
      sortOrder?: number;
      freeShipping?: boolean;
      shippingCost?: Amount;
      additionalShippingCost?: Amount;
      buyerResponsibleForShipping?: boolean;
      buyerResponsibleForPickup?: boolean;
    }>;
    insuranceFee?: Amount;
    insuranceOffered?: boolean;
  }>;
  globalShipping?: boolean;
  freightShipping?: boolean;
  pickupDropOff?: boolean;
  localPickup?: boolean;
  shipToLocations?: {
    regionIncluded?: Array<{ regionName: string; regionType: string }>;
    regionExcluded?: Array<{ regionName: string; regionType: string }>;
  };
  description?: string;
}

export interface FulfillmentPoliciesResponse {
  fulfillmentPolicies?: FulfillmentPolicy[];
  total?: number;
}

export interface PaymentPolicy {
  paymentPolicyId?: string;
  name: string;
  marketplaceId: string;
  categoryTypes: Array<{ name: string; default?: boolean }>;
  paymentMethods: Array<{
    paymentMethodType: string;
    recipientAccountReference?: { referenceId: string; referenceType: string };
    brands?: string[];
  }>;
  immediatePay?: boolean;
  fullPaymentDueIn?: TimeDuration;
  description?: string;
}

export interface PaymentPoliciesResponse {
  paymentPolicies?: PaymentPolicy[];
  total?: number;
}

export interface ReturnPolicy {
  returnPolicyId?: string;
  name: string;
  marketplaceId: string;
  categoryTypes: Array<{ name: string; default?: boolean }>;
  returnsAccepted: boolean;
  returnPeriod?: TimeDuration;
  refundMethod?: string;
  returnShippingCostPayer?: string;
  returnMethod?: string;
  extendedHolidayReturnsOffered?: boolean;
  restockingFeePercentage?: string;
  description?: string;
}

export interface ReturnPoliciesResponse {
  returnPolicies?: ReturnPolicy[];
  total?: number;
}

export interface SalesTax {
  salesTaxPercentage: string;
  shippingAndHandlingTaxed: boolean;
  countryCode: string;
  salesTaxJurisdictionId: string;
}

export interface SalesTaxesResponse {
  salesTaxes?: SalesTax[];
}

export interface PrivilegesResponse {
  sellingLimit?: {
    amount?: Amount;
    quantity?: number;
  };
  buyingLimit?: {
    amount?: Amount;
    quantity?: number;
  };
}

export interface ProgramResponse {
  programType: string;
}

export interface OptedInProgramsResponse {
  programs?: ProgramResponse[];
}

// ──────────────────────────────────────────────────────────────
// Sell → Marketing
// ──────────────────────────────────────────────────────────────

export interface Campaign {
  campaignId?: string;
  campaignName: string;
  campaignStatus?: string;
  marketplaceId: string;
  startDate?: string;
  endDate?: string;
  fundingStrategy: {
    fundingModel: string;
    bidPercentage?: string;
    adRateStrategy?: string;
  };
  campaignCriterion?: {
    criterionType?: string;
    selectionRules?: Array<{
      brands?: string[];
      categoryIds?: string[];
      listingConditionIds?: string[];
      maxPrice?: Amount;
      minPrice?: Amount;
    }>;
  };
  budget?: {
    daily?: Amount;
    total?: Amount;
  };
}

export interface CampaignsResponse extends PagedResult {
  campaigns?: Campaign[];
}

export interface PromotionDetail {
  promotionId?: string;
  name: string;
  marketplaceId: string;
  startDate: string;
  endDate?: string;
  promotionStatus?: string;
  promotionType: string;
  priority?: string;
  description?: string;
  discountRules?: Array<{
    discountBenefit?: { percentageOffItem?: string; percentageOffOrder?: string; amountOffItem?: Amount; amountOffOrder?: Amount };
    discountSpecification?: {
      forEachQuantity?: number;
      minQuantity?: number;
      minAmount?: Amount;
      maxDiscountAmount?: Amount;
      numberOfDiscountedItems?: number;
    };
    ruleOrder?: number;
  }>;
  inventoryCriterion?: {
    inventoryCriterionType?: string;
    inventoryItems?: Array<{ inventoryReferenceId: string; inventoryReferenceType: string }>;
    listingIds?: string[];
    ruleCriteria?: {
      excludeInventoryItems?: Array<{ inventoryReferenceId: string; inventoryReferenceType: string }>;
      excludeListingIds?: string[];
      markupRule?: { percentage: string; markupType: string };
      selectionRules?: Array<{ brands?: string[]; categoryIds?: string[]; listingConditionIds?: string[]; maxPrice?: Amount; minPrice?: Amount }>;
    };
  };
}

export interface PromotionsResponse extends PagedResult {
  promotions?: PromotionDetail[];
}

export interface AdGroup {
  adGroupId?: string;
  name: string;
  status?: string;
  defaultBid?: Amount;
}

export interface Ad {
  adId?: string;
  listingId: string;
  bidPercentage?: string;
  status?: string;
}

export interface AdsResponse extends PagedResult {
  ads?: Ad[];
}

export interface CreateAdsByInventoryReferenceRequest {
  inventoryReferenceId: string;
  inventoryReferenceType: string;
  bidPercentage: string;
}

export interface CreateAdRequest {
  listingId: string;
  bidPercentage?: string;
}

export interface BulkCreateAdsByListingIdRequest {
  requests: CreateAdRequest[];
}

export interface BulkCreateAdsResponse {
  responses: Array<{
    statusCode: number;
    listingId?: string;
    adId?: string;
    errors?: Array<{ errorId: number; domain: string; category: string; message: string }>;
  }>;
}

export interface CampaignReportRequest {
  campaignIds: string[];
  dateRange: string;
  dimensions?: string[];
  listingIds?: string[];
  metricKeys: string[];
}

// ──────────────────────────────────────────────────────────────
// Sell → Finances
// ──────────────────────────────────────────────────────────────

export interface TransactionSearchParams {
  filter?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface Transaction {
  transactionId: string;
  transactionType?: string;
  transactionStatus?: string;
  transactionDate?: string;
  transactionMemo?: string;
  orderId?: string;
  orderLineItems?: Array<{
    lineItemId: string;
    feeBasisAmount?: Amount;
    marketplaceFees?: Array<{ feeType: string; amount: Amount }>;
  }>;
  payin?: { payinId?: string; payinDate?: string };
  payout?: { payoutId?: string; payoutDate?: string; payoutStatus?: string; payoutReference?: string };
  amount?: Amount;
  totalFeeBasisAmount?: Amount;
  totalFeeAmount?: Amount;
  salesRecordReference?: string;
  buyer?: { username?: string };
  references?: Array<{ referenceId: string; referenceType: string }>;
  bookingEntry?: string;
  feeType?: string;
}

export interface TransactionsResponse extends PagedResult {
  transactions?: Transaction[];
}

export interface PayoutSearchParams {
  filter?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface Payout {
  payoutId: string;
  payoutStatus?: string;
  payoutStatusDescription?: string;
  amount?: Amount;
  payoutDate?: string;
  payoutInstrument?: {
    instrumentType?: string;
    nickname?: string;
    accountLastFourDigits?: string;
  };
  payoutMemo?: string;
  transactionCount?: number;
  lastAttemptedPayoutDate?: string;
}

export interface PayoutsResponse extends PagedResult {
  payouts?: Payout[];
}

export interface PayoutSummaryResponse {
  amount?: Amount;
  transactionCount?: number;
  adjustmentAmount?: Amount;
  balanceAmount?: Amount;
  creditAmount?: Amount;
  debitAmount?: Amount;
  feeAmount?: Amount;
  onHoldAmount?: Amount;
  processingAmount?: Amount;
  totalDue?: Amount;
  totalPaid?: Amount;
}

export interface TransferSearchParams {
  filter?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface Transfer {
  transferId: string;
  transferDate?: string;
  transferAmount?: Amount;
  fundingSource?: { brand?: string; memo?: string; type?: string };
  transactionType?: string;
}

export interface TransfersResponse extends PagedResult {
  transfers?: Transfer[];
}

export interface SellerFundsSummaryResponse {
  availableFunds?: Amount;
  fundsOnHold?: Amount;
  processingFunds?: Amount;
  totalFunds?: Amount;
}

// ──────────────────────────────────────────────────────────────
// Commerce → Taxonomy
// ──────────────────────────────────────────────────────────────

export interface CategoryTree {
  categoryTreeId: string;
  categoryTreeVersion: string;
  applicableMarketplaceIds?: string[];
  rootCategoryNode?: CategoryTreeNode;
}

export interface CategoryTreeNode {
  category: {
    categoryId: string;
    categoryName: string;
  };
  categoryTreeNodeLevel?: number;
  leafCategoryTreeNode?: boolean;
  parentCategoryTreeNodeHref?: string;
  childCategoryTreeNodes?: CategoryTreeNode[];
}

export interface CategorySuggestion {
  category: {
    categoryId: string;
    categoryName: string;
  };
  categoryTreeNodeLevel?: number;
  categoryTreeNodeAncestors?: Array<{
    categoryId: string;
    categoryName: string;
    categoryTreeNodeLevel: number;
  }>;
  relevancy?: string;
}

export interface CategorySuggestionsResponse {
  categorySuggestions?: CategorySuggestion[];
  categoryTreeId?: string;
  categoryTreeVersion?: string;
}

export interface CategorySubtree {
  categorySubtreeNode?: CategoryTreeNode;
  categoryTreeId?: string;
  categoryTreeVersion?: string;
}

export interface AspectMetadata {
  aspects?: Array<{
    localizedAspectName: string;
    aspectConstraint?: {
      aspectRequired?: boolean;
      aspectMode?: string;
      aspectUsage?: string;
      aspectEnabledForVariations?: boolean;
      itemToAspectCardinality?: string;
      aspectMaxLength?: number;
      expectedRequiredByDate?: string;
    };
    aspectValues?: Array<{
      localizedValue: string;
      valueConstraints?: Array<{ applicableForLocalizedAspectName: string; applicableForLocalizedAspectValues: string[] }>;
    }>;
    relevanceIndicator?: { searchCount?: number };
  }>;
}

export interface CompatibilityPropertyValue {
  value: string;
}

export interface CompatibilityPropertyValuesResponse {
  compatibilityPropertyValues?: CompatibilityPropertyValue[];
}

export interface CompatibilityProperty {
  name: string;
  localizedName?: string;
}

export interface CompatibilityPropertiesResponse {
  compatibilityProperties?: CompatibilityProperty[];
}

export interface DefaultCategoryTreeIdResponse {
  categoryTreeId: string;
  categoryTreeVersion: string;
}

// ──────────────────────────────────────────────────────────────
// Commerce → Catalog
// ──────────────────────────────────────────────────────────────

export interface CatalogSearchParams {
  q?: string;
  category_id?: string;
  epid?: string;
  gtin?: string;
  limit?: number;
  offset?: number;
  aspect_filter?: string;
  fieldgroups?: string;
}

export interface CatalogProduct {
  epid: string;
  title: string;
  description?: string;
  image?: Image;
  additionalImages?: Image[];
  aspects?: Array<{ localizedName: string; localizedValues: string[] }>;
  brand?: string;
  mpn?: string;
  ean?: string[];
  isbn?: string[];
  upc?: string[];
  gtins?: string[];
  category?: { categoryId: string; categoryName: string };
  productWebUrl?: string;
  version?: string;
}

export interface CatalogSearchResponse extends PagedResult {
  productSummaries?: CatalogProduct[];
  refinement?: {
    aspectDistributions?: Array<{
      localizedAspectName: string;
      aspectValueDistributions: Array<{ localizedAspectValue: string; matchCount: number; refinementHref: string }>;
    }>;
    dominantCategoryId?: string;
  };
}

// ──────────────────────────────────────────────────────────────
// Developer → Analytics
// ──────────────────────────────────────────────────────────────

export interface RateLimitResponse {
  rateLimits?: Array<{
    apiContext?: string;
    apiName?: string;
    apiVersion?: string;
    resources?: Array<{
      name?: string;
      rates?: Array<{
        limit?: number;
        remaining?: number;
        reset?: string;
        timeWindow?: number;
      }>;
    }>;
  }>;
}

import { BaseAPI } from "../base-api.js";
import type {
  FulfillmentPoliciesResponse,
  FulfillmentPolicy,
  OptedInProgramsResponse,
  PaymentPoliciesResponse,
  PaymentPolicy,
  PrivilegesResponse,
  ProgramResponse,
  ReturnPoliciesResponse,
  ReturnPolicy,
  SalesTax,
  SalesTaxesResponse,
} from "../types.js";

/**
 * eBay Sell Account API — manage seller policies, programs, and sales tax.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/account/overview.html
 */
export class AccountAPI extends BaseAPI {
  private static readonly BASE = "/sell/account/v1";

  // ── Privileges ────────────────────────────────────────────

  /** Get selling/buying privileges for the authenticated user. */
  async getPrivileges(): Promise<PrivilegesResponse> {
    return this.get<PrivilegesResponse>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/privilege`,
      undefined,
      true,
    );
  }

  // ── Programs ──────────────────────────────────────────────

  /** Get programs the user has opted into. */
  async getOptedInPrograms(): Promise<OptedInProgramsResponse> {
    return this.get<OptedInProgramsResponse>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/program/get_opted_in_programs`,
      undefined,
      true,
    );
  }

  /** Opt into an eBay program. */
  async optInToProgram(programType: string): Promise<ProgramResponse> {
    return this.post<ProgramResponse>(
      `${AccountAPI.BASE}/program/opt_in`,
      { programType },
      true,
    );
  }

  /** Opt out of an eBay program. */
  async optOutOfProgram(programType: string): Promise<void> {
    await this.post<void>(
      `${AccountAPI.BASE}/program/opt_out`,
      { programType },
      true,
    );
  }

  // ── Fulfillment Policies ──────────────────────────────────

  /** Get all fulfillment policies for a marketplace. */
  async getFulfillmentPolicies(marketplaceId: string): Promise<FulfillmentPoliciesResponse> {
    return this.get<FulfillmentPoliciesResponse>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/fulfillment_policy`,
      { marketplace_id: marketplaceId },
      true,
    );
  }

  /** Get a fulfillment policy by ID. */
  async getFulfillmentPolicy(policyId: string): Promise<FulfillmentPolicy> {
    return this.get<FulfillmentPolicy>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/fulfillment_policy/${encodeURIComponent(policyId)}`,
      undefined,
      true,
    );
  }

  /** Create a fulfillment policy. */
  async createFulfillmentPolicy(policy: FulfillmentPolicy): Promise<FulfillmentPolicy> {
    return this.post<FulfillmentPolicy>(
      `${AccountAPI.BASE}/fulfillment_policy`,
      policy,
      true,
    );
  }

  /** Update a fulfillment policy. */
  async updateFulfillmentPolicy(policyId: string, policy: FulfillmentPolicy): Promise<FulfillmentPolicy> {
    return this.put<FulfillmentPolicy>(
      `${AccountAPI.BASE}/fulfillment_policy/${encodeURIComponent(policyId)}`,
      policy,
      true,
    );
  }

  /** Delete a fulfillment policy. */
  async deleteFulfillmentPolicy(policyId: string): Promise<void> {
    await this.del<void>(
      `${AccountAPI.BASE}/fulfillment_policy/${encodeURIComponent(policyId)}`,
      true,
    );
  }

  // ── Payment Policies ──────────────────────────────────────

  /** Get all payment policies for a marketplace. */
  async getPaymentPolicies(marketplaceId: string): Promise<PaymentPoliciesResponse> {
    return this.get<PaymentPoliciesResponse>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/payment_policy`,
      { marketplace_id: marketplaceId },
      true,
    );
  }

  /** Get a payment policy by ID. */
  async getPaymentPolicy(policyId: string): Promise<PaymentPolicy> {
    return this.get<PaymentPolicy>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/payment_policy/${encodeURIComponent(policyId)}`,
      undefined,
      true,
    );
  }

  /** Create a payment policy. */
  async createPaymentPolicy(policy: PaymentPolicy): Promise<PaymentPolicy> {
    return this.post<PaymentPolicy>(
      `${AccountAPI.BASE}/payment_policy`,
      policy,
      true,
    );
  }

  /** Update a payment policy. */
  async updatePaymentPolicy(policyId: string, policy: PaymentPolicy): Promise<PaymentPolicy> {
    return this.put<PaymentPolicy>(
      `${AccountAPI.BASE}/payment_policy/${encodeURIComponent(policyId)}`,
      policy,
      true,
    );
  }

  /** Delete a payment policy. */
  async deletePaymentPolicy(policyId: string): Promise<void> {
    await this.del<void>(
      `${AccountAPI.BASE}/payment_policy/${encodeURIComponent(policyId)}`,
      true,
    );
  }

  // ── Return Policies ───────────────────────────────────────

  /** Get all return policies for a marketplace. */
  async getReturnPolicies(marketplaceId: string): Promise<ReturnPoliciesResponse> {
    return this.get<ReturnPoliciesResponse>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/return_policy`,
      { marketplace_id: marketplaceId },
      true,
    );
  }

  /** Get a return policy by ID. */
  async getReturnPolicy(policyId: string): Promise<ReturnPolicy> {
    return this.get<ReturnPolicy>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/return_policy/${encodeURIComponent(policyId)}`,
      undefined,
      true,
    );
  }

  /** Create a return policy. */
  async createReturnPolicy(policy: ReturnPolicy): Promise<ReturnPolicy> {
    return this.post<ReturnPolicy>(
      `${AccountAPI.BASE}/return_policy`,
      policy,
      true,
    );
  }

  /** Update a return policy. */
  async updateReturnPolicy(policyId: string, policy: ReturnPolicy): Promise<ReturnPolicy> {
    return this.put<ReturnPolicy>(
      `${AccountAPI.BASE}/return_policy/${encodeURIComponent(policyId)}`,
      policy,
      true,
    );
  }

  /** Delete a return policy. */
  async deleteReturnPolicy(policyId: string): Promise<void> {
    await this.del<void>(
      `${AccountAPI.BASE}/return_policy/${encodeURIComponent(policyId)}`,
      true,
    );
  }

  // ── Sales Tax ─────────────────────────────────────────────

  /** Get all sales tax tables for a country. */
  async getSalesTaxes(countryCode: string): Promise<SalesTaxesResponse> {
    return this.get<SalesTaxesResponse>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/sales_tax`,
      { country_code: countryCode },
      true,
    );
  }

  /** Get a sales tax entry. */
  async getSalesTax(countryCode: string, jurisdictionId: string): Promise<SalesTax> {
    return this.get<SalesTax>(
      `${this.ctx.baseUrl}${AccountAPI.BASE}/sales_tax/${encodeURIComponent(jurisdictionId)}`,
      { country_code: countryCode },
      true,
    );
  }

  /** Create or replace a sales tax entry. */
  async createOrReplaceSalesTax(countryCode: string, jurisdictionId: string, salesTax: { salesTaxPercentage: string; shippingAndHandlingTaxed: boolean }): Promise<void> {
    await this.put<void>(
      `${AccountAPI.BASE}/sales_tax/${encodeURIComponent(jurisdictionId)}`,
      { ...salesTax, countryCode },
      true,
    );
  }

  /** Delete a sales tax entry. */
  async deleteSalesTax(countryCode: string, jurisdictionId: string): Promise<void> {
    await this.del<void>(
      `${AccountAPI.BASE}/sales_tax/${encodeURIComponent(jurisdictionId)}?country_code=${encodeURIComponent(countryCode)}`,
      true,
    );
  }
}

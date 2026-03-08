import { BaseAPI } from "../base-api.js";
import type { FulfillmentPoliciesResponse, FulfillmentPolicy, OptedInProgramsResponse, PaymentPoliciesResponse, PaymentPolicy, PrivilegesResponse, ProgramResponse, ReturnPoliciesResponse, ReturnPolicy, SalesTax, SalesTaxesResponse } from "../types.js";
/**
 * eBay Sell Account API — manage seller policies, programs, and sales tax.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/account/overview.html
 */
export declare class AccountAPI extends BaseAPI {
    private static readonly BASE;
    /** Get selling/buying privileges for the authenticated user. */
    getPrivileges(): Promise<PrivilegesResponse>;
    /** Get programs the user has opted into. */
    getOptedInPrograms(): Promise<OptedInProgramsResponse>;
    /** Opt into an eBay program. */
    optInToProgram(programType: string): Promise<ProgramResponse>;
    /** Opt out of an eBay program. */
    optOutOfProgram(programType: string): Promise<void>;
    /** Get all fulfillment policies for a marketplace. */
    getFulfillmentPolicies(marketplaceId: string): Promise<FulfillmentPoliciesResponse>;
    /** Get a fulfillment policy by ID. */
    getFulfillmentPolicy(policyId: string): Promise<FulfillmentPolicy>;
    /** Create a fulfillment policy. */
    createFulfillmentPolicy(policy: FulfillmentPolicy): Promise<FulfillmentPolicy>;
    /** Update a fulfillment policy. */
    updateFulfillmentPolicy(policyId: string, policy: FulfillmentPolicy): Promise<FulfillmentPolicy>;
    /** Delete a fulfillment policy. */
    deleteFulfillmentPolicy(policyId: string): Promise<void>;
    /** Get all payment policies for a marketplace. */
    getPaymentPolicies(marketplaceId: string): Promise<PaymentPoliciesResponse>;
    /** Get a payment policy by ID. */
    getPaymentPolicy(policyId: string): Promise<PaymentPolicy>;
    /** Create a payment policy. */
    createPaymentPolicy(policy: PaymentPolicy): Promise<PaymentPolicy>;
    /** Update a payment policy. */
    updatePaymentPolicy(policyId: string, policy: PaymentPolicy): Promise<PaymentPolicy>;
    /** Delete a payment policy. */
    deletePaymentPolicy(policyId: string): Promise<void>;
    /** Get all return policies for a marketplace. */
    getReturnPolicies(marketplaceId: string): Promise<ReturnPoliciesResponse>;
    /** Get a return policy by ID. */
    getReturnPolicy(policyId: string): Promise<ReturnPolicy>;
    /** Create a return policy. */
    createReturnPolicy(policy: ReturnPolicy): Promise<ReturnPolicy>;
    /** Update a return policy. */
    updateReturnPolicy(policyId: string, policy: ReturnPolicy): Promise<ReturnPolicy>;
    /** Delete a return policy. */
    deleteReturnPolicy(policyId: string): Promise<void>;
    /** Get all sales tax tables for a country. */
    getSalesTaxes(countryCode: string): Promise<SalesTaxesResponse>;
    /** Get a sales tax entry. */
    getSalesTax(countryCode: string, jurisdictionId: string): Promise<SalesTax>;
    /** Create or replace a sales tax entry. */
    createOrReplaceSalesTax(countryCode: string, jurisdictionId: string, salesTax: {
        salesTaxPercentage: string;
        shippingAndHandlingTaxed: boolean;
    }): Promise<void>;
    /** Delete a sales tax entry. */
    deleteSalesTax(countryCode: string, jurisdictionId: string): Promise<void>;
}
//# sourceMappingURL=account.d.ts.map
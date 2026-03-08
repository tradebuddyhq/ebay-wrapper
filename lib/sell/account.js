import { BaseAPI } from "../base-api.js";
/**
 * eBay Sell Account API — manage seller policies, programs, and sales tax.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/account/overview.html
 */
export class AccountAPI extends BaseAPI {
    static BASE = "/sell/account/v1";
    // ── Privileges ────────────────────────────────────────────
    /** Get selling/buying privileges for the authenticated user. */
    async getPrivileges() {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/privilege`, undefined, true);
    }
    // ── Programs ──────────────────────────────────────────────
    /** Get programs the user has opted into. */
    async getOptedInPrograms() {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/program/get_opted_in_programs`, undefined, true);
    }
    /** Opt into an eBay program. */
    async optInToProgram(programType) {
        return this.post(`${AccountAPI.BASE}/program/opt_in`, { programType }, true);
    }
    /** Opt out of an eBay program. */
    async optOutOfProgram(programType) {
        await this.post(`${AccountAPI.BASE}/program/opt_out`, { programType }, true);
    }
    // ── Fulfillment Policies ──────────────────────────────────
    /** Get all fulfillment policies for a marketplace. */
    async getFulfillmentPolicies(marketplaceId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/fulfillment_policy`, { marketplace_id: marketplaceId }, true);
    }
    /** Get a fulfillment policy by ID. */
    async getFulfillmentPolicy(policyId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/fulfillment_policy/${encodeURIComponent(policyId)}`, undefined, true);
    }
    /** Create a fulfillment policy. */
    async createFulfillmentPolicy(policy) {
        return this.post(`${AccountAPI.BASE}/fulfillment_policy`, policy, true);
    }
    /** Update a fulfillment policy. */
    async updateFulfillmentPolicy(policyId, policy) {
        return this.put(`${AccountAPI.BASE}/fulfillment_policy/${encodeURIComponent(policyId)}`, policy, true);
    }
    /** Delete a fulfillment policy. */
    async deleteFulfillmentPolicy(policyId) {
        await this.del(`${AccountAPI.BASE}/fulfillment_policy/${encodeURIComponent(policyId)}`, true);
    }
    // ── Payment Policies ──────────────────────────────────────
    /** Get all payment policies for a marketplace. */
    async getPaymentPolicies(marketplaceId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/payment_policy`, { marketplace_id: marketplaceId }, true);
    }
    /** Get a payment policy by ID. */
    async getPaymentPolicy(policyId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/payment_policy/${encodeURIComponent(policyId)}`, undefined, true);
    }
    /** Create a payment policy. */
    async createPaymentPolicy(policy) {
        return this.post(`${AccountAPI.BASE}/payment_policy`, policy, true);
    }
    /** Update a payment policy. */
    async updatePaymentPolicy(policyId, policy) {
        return this.put(`${AccountAPI.BASE}/payment_policy/${encodeURIComponent(policyId)}`, policy, true);
    }
    /** Delete a payment policy. */
    async deletePaymentPolicy(policyId) {
        await this.del(`${AccountAPI.BASE}/payment_policy/${encodeURIComponent(policyId)}`, true);
    }
    // ── Return Policies ───────────────────────────────────────
    /** Get all return policies for a marketplace. */
    async getReturnPolicies(marketplaceId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/return_policy`, { marketplace_id: marketplaceId }, true);
    }
    /** Get a return policy by ID. */
    async getReturnPolicy(policyId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/return_policy/${encodeURIComponent(policyId)}`, undefined, true);
    }
    /** Create a return policy. */
    async createReturnPolicy(policy) {
        return this.post(`${AccountAPI.BASE}/return_policy`, policy, true);
    }
    /** Update a return policy. */
    async updateReturnPolicy(policyId, policy) {
        return this.put(`${AccountAPI.BASE}/return_policy/${encodeURIComponent(policyId)}`, policy, true);
    }
    /** Delete a return policy. */
    async deleteReturnPolicy(policyId) {
        await this.del(`${AccountAPI.BASE}/return_policy/${encodeURIComponent(policyId)}`, true);
    }
    // ── Sales Tax ─────────────────────────────────────────────
    /** Get all sales tax tables for a country. */
    async getSalesTaxes(countryCode) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/sales_tax`, { country_code: countryCode }, true);
    }
    /** Get a sales tax entry. */
    async getSalesTax(countryCode, jurisdictionId) {
        return this.get(`${this.ctx.baseUrl}${AccountAPI.BASE}/sales_tax/${encodeURIComponent(jurisdictionId)}`, { country_code: countryCode }, true);
    }
    /** Create or replace a sales tax entry. */
    async createOrReplaceSalesTax(countryCode, jurisdictionId, salesTax) {
        await this.put(`${AccountAPI.BASE}/sales_tax/${encodeURIComponent(jurisdictionId)}`, { ...salesTax, countryCode }, true);
    }
    /** Delete a sales tax entry. */
    async deleteSalesTax(countryCode, jurisdictionId) {
        await this.del(`${AccountAPI.BASE}/sales_tax/${encodeURIComponent(jurisdictionId)}?country_code=${encodeURIComponent(countryCode)}`, true);
    }
}
//# sourceMappingURL=account.js.map
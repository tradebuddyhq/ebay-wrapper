import { BaseAPI } from "../base-api.js";
/**
 * eBay Sell Finances API — view payouts, transactions, transfers, and seller fund summaries.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/finances/overview.html
 */
export class FinancesAPI extends BaseAPI {
    static BASE = "/sell/finances/v1";
    // ── Transactions ──────────────────────────────────────────
    /** Search transactions with optional filters. */
    async getTransactions(params) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/transaction`, params, true);
    }
    /** Get a single transaction by ID. */
    async getTransaction(transactionId) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/transaction/${encodeURIComponent(transactionId)}`, undefined, true);
    }
    // ── Payouts ───────────────────────────────────────────────
    /** Search payouts with optional filters. */
    async getPayouts(params) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/payout`, params, true);
    }
    /** Get a single payout by ID. */
    async getPayout(payoutId) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/payout/${encodeURIComponent(payoutId)}`, undefined, true);
    }
    /** Get payout summary (aggregate data). */
    async getPayoutSummary(filter) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/payout_summary`, filter ? { filter } : undefined, true);
    }
    // ── Transfers ─────────────────────────────────────────────
    /** Search transfers. */
    async getTransfers(params) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/transfer`, params, true);
    }
    /** Get a single transfer by ID. */
    async getTransfer(transferId) {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/transfer/${encodeURIComponent(transferId)}`, undefined, true);
    }
    // ── Seller Funds ──────────────────────────────────────────
    /** Get seller funds summary (available, on hold, processing). */
    async getSellerFundsSummary() {
        return this.get(`${this.ctx.baseUrl}${FinancesAPI.BASE}/seller_funds_summary`, undefined, true);
    }
}
//# sourceMappingURL=finances.js.map
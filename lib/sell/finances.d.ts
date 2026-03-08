import { BaseAPI } from "../base-api.js";
import type { Payout, PayoutSearchParams, PayoutSummaryResponse, PayoutsResponse, SellerFundsSummaryResponse, Transaction, TransactionSearchParams, TransactionsResponse, Transfer, TransferSearchParams, TransfersResponse } from "../types.js";
/**
 * eBay Sell Finances API — view payouts, transactions, transfers, and seller fund summaries.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/finances/overview.html
 */
export declare class FinancesAPI extends BaseAPI {
    private static readonly BASE;
    /** Search transactions with optional filters. */
    getTransactions(params?: TransactionSearchParams): Promise<TransactionsResponse>;
    /** Get a single transaction by ID. */
    getTransaction(transactionId: string): Promise<Transaction>;
    /** Search payouts with optional filters. */
    getPayouts(params?: PayoutSearchParams): Promise<PayoutsResponse>;
    /** Get a single payout by ID. */
    getPayout(payoutId: string): Promise<Payout>;
    /** Get payout summary (aggregate data). */
    getPayoutSummary(filter?: string): Promise<PayoutSummaryResponse>;
    /** Search transfers. */
    getTransfers(params?: TransferSearchParams): Promise<TransfersResponse>;
    /** Get a single transfer by ID. */
    getTransfer(transferId: string): Promise<Transfer>;
    /** Get seller funds summary (available, on hold, processing). */
    getSellerFundsSummary(): Promise<SellerFundsSummaryResponse>;
}
//# sourceMappingURL=finances.d.ts.map
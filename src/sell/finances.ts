import { BaseAPI } from "../base-api.js";
import type {
  Payout,
  PayoutSearchParams,
  PayoutSummaryResponse,
  PayoutsResponse,
  SellerFundsSummaryResponse,
  Transaction,
  TransactionSearchParams,
  TransactionsResponse,
  Transfer,
  TransferSearchParams,
  TransfersResponse,
} from "../types.js";

/**
 * eBay Sell Finances API — view payouts, transactions, transfers, and seller fund summaries.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/finances/overview.html
 */
export class FinancesAPI extends BaseAPI {
  private static readonly BASE = "/sell/finances/v1";

  // ── Transactions ──────────────────────────────────────────

  /** Search transactions with optional filters. */
  async getTransactions(params?: TransactionSearchParams): Promise<TransactionsResponse> {
    return this.get<TransactionsResponse>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/transaction`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get a single transaction by ID. */
  async getTransaction(transactionId: string): Promise<Transaction> {
    return this.get<Transaction>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/transaction/${encodeURIComponent(transactionId)}`,
      undefined,
      true,
    );
  }

  // ── Payouts ───────────────────────────────────────────────

  /** Search payouts with optional filters. */
  async getPayouts(params?: PayoutSearchParams): Promise<PayoutsResponse> {
    return this.get<PayoutsResponse>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/payout`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get a single payout by ID. */
  async getPayout(payoutId: string): Promise<Payout> {
    return this.get<Payout>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/payout/${encodeURIComponent(payoutId)}`,
      undefined,
      true,
    );
  }

  /** Get payout summary (aggregate data). */
  async getPayoutSummary(filter?: string): Promise<PayoutSummaryResponse> {
    return this.get<PayoutSummaryResponse>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/payout_summary`,
      filter ? { filter } : undefined,
      true,
    );
  }

  // ── Transfers ─────────────────────────────────────────────

  /** Search transfers. */
  async getTransfers(params?: TransferSearchParams): Promise<TransfersResponse> {
    return this.get<TransfersResponse>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/transfer`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get a single transfer by ID. */
  async getTransfer(transferId: string): Promise<Transfer> {
    return this.get<Transfer>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/transfer/${encodeURIComponent(transferId)}`,
      undefined,
      true,
    );
  }

  // ── Seller Funds ──────────────────────────────────────────

  /** Get seller funds summary (available, on hold, processing). */
  async getSellerFundsSummary(): Promise<SellerFundsSummaryResponse> {
    return this.get<SellerFundsSummaryResponse>(
      `${this.ctx.baseUrl}${FinancesAPI.BASE}/seller_funds_summary`,
      undefined,
      true,
    );
  }
}

import { BaseAPI } from "../base-api.js";
import type {
  CreateShippingFulfillmentRequest,
  IssueRefundRequest,
  Order,
  OrderSearchParams,
  OrdersResponse,
  RefundResponse,
  ShippingFulfillment,
  ShippingFulfillmentsResponse,
} from "../types.js";

/**
 * eBay Sell Fulfillment API — manage orders and shipping fulfillments.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/fulfillment/overview.html
 */
export class FulfillmentAPI extends BaseAPI {
  private static readonly BASE = "/sell/fulfillment/v1";

  // ── Orders ────────────────────────────────────────────────

  /** Search/list orders with optional filters. */
  async getOrders(params?: OrderSearchParams): Promise<OrdersResponse> {
    return this.get<OrdersResponse>(
      `${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order`,
      params as Record<string, string | number | undefined>,
      true,
    );
  }

  /** Get a single order by its order ID. */
  async getOrder(orderId: string, fieldGroups?: string): Promise<Order> {
    return this.get<Order>(
      `${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}`,
      fieldGroups ? { fieldGroups } : undefined,
      true,
    );
  }

  // ── Shipping Fulfillments ─────────────────────────────────

  /** Get all shipping fulfillments for an order. */
  async getShippingFulfillments(orderId: string): Promise<ShippingFulfillmentsResponse> {
    return this.get<ShippingFulfillmentsResponse>(
      `${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/shipping_fulfillment`,
      undefined,
      true,
    );
  }

  /** Get a specific shipping fulfillment. */
  async getShippingFulfillment(orderId: string, fulfillmentId: string): Promise<ShippingFulfillment> {
    return this.get<ShippingFulfillment>(
      `${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/shipping_fulfillment/${encodeURIComponent(fulfillmentId)}`,
      undefined,
      true,
    );
  }

  /** Create a shipping fulfillment (mark items as shipped). */
  async createShippingFulfillment(orderId: string, request: CreateShippingFulfillmentRequest): Promise<{ fulfillmentId: string }> {
    return this.post<{ fulfillmentId: string }>(
      `${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/shipping_fulfillment`,
      request,
      true,
    );
  }

  // ── Refunds ───────────────────────────────────────────────

  /** Issue a refund for an order. */
  async issueRefund(orderId: string, request: IssueRefundRequest): Promise<RefundResponse> {
    return this.post<RefundResponse>(
      `${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/issue_refund`,
      request,
      true,
    );
  }
}

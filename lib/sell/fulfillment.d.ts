import { BaseAPI } from "../base-api.js";
import type { CreateShippingFulfillmentRequest, IssueRefundRequest, Order, OrderSearchParams, OrdersResponse, RefundResponse, ShippingFulfillment, ShippingFulfillmentsResponse } from "../types.js";
/**
 * eBay Sell Fulfillment API — manage orders and shipping fulfillments.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/fulfillment/overview.html
 */
export declare class FulfillmentAPI extends BaseAPI {
    private static readonly BASE;
    /** Search/list orders with optional filters. */
    getOrders(params?: OrderSearchParams): Promise<OrdersResponse>;
    /** Get a single order by its order ID. */
    getOrder(orderId: string, fieldGroups?: string): Promise<Order>;
    /** Get all shipping fulfillments for an order. */
    getShippingFulfillments(orderId: string): Promise<ShippingFulfillmentsResponse>;
    /** Get a specific shipping fulfillment. */
    getShippingFulfillment(orderId: string, fulfillmentId: string): Promise<ShippingFulfillment>;
    /** Create a shipping fulfillment (mark items as shipped). */
    createShippingFulfillment(orderId: string, request: CreateShippingFulfillmentRequest): Promise<{
        fulfillmentId: string;
    }>;
    /** Issue a refund for an order. */
    issueRefund(orderId: string, request: IssueRefundRequest): Promise<RefundResponse>;
}
//# sourceMappingURL=fulfillment.d.ts.map
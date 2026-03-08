import { BaseAPI } from "../base-api.js";
/**
 * eBay Sell Fulfillment API — manage orders and shipping fulfillments.
 * Requires user-level OAuth.
 * @see https://developer.ebay.com/api-docs/sell/fulfillment/overview.html
 */
export class FulfillmentAPI extends BaseAPI {
    static BASE = "/sell/fulfillment/v1";
    // ── Orders ────────────────────────────────────────────────
    /** Search/list orders with optional filters. */
    async getOrders(params) {
        return this.get(`${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order`, params, true);
    }
    /** Get a single order by its order ID. */
    async getOrder(orderId, fieldGroups) {
        return this.get(`${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}`, fieldGroups ? { fieldGroups } : undefined, true);
    }
    // ── Shipping Fulfillments ─────────────────────────────────
    /** Get all shipping fulfillments for an order. */
    async getShippingFulfillments(orderId) {
        return this.get(`${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/shipping_fulfillment`, undefined, true);
    }
    /** Get a specific shipping fulfillment. */
    async getShippingFulfillment(orderId, fulfillmentId) {
        return this.get(`${this.ctx.baseUrl}${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/shipping_fulfillment/${encodeURIComponent(fulfillmentId)}`, undefined, true);
    }
    /** Create a shipping fulfillment (mark items as shipped). */
    async createShippingFulfillment(orderId, request) {
        return this.post(`${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/shipping_fulfillment`, request, true);
    }
    // ── Refunds ───────────────────────────────────────────────
    /** Issue a refund for an order. */
    async issueRefund(orderId, request) {
        return this.post(`${FulfillmentAPI.BASE}/order/${encodeURIComponent(orderId)}/issue_refund`, request, true);
    }
}
//# sourceMappingURL=fulfillment.js.map
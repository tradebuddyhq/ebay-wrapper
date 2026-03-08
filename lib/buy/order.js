import { BaseAPI } from "../base-api.js";
/**
 * eBay Buy Order API — guest checkout sessions and purchase orders.
 * @see https://developer.ebay.com/api-docs/buy/order/overview.html
 */
export class OrderAPI extends BaseAPI {
    static BASE = "/buy/order/v2";
    /** Initiate a guest checkout session. */
    async initiateGuestCheckoutSession(request) {
        return this.post(`${OrderAPI.BASE}/guest_checkout_session/initiate`, request);
    }
    /** Get an existing guest checkout session. */
    async getGuestCheckoutSession(checkoutSessionId) {
        return this.get(`${this.ctx.baseUrl}${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}`);
    }
    /** Update the line item quantity in a guest checkout session. */
    async updateGuestQuantity(checkoutSessionId, request) {
        return this.post(`${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/update_quantity`, request);
    }
    /** Update the shipping address in a guest checkout session. */
    async updateGuestShippingAddress(checkoutSessionId, request) {
        return this.post(`${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/update_shipping_address`, request);
    }
    /** Update the payment info in a guest checkout session. */
    async updateGuestPayment(checkoutSessionId, request) {
        return this.post(`${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/update_payment_info`, request);
    }
    /** Place an order from a guest checkout session. */
    async placeGuestOrder(checkoutSessionId) {
        return this.post(`${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/place_order`);
    }
    /** Get a guest purchase order by ID. */
    async getGuestPurchaseOrder(purchaseOrderId) {
        return this.get(`${this.ctx.baseUrl}${OrderAPI.BASE}/guest_purchase_order/${encodeURIComponent(purchaseOrderId)}`);
    }
}
//# sourceMappingURL=order.js.map
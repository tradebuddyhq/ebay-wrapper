import { BaseAPI } from "../base-api.js";
import type {
  CheckoutSession,
  GuestCheckoutSessionRequest,
  PurchaseOrderResponse,
  UpdatePaymentRequest,
  UpdateQuantityRequest,
  UpdateShippingAddressRequest,
} from "../types.js";

/**
 * eBay Buy Order API — guest checkout sessions and purchase orders.
 * @see https://developer.ebay.com/api-docs/buy/order/overview.html
 */
export class OrderAPI extends BaseAPI {
  private static readonly BASE = "/buy/order/v2";

  /** Initiate a guest checkout session. */
  async initiateGuestCheckoutSession(request: GuestCheckoutSessionRequest): Promise<CheckoutSession> {
    return this.post<CheckoutSession>(
      `${OrderAPI.BASE}/guest_checkout_session/initiate`,
      request,
    );
  }

  /** Get an existing guest checkout session. */
  async getGuestCheckoutSession(checkoutSessionId: string): Promise<CheckoutSession> {
    return this.get<CheckoutSession>(
      `${this.ctx.baseUrl}${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}`,
    );
  }

  /** Update the line item quantity in a guest checkout session. */
  async updateGuestQuantity(checkoutSessionId: string, request: UpdateQuantityRequest): Promise<CheckoutSession> {
    return this.post<CheckoutSession>(
      `${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/update_quantity`,
      request,
    );
  }

  /** Update the shipping address in a guest checkout session. */
  async updateGuestShippingAddress(checkoutSessionId: string, request: UpdateShippingAddressRequest): Promise<CheckoutSession> {
    return this.post<CheckoutSession>(
      `${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/update_shipping_address`,
      request,
    );
  }

  /** Update the payment info in a guest checkout session. */
  async updateGuestPayment(checkoutSessionId: string, request: UpdatePaymentRequest): Promise<CheckoutSession> {
    return this.post<CheckoutSession>(
      `${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/update_payment_info`,
      request,
    );
  }

  /** Place an order from a guest checkout session. */
  async placeGuestOrder(checkoutSessionId: string): Promise<PurchaseOrderResponse> {
    return this.post<PurchaseOrderResponse>(
      `${OrderAPI.BASE}/guest_checkout_session/${encodeURIComponent(checkoutSessionId)}/place_order`,
    );
  }

  /** Get a guest purchase order by ID. */
  async getGuestPurchaseOrder(purchaseOrderId: string): Promise<PurchaseOrderResponse> {
    return this.get<PurchaseOrderResponse>(
      `${this.ctx.baseUrl}${OrderAPI.BASE}/guest_purchase_order/${encodeURIComponent(purchaseOrderId)}`,
    );
  }
}

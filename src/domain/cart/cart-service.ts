import type { CartItem, CartSummary } from "./types";
import { CART_MAX_ITEM_QUANTITY, CART_MIN_ITEM_QUANTITY } from "./types";

/**
 * Regras de negócio do carrinho. Mantido puro (sem estado próprio) para
 * ser testável e reutilizável tanto pela store (Zustand) quanto por
 * páginas server-side no futuro.
 */
export class CartService {
  clampQuantity(quantity: number): number {
    if (Number.isNaN(quantity)) return CART_MIN_ITEM_QUANTITY;
    return Math.min(Math.max(quantity, CART_MIN_ITEM_QUANTITY), CART_MAX_ITEM_QUANTITY);
  }

  summarize(items: CartItem[]): CartSummary {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.priceSnapshot * item.quantity, 0);

    // Nesta fase não há motor de promoções por carrinho — o desconto já
    // está refletido no priceSnapshot de cada item (preço promocional do
    // produto). discountTotal fica reservado para regras futuras (cupons).
    const discountTotal = 0;
    const total = subtotal - discountTotal;

    return { itemCount, subtotal, discountTotal, total };
  }

  isSameLine(a: CartItem, productId: string, variantId: string | null): boolean {
    return a.productId === productId && a.variantId === variantId;
  }
}

export const cartService = new CartService();

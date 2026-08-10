/** Item persistido no carrinho. Valores derivados (subtotal etc.) nunca
 * são armazenados aqui — são sempre calculados pelo CartService. */
export interface CartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
  /** Preço unitário no momento em que o item foi adicionado, incluindo
   * eventual delta de variante. Usado para exibição estável mesmo que o
   * preço do produto mude depois — a validação de estoque/preço final
   * real acontecerá no backend futuro. */
  priceSnapshot: number;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  discountTotal: number;
  total: number;
}

export const CART_MAX_ITEM_QUANTITY = 20;
export const CART_MIN_ITEM_QUANTITY = 1;

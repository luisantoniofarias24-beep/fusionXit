import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/domain/cart/types";
import { cartService } from "@/domain/cart/cart-service";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

/**
 * Estado global do carrinho.
 *
 * Persistido em localStorage via middleware `persist` — os itens
 * sobrevivem a um refresh da página. Nenhum dado sensível é armazenado
 * aqui (apenas ids de produto/variante, quantidade e o preço no momento
 * da adição).
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (input) => {
        const quantity = cartService.clampQuantity(input.quantity ?? 1);
        const items = get().items;
        const existing = items.find((item) =>
          cartService.isSameLine(item, input.productId, input.variantId)
        );

        if (existing) {
          set({
            items: items.map((item) =>
              cartService.isSameLine(item, input.productId, input.variantId)
                ? { ...item, quantity: cartService.clampQuantity(item.quantity + quantity) }
                : item
            ),
            isDrawerOpen: true,
          });
          return;
        }

        set({
          items: [
            ...items,
            {
              productId: input.productId,
              variantId: input.variantId,
              priceSnapshot: input.priceSnapshot,
              quantity,
            },
          ],
          isDrawerOpen: true,
        });
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter((item) => !cartService.isSameLine(item, productId, variantId)),
        });
      },

      setQuantity: (productId, variantId, quantity) => {
        const clamped = cartService.clampQuantity(quantity);
        set({
          items: get().items.map((item) =>
            cartService.isSameLine(item, productId, variantId)
              ? { ...item, quantity: clamped }
              : item
          ),
        });
      },

      clear: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "fusionxit-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

"use client";

import type { Product } from "@/domain/product/types";
import { ProductCard } from "@/components/product/product-card";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.push);

  function handleAddToCart(product: Product) {
    addItem({ productId: product.id, variantId: null, priceSnapshot: product.price });
    pushToast("success", `${product.name} adicionado ao carrinho`);
  }

  // Uma coluna abaixo de 375px: em 320/360px duas colunas deixariam o card
  // apertado demais para nome, preço, disponibilidade e CTA.
  return (
    <div
      className={`grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 ${className ?? ""}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

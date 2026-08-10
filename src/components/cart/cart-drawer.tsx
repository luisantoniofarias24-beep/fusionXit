"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { cartService } from "@/domain/cart/cart-service";
import { productRepository } from "@/data/repositories";
import { useEffect, useState } from "react";
import type { Product } from "@/domain/product/types";

/**
 * Drawer lateral do carrinho. Busca os dados de produto correspondentes
 * a cada CartItem via o repository (nunca acessa mocks diretamente) para
 * exibir imagem/nome atualizados.
 */
export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [products, setProducts] = useState<Record<string, Product>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        items.map(async (item) => [item.productId, await productRepository.getById(item.productId)] as const)
      );
      if (cancelled) return;
      const map: Record<string, Product> = {};
      for (const [id, product] of entries) {
        if (product) map[id] = product;
      }
      setProducts(map);
    })();
    return () => {
      cancelled = true;
    };
  }, [items]);

  const summary = cartService.summarize(items);

  return (
    <Drawer isOpen={isOpen} onClose={closeDrawer} title="Seu carrinho">
      {items.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={<ShoppingBag aria-hidden="true" />}
            title="Seu carrinho está vazio"
            description="Explore o catálogo e adicione produtos para vê-los aqui."
            action={
              <Button variant="primary" size="sm" onClick={closeDrawer}>
                Explorar produtos
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {items.map((item) => {
            const product = products[item.productId];
            return (
              <div key={`${item.productId}-${item.variantId ?? "base"}`} className="flex gap-3 p-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-background-secondary">
                  {product?.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <span className="text-body-sm font-medium text-foreground">
                    {product?.name ?? "Produto"}
                  </span>
                  <span className="text-body-sm text-foreground-muted">
                    {formatCurrency(item.priceSnapshot)}
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => setQuantity(item.productId, item.variantId, q)}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-body-sm text-foreground-muted underline-offset-2 hover:text-danger hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {items.length > 0 && (
        <div className="border-t border-border p-5">
          <div className="mb-4 flex items-center justify-between text-body">
            <span className="text-foreground-secondary">Subtotal</span>
            <span className="font-semibold text-foreground">{formatCurrency(summary.subtotal)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/carrinho"
              onClick={closeDrawer}
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-border-strong bg-surface-elevated text-button font-semibold text-foreground transition-colors duration-fast hover:bg-surface-hover"
            >
              Ver carrinho
            </Link>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent text-button font-semibold text-accent-foreground transition-colors duration-fast hover:bg-accent-hover"
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
}

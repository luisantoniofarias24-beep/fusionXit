"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { cartService } from "@/domain/cart/cart-service";
import { productRepository } from "@/data/repositories";
import type { Product } from "@/domain/product/types";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
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
    <Container className="flex flex-col gap-6 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Carrinho" }]} />
      <h1 className="font-display text-h1 text-foreground">Carrinho</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag aria-hidden="true" />}
          title="Seu carrinho está vazio"
          description="Explore o catálogo e adicione produtos para vê-los aqui."
          action={
            <Link href="/produtos">
              <Button variant="primary">Explorar produtos</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col divide-y divide-border rounded-lg border border-border lg:col-span-2">
            {items.map((item) => {
              const product = products[item.productId];
              const lineTotal = item.priceSnapshot * item.quantity;
              return (
                <div key={`${item.productId}-${item.variantId ?? "base"}`} className="flex gap-4 p-4">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-background-secondary">
                    {product?.images[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={product ? `/produto/${product.slug}` : "#"}
                          className="text-body font-medium text-foreground hover:text-accent"
                        >
                          {product?.name ?? "Produto"}
                        </Link>
                        <p className="text-body-sm text-foreground-muted">
                          {formatCurrency(item.priceSnapshot)} / unidade
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        aria-label={`Remover ${product?.name ?? "produto"} do carrinho`}
                        className="text-foreground-muted hover:text-danger"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(q) => setQuantity(item.productId, item.variantId, q)}
                      />
                      <span className="text-body font-semibold text-foreground">
                        {formatCurrency(lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="p-4">
              <button
                type="button"
                onClick={clear}
                className="text-body-sm text-foreground-muted underline-offset-2 hover:text-danger hover:underline"
              >
                Limpar carrinho
              </button>
            </div>
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-lg border border-border p-5">
            <h2 className="text-h4 text-foreground">Resumo do pedido</h2>
            <div className="flex justify-between text-body-sm">
              <span className="text-foreground-secondary">Subtotal ({summary.itemCount} itens)</span>
              <span className="text-foreground">{formatCurrency(summary.subtotal)}</span>
            </div>
            {summary.discountTotal > 0 && (
              <div className="flex justify-between text-body-sm">
                <span className="text-foreground-secondary">Desconto</span>
                <span className="text-success">-{formatCurrency(summary.discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-4 text-body font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">{formatCurrency(summary.total)}</span>
            </div>
            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full">
                Finalizar compra
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}

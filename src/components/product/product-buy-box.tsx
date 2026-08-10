"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap } from "lucide-react";
import type { Product } from "@/domain/product/types";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";

export function ProductBuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const pushToast = useToastStore((state) => state.push);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? null;
  const effectiveStock = selectedVariant ? selectedVariant.stock : product.stock;
  const effectivePrice = product.price + (selectedVariant?.priceDelta ?? 0);
  const isOutOfStock = effectiveStock <= 0;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId: selectedVariantId,
      priceSnapshot: effectivePrice,
      quantity,
    });
    pushToast("success", `${product.name} adicionado ao carrinho`);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  const variantGroups = groupVariantsByType(product.variants);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-caption uppercase tracking-wide text-foreground-muted">
          SKU: {product.sku}
        </span>
        <h1 className="font-display text-h1 text-foreground">{product.name}</h1>
        <Rating value={product.rating} reviewsCount={product.reviewsCount} />
      </div>

      <Price price={effectivePrice} compareAtPrice={product.compareAtPrice} size="lg" />

      <p className="text-body text-foreground-secondary">{product.shortDescription}</p>

      {Object.entries(variantGroups).map(([type, variants]) => (
        <div key={type} className="flex flex-col gap-2">
          <span className="text-label text-foreground-secondary">{type}</span>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariantId(variant.id)}
                disabled={variant.stock <= 0}
                aria-pressed={variant.id === selectedVariantId}
                className={`rounded-md border px-4 py-2 text-body-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  variant.id === selectedVariantId
                    ? "border-accent text-accent"
                    : "border-border-strong text-foreground-secondary hover:border-foreground-muted"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3">
        {isOutOfStock ? (
          <Badge variant="danger">Esgotado</Badge>
        ) : effectiveStock <= 5 ? (
          <Badge variant="warning">Últimas {effectiveStock} unidades</Badge>
        ) : (
          <Badge variant="success">Em estoque</Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} max={Math.min(20, effectiveStock || 1)} disabled={isOutOfStock} />
        <Button
          variant="secondary"
          size="lg"
          iconLeft={<ShoppingBag className="size-4" aria-hidden="true" />}
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </Button>
        <Button
          variant="primary"
          size="lg"
          iconLeft={<Zap className="size-4" aria-hidden="true" />}
          disabled={isOutOfStock}
          onClick={handleBuyNow}
        >
          Comprar agora
        </Button>
      </div>
    </div>
  );
}

function groupVariantsByType(variants: Product["variants"]) {
  return variants.reduce<Record<string, Product["variants"]>>((groups, variant) => {
    const existing = groups[variant.type] ?? [];
    groups[variant.type] = [...existing, variant];
    return groups;
  }, {});
}

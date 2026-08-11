"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apple, Clock, Download, Monitor, ShoppingBag, Smartphone, Zap, type LucideIcon } from "lucide-react";
import type { Product, ProductPlatform } from "@/domain/product/types";
import { PLATFORMS } from "@/domain/product/platform";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";

const PLATFORM_ICONS: Record<ProductPlatform, LucideIcon> = {
  android: Smartphone,
  ios: Apple,
  pc: Monitor,
};

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
  const isUnavailable = effectiveStock <= 0;
  const platform = PLATFORMS[product.platform];
  const PlatformIcon = PLATFORM_ICONS[product.platform];

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
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-accent/30 bg-accent/10 px-2.5 py-1 text-caption uppercase tracking-wide text-accent">
            <PlatformIcon className="size-3.5 shrink-0" aria-hidden="true" />
            {platform.label}
          </span>
          {product.isNew && <Badge variant="accent">Novo</Badge>}
          {product.featured && <Badge variant="neutral">Destaque</Badge>}
        </div>
        <h1 className="font-display text-h2 text-foreground sm:text-h1">{product.name}</h1>
        <span className="text-caption uppercase tracking-wide text-foreground-muted">
          SKU: {product.sku}
        </span>
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

      <div className="flex flex-wrap items-center gap-3">
        {isUnavailable ? (
          <Badge variant="danger">Indisponível</Badge>
        ) : (
          <Badge variant="success">Disponível</Badge>
        )}
        {product.licenseDuration && (
          <span className="inline-flex items-center gap-1.5 text-body-sm text-foreground-secondary">
            <Clock className="size-4 shrink-0 text-foreground-muted" aria-hidden="true" />
            {product.licenseDuration}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={Math.min(20, effectiveStock || 1)}
          disabled={isUnavailable}
        />
        <Button
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
          iconLeft={<ShoppingBag className="size-4 shrink-0" aria-hidden="true" />}
          disabled={isUnavailable}
          onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          iconLeft={<Zap className="size-4 shrink-0" aria-hidden="true" />}
          disabled={isUnavailable}
          onClick={handleBuyNow}
        >
          Comprar agora
        </Button>
      </div>

      {product.deliveryNote && (
        <div className="flex gap-3 rounded-md border border-border bg-surface p-4">
          <Download className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span className="text-label text-foreground">Entrega</span>
            <p className="text-body-sm text-foreground-secondary">{product.deliveryNote}</p>
          </div>
        </div>
      )}
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

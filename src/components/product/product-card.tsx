import Link from "next/link";
import Image from "next/image";
import { Apple, Monitor, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import type { Product, ProductPlatform } from "@/domain/product/types";
import { PLATFORMS } from "@/domain/product/platform";
import { Price } from "@/components/ui/price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { calculateDiscountPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

const PLATFORM_ICONS: Record<ProductPlatform, LucideIcon> = {
  android: Smartphone,
  ios: Apple,
  pc: Monitor,
};

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * Card de produto digital — usado no catálogo, Home e Design Lab.
 *
 * Hierarquia de leitura: plataforma → nome → preço → disponibilidade → CTA.
 * Hover discreto reservado para desktop (`sm:group-hover:*`); nenhuma
 * funcionalidade depende de hover, garantindo paridade no mobile.
 */
export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const discount = calculateDiscountPercent(product.price, product.compareAtPrice);
  const isUnavailable = product.stock <= 0;
  const coverImage = product.images[0];
  const platform = PLATFORMS[product.platform];
  const PlatformIcon = PLATFORM_ICONS[product.platform];

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors duration-base",
        "hover:border-border-strong",
        className
      )}
    >
      <Link
        href={`/produto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-background-secondary"
      >
        {coverImage && (
          <Image
            src={coverImage.url}
            alt={coverImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, (min-width: 375px) 50vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-slow ease-premium",
              "sm:group-hover:scale-[1.04]"
            )}
          />
        )}

        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5 sm:left-3 sm:top-3">
          {product.isNew && <Badge variant="accent">Novo</Badge>}
          {discount !== null && <Badge variant="warning">Oferta −{discount}%</Badge>}
          {product.featured && <Badge variant="neutral">Destaque</Badge>}
        </div>

        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Badge variant="default">Indisponível</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-pill border border-border px-2 py-0.5 text-caption uppercase tracking-wide text-foreground-muted">
          <PlatformIcon className="size-3 shrink-0" aria-hidden="true" />
          {platform.badge}
        </span>

        <Link
          href={`/produto/${product.slug}`}
          className="line-clamp-2 text-body-sm font-medium text-foreground transition-colors hover:text-accent sm:text-body"
        >
          {product.name}
        </Link>

        <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />

        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-caption",
            isUnavailable ? "text-foreground-muted" : "text-success"
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-pill",
              isUnavailable ? "bg-foreground-muted" : "bg-success"
            )}
            aria-hidden="true"
          />
          {isUnavailable ? "Indisponível" : "Disponível"}
        </span>

        <div className="mt-auto pt-2">
          {onAddToCart ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              disabled={isUnavailable}
              iconLeft={<ShoppingBag className="size-4 shrink-0" aria-hidden="true" />}
              onClick={() => onAddToCart(product)}
            >
              {isUnavailable ? "Indisponível" : "Adicionar"}
            </Button>
          ) : (
            <Link
              href={`/produto/${product.slug}`}
              className="flex h-9 w-full items-center justify-center rounded-md border border-border-strong text-body-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Ver detalhes
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

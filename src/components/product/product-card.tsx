import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/domain/product/types";
import { Price } from "./price";
import { Rating } from "./rating";
import { Badge } from "./badge";
import { IconButton } from "./icon-button";
import { calculateDiscountPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * Card de produto — usado no catálogo, Home e Design Lab.
 * Hover discreto reservado para desktop (`sm:group-hover:*`); nenhuma
 * funcionalidade depende de hover, garantindo paridade no mobile.
 */
export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const discount = calculateDiscountPercent(product.price, product.compareAtPrice);
  const isOutOfStock = product.stock <= 0;
  const coverImage = product.images[0];

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
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-slow ease-premium",
              "sm:group-hover:scale-[1.04]"
            )}
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="accent">Novo</Badge>}
          {discount !== null && <Badge variant="warning">-{discount}%</Badge>}
          {product.bestseller && <Badge variant="neutral">Mais vendido</Badge>}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Badge variant="default">Esgotado</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-caption uppercase tracking-wide text-foreground-muted">
          {product.categoryId.replace("cat-", "")}
        </span>
        <Link href={`/produto/${product.slug}`} className="text-body font-medium text-foreground hover:text-accent">
          {product.name}
        </Link>
        <Rating value={product.rating} reviewsCount={product.reviewsCount} />
        <div className="mt-1 flex items-end justify-between gap-2">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          {onAddToCart && (
            <IconButton
              aria-label={`Adicionar ${product.name} ao carrinho`}
              icon={<ShoppingBag aria-hidden="true" />}
              variant="accent"
              size="sm"
              disabled={isOutOfStock}
              onClick={() => onAddToCart(product)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

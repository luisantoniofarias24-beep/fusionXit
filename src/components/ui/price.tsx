import { formatCurrency, formatDiscountPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface PriceProps {
  price: number;
  compareAtPrice?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: { current: "text-body font-semibold", previous: "text-body-sm" },
  md: { current: "text-h4 font-semibold", previous: "text-body-sm" },
  lg: { current: "text-h2 font-semibold", previous: "text-body" },
};

/** Exibe preço atual, preço anterior riscado e badge de desconto quando aplicável. */
export function Price({ price, compareAtPrice, size = "md", className }: PriceProps) {
  const discount = formatDiscountPercent(price, compareAtPrice);
  const s = sizeClasses[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn(s.current, "text-foreground")}>{formatCurrency(price)}</span>
      {discount && compareAtPrice && (
        <>
          <span className={cn(s.previous, "text-foreground-muted line-through")}>
            {formatCurrency(compareAtPrice)}
          </span>
          <span className="rounded-pill bg-accent/15 px-2 py-0.5 text-caption font-semibold text-accent">
            {discount}
          </span>
        </>
      )}
    </div>
  );
}

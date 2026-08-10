import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface RatingProps {
  value: number | null;
  reviewsCount: number;
  size?: "sm" | "md";
  className?: string;
}

/** Representa apenas os dados recebidos — nunca inventa avaliações. */
export function Rating({ value, reviewsCount, size = "sm", className }: RatingProps) {
  const starSize = size === "sm" ? "size-3.5" : "size-4";

  if (value === null || reviewsCount === 0) {
    return (
      <span className={cn("text-body-sm text-foreground-muted", className)}>
        Sem avaliações
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Avaliação ${value} de 5, ${reviewsCount} avaliações`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.round(value) ? "fill-accent text-accent" : "fill-transparent text-border-strong"
            )}
          />
        ))}
      </div>
      <span className="text-body-sm text-foreground-secondary">
        {value.toFixed(1)} <span className="text-foreground-muted">({reviewsCount})</span>
      </span>
    </div>
  );
}

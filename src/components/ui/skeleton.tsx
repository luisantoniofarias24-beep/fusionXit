import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Bloco base de skeleton. Compor com className para linha/imagem/texto. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surface-elevated", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-3.5 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  );
}

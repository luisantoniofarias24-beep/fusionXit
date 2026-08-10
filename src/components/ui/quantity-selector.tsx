"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

/** Nunca produz uma quantidade fora de [min, max]; totalmente navegável por teclado. */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && value < max;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border-strong bg-surface",
        disabled && "opacity-40",
        className
      )}
      role="group"
      aria-label="Selecionar quantidade"
    >
      <button
        type="button"
        onClick={() => canDecrease && onChange(Math.max(min, value - 1))}
        disabled={!canDecrease}
        aria-label="Diminuir quantidade"
        className="flex size-10 items-center justify-center text-foreground-secondary transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span
        className="w-10 text-center text-body font-medium tabular-nums text-foreground"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => canIncrease && onChange(Math.min(max, value + 1))}
        disabled={!canIncrease}
        aria-label="Aumentar quantidade"
        className="flex size-10 items-center justify-center text-foreground-secondary transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

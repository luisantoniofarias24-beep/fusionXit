"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onChange: (value: string) => void;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, placeholder = "Buscar produtos...", ...props }, ref) => {
    const hasValue = typeof value === "string" && value.length > 0;

    return (
      <div className={cn("relative", className)}>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted"
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="search"
          role="searchbox"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 w-full rounded-md border border-border-strong bg-surface pl-10 pr-10 text-body text-foreground placeholder:text-foreground-muted transition-colors duration-fast",
            "focus-visible:outline-none focus-visible:border-accent",
            "[&::-webkit-search-cancel-button]:appearance-none"
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpar busca"
            className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-foreground-muted hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

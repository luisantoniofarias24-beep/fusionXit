import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover active:bg-accent-hover/90",
  secondary:
    "bg-surface-elevated text-foreground hover:bg-surface-hover border border-border-strong",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-foreground-secondary hover:text-foreground hover:bg-surface-hover",
  danger: "bg-danger text-foreground hover:bg-danger/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-body-sm gap-1.5 rounded-md",
  md: "h-11 px-5 text-button gap-2 rounded-md",
  lg: "h-12 px-7 text-button gap-2.5 rounded-lg",
};

/**
 * Botão base da FusionXit.
 * Estados normal/hover/active/focus-visible/disabled/loading cobertos via
 * classes utilitárias — foco visível herdado do reset global (:focus-visible).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors duration-fast ease-premium",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    );
  }
);
Button.displayName = "Button";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonVariant = "default" | "ghost" | "accent";
type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Obrigatório: descreve a ação para leitores de tela. */
  "aria-label": string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const variantClasses: Record<IconButtonVariant, string> = {
  default: "bg-surface-elevated text-foreground hover:bg-surface-hover border border-border",
  ghost: "bg-transparent text-foreground-secondary hover:text-foreground hover:bg-surface-hover",
  accent: "bg-accent text-accent-foreground hover:bg-accent-hover",
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "size-9 rounded-md [&_svg]:size-4",
  md: "size-11 rounded-md [&_svg]:size-5",
  lg: "size-12 rounded-lg [&_svg]:size-5",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, variant = "default", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-fast ease-premium",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

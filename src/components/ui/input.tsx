import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  icon?: ReactNode;
}

/**
 * Input base. O erro nunca é comunicado apenas por cor: sempre acompanha
 * ícone + texto (`errorText`) e `aria-invalid`/`aria-describedby`.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helperText, errorText, icon, id, required, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(errorText);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-label text-foreground-secondary">
            {label}
            {required && <span className="text-accent"> *</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted [&_svg]:size-4">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={helperText || errorText ? helperId : undefined}
            className={cn(
              "h-11 w-full rounded-md border bg-surface px-3.5 text-body text-foreground placeholder:text-foreground-muted transition-colors duration-fast",
              "focus-visible:outline-none focus-visible:border-accent",
              hasError ? "border-danger" : "border-border-strong",
              icon && "pl-10",
              disabled && "opacity-40 pointer-events-none",
              className
            )}
            {...props}
          />
        </div>
        {(helperText || errorText) && (
          <p
            id={helperId}
            className={cn(
              "flex items-center gap-1 text-body-sm",
              hasError ? "text-danger" : "text-foreground-muted"
            )}
          >
            {hasError && <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />}
            {errorText ?? helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

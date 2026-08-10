"use client";

import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToastStore, type ToastVariant } from "@/store/toast-store";
import { cn } from "@/lib/cn";

const variantConfig: Record<ToastVariant, { icon: typeof CheckCircle2; classes: string }> = {
  success: { icon: CheckCircle2, classes: "border-success/30 text-success" },
  error: { icon: XCircle, classes: "border-danger/30 text-danger" },
  info: { icon: Info, classes: "border-accent/30 text-accent" },
};

/**
 * Renderiza a fila global de toasts. Montado uma única vez no layout raiz.
 * Feedback de curta duração (produto adicionado/removido/salvo/erro) —
 * não substitui EmptyState/erros de página.
 */
export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
      role="region"
      aria-label="Notificações"
    >
      {toasts.map((toast) => {
        const { icon: Icon, classes } = variantConfig[toast.variant];
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "flex items-center gap-3 rounded-md border bg-surface-elevated px-4 py-3 shadow-elevated",
              classes
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <p className="flex-1 text-body-sm text-foreground">{toast.message}</p>
            <button
              type="button"
              aria-label="Fechar notificação"
              onClick={() => dismiss(toast.id)}
              className="text-foreground-muted hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

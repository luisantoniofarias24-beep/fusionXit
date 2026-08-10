import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  message: string;
}

interface ToastState {
  toasts: ToastMessage[];
  push: (variant: ToastVariant, message: string) => void;
  dismiss: (id: string) => void;
}

const MAX_VISIBLE_TOASTS = 3;

/**
 * Fila de toasts. Limitada a MAX_VISIBLE_TOASTS simultâneos para evitar
 * empilhamento caótico — novos toasts substituem os mais antigos.
 */
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (variant, message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), variant, message }].slice(
        -MAX_VISIBLE_TOASTS
      ),
    })),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

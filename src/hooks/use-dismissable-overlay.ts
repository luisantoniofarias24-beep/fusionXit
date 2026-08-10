"use client";

import { useEffect, useRef } from "react";

/**
 * Comportamento compartilhado por Modal e Drawer:
 *  - fecha com ESC;
 *  - bloqueia o scroll do body enquanto aberto;
 *  - move o foco para o container ao abrir e restaura o foco anterior ao fechar;
 *  - mantém o foco preso dentro do overlay (Tab/Shift+Tab não escapam).
 *
 * Implementado nativamente (sem dependência externa) por ser um
 * comportamento simples e bem definido — uma biblioteca de foco só se
 * justificaria para casos mais complexos (ex.: várias camadas empilhadas).
 */
export function useDismissableOverlay(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    containerRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (first && last && event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (first && last && !event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  return containerRef;
}

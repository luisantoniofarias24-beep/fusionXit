"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useDismissableOverlay } from "@/hooks/use-dismissable-overlay";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const containerRef = useDismissableOverlay(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-base"
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-lg border border-border-strong bg-surface-elevated p-6 shadow-overlay",
          "outline-none",
          className
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-h4 text-foreground">
            {title}
          </h2>
          <IconButton
            aria-label="Fechar"
            icon={<X aria-hidden="true" />}
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

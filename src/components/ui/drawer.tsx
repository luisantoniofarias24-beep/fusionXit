"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useDismissableOverlay } from "@/hooks/use-dismissable-overlay";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/cn";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "right" | "left";
  className?: string;
}

export function Drawer({ isOpen, onClose, title, children, side = "right", className }: DrawerProps) {
  const containerRef = useDismissableOverlay(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        className={cn(
          "absolute top-0 flex h-full w-full max-w-md flex-col border-border-strong bg-surface-elevated shadow-overlay outline-none",
          side === "right" ? "right-0 border-l animate-drawer-in-right" : "left-0 border-r animate-drawer-in-left",
          className
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 id="drawer-title" className="text-h4 text-foreground">
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
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

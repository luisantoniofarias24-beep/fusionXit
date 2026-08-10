import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <span className="text-label uppercase tracking-[0.14em] text-accent">{eyebrow}</span>
        )}
        <h2 className="text-h2 text-foreground font-display">{title}</h2>
        {description && (
          <p className="max-w-xl text-body text-foreground-secondary">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

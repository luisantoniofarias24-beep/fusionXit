import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export interface LoadingProps {
  label?: string;
  className?: string;
}

export function Loading({ label = "Carregando", className }: LoadingProps) {
  return (
    <div
      role="status"
      className={cn("flex items-center justify-center gap-2 py-8 text-foreground-muted", className)}
    >
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      <span className="text-body-sm">{label}</span>
    </div>
  );
}

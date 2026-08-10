type ClassValue = string | number | null | boolean | undefined;

/**
 * Combina classes condicionalmente, ignorando valores falsy.
 * Suficiente para as necessidades do projeto sem depender de
 * `clsx`/`tailwind-merge` — reduz uma dependência desnecessária.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

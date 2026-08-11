import Link from "next/link";
import { Apple, ArrowRight, Monitor, Smartphone, type LucideIcon } from "lucide-react";
import type { Category } from "@/domain/category/types";
import type { ProductPlatform } from "@/domain/product/types";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const PLATFORM_ICONS: Record<ProductPlatform, LucideIcon> = {
  android: Smartphone,
  ios: Apple,
  pc: Monitor,
};

/**
 * Categorias da loja — Android, iPhone e PC.
 *
 * São exatamente três: no mobile o layout é de linhas empilhadas
 * (ícone + texto + seta), evitando a célula vazia que um grid 2x2 deixaria.
 * A partir de `sm` vira um grid de três colunas iguais.
 */
export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="border-b border-border py-14 sm:py-16">
      <Container className="flex flex-col gap-8">
        <SectionHeader
          eyebrow="Escolha sua plataforma"
          title="Categorias"
          description="Cada produto é publicado para a plataforma em que ele realmente funciona."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {categories.map((category) => {
            const Icon = PLATFORM_ICONS[category.platform];
            return (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-colors duration-base hover:border-accent/50 hover:bg-surface-hover sm:flex-col sm:items-start sm:gap-5 sm:p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-surface-elevated text-accent transition-colors duration-base group-hover:bg-accent/10">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-2">
                  <span className="font-display text-h4 text-foreground">{category.name}</span>
                  <p className="text-body-sm text-foreground-muted">{category.description}</p>
                  <span className="mt-1 hidden items-center gap-1.5 text-label uppercase tracking-wide text-accent sm:inline-flex">
                    Ver produtos
                    <ArrowRight
                      className="size-3.5 transition-transform duration-fast group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <ArrowRight
                  className="size-4 shrink-0 text-foreground-muted transition-colors group-hover:text-accent sm:hidden"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

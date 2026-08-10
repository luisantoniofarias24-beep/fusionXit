import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/domain/category/types";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="border-b border-border py-16">
      <Container className="flex flex-col gap-8">
        <SectionHeader eyebrow="Descubra" title="Categorias" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg border border-border bg-surface p-5"
            >
              <Image
                src={category.image.url}
                alt={category.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover opacity-70 transition-transform duration-slow ease-premium group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <span className="relative text-h4 text-foreground">{category.name}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

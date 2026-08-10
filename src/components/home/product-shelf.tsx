import Link from "next/link";
import type { Product } from "@/domain/product/types";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";

export function ProductShelf({
  eyebrow,
  title,
  description,
  products,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="border-b border-border py-16">
      <Container className="flex flex-col gap-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            <Link href="/produtos">
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </Link>
          }
        />
        <ProductGrid products={products.slice(0, 4)} />
      </Container>
    </section>
  );
}

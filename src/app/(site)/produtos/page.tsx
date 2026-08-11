import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogClient } from "@/components/product/catalog-client";
import { productService } from "@/domain/product/product-service";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo de produtos e serviços digitais da FusionXit para jogadores de Free Fire no Android, iPhone e PC.",
};

export default async function ProductsPage() {
  const products = await productService.list();

  return (
    <Container className="flex flex-col gap-6 py-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Produtos" }]} />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-h2 text-foreground sm:text-h1">Produtos</h1>
        <p className="max-w-xl text-body text-foreground-secondary">
          Produtos e serviços digitais organizados por plataforma. Confira sempre a
          plataforma e os requisitos antes de comprar.
        </p>
      </div>
      <CatalogClient products={products} />
    </Container>
  );
}

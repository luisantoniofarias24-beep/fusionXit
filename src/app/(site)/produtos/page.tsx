import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogClient } from "@/components/product/catalog-client";
import { productService } from "@/domain/product/product-service";
import { categoryRepository } from "@/data/repositories";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Catálogo completo de produtos FusionXit.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    productService.list(),
    categoryRepository.getAll(),
  ]);

  return (
    <Container className="flex flex-col gap-6 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Produtos" }]} />
      <h1 className="font-display text-h1 text-foreground">Produtos</h1>
      <CatalogClient products={products} categories={categories} />
    </Container>
  );
}

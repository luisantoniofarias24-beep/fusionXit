import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CatalogClient } from "@/components/product/catalog-client";
import { productService } from "@/domain/product/product-service";
import { categoryRepository } from "@/data/repositories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await categoryRepository.getBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Produtos digitais`,
    description: category.description,
    openGraph: {
      title: `${category.name} — Produtos digitais | FusionXit`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await categoryRepository.getBySlug(slug);
  if (!category) notFound();

  const products = await productService.getByPlatform(category.platform);

  return (
    <Container className="flex flex-col gap-6 py-10">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Produtos", href: "/produtos" },
          { label: category.name },
        ]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-h2 text-foreground sm:text-h1">{category.name}</h1>
        <p className="max-w-xl text-body text-foreground-secondary">{category.description}</p>
      </div>
      <CatalogClient products={products} initialPlatform={category.platform} />
    </Container>
  );
}

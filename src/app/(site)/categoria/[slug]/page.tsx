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
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await categoryRepository.getBySlug(slug);
  if (!category) notFound();

  const [products, categories] = await Promise.all([
    productService.list({ categoryId: category.id }),
    categoryRepository.getAll(),
  ]);

  return (
    <Container className="flex flex-col gap-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Produtos", href: "/produtos" }, { label: category.name }]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-h1 text-foreground">{category.name}</h1>
        <p className="max-w-xl text-body text-foreground-secondary">{category.description}</p>
      </div>
      <CatalogClient products={products} categories={categories} initialCategoryId={category.id} />
    </Container>
  );
}

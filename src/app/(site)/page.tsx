import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { ProductShelf } from "@/components/home/product-shelf";
import { BenefitsSection } from "@/components/home/benefits-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { productService } from "@/domain/product/product-service";
import { categoryRepository } from "@/data/repositories";

export const metadata: Metadata = {
  title: "FusionXit — Tecnologia. Performance. Evolução.",
};

export default async function HomePage() {
  const [categories, featured, bestsellers, newArrivals, onSale] = await Promise.all([
    categoryRepository.getAll(),
    productService.getFeatured(),
    productService.getBestsellers(),
    productService.getNewArrivals(),
    productService.getOnSale(),
  ]);

  return (
    <>
      <Hero />
      <CategoriesSection categories={categories} />
      <ProductShelf eyebrow="Curadoria FusionXit" title="Destaques FusionXit" products={featured} />
      <ProductShelf eyebrow="Os mais procurados" title="Mais vendidos" products={bestsellers} />
      <ProductShelf eyebrow="Acabou de chegar" title="Novidades" products={newArrivals} />
      <ProductShelf eyebrow="Por tempo limitado" title="Ofertas selecionadas" products={onSale} />
      <BenefitsSection />
      <NewsletterSection />
    </>
  );
}

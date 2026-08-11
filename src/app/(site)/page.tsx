import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { ProductShelf } from "@/components/home/product-shelf";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { SupportSection } from "@/components/home/support-section";
import { FaqSection } from "@/components/home/faq-section";
import { productService } from "@/domain/product/product-service";
import { categoryRepository } from "@/data/repositories";

export const metadata: Metadata = {
  title: "FusionXit — Produtos digitais para jogadores de Free Fire",
  description:
    "Loja digital de produtos e serviços para jogadores de Free Fire: configuração, otimização e acompanhamento para Android, iPhone e PC.",
};

export default async function HomePage() {
  const [categories, featured, bestsellers, newArrivals] = await Promise.all([
    categoryRepository.getAll(),
    productService.getFeatured(),
    productService.getBestsellers(),
    productService.getNewArrivals(),
  ]);

  return (
    <>
      <Hero />
      <CategoriesSection categories={categories} />
      <ProductShelf
        eyebrow="Seleção FusionXit"
        title="Produtos em destaque"
        products={featured}
      />
      <ProductShelf eyebrow="Procurados pelos jogadores" title="Mais procurados" products={bestsellers} />
      <ProductShelf eyebrow="Acabou de chegar" title="Novidades" products={newArrivals} />
      <HowItWorksSection />
      <BenefitsSection />
      <SupportSection />
      <FaqSection />
    </>
  );
}

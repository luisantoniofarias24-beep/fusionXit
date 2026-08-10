import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { productService } from "@/domain/product/product-service";
import { categoryRepository } from "@/data/repositories";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.map((img) => ({ url: img.url })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([
    categoryRepository.getAll(),
    productService.getRelated(product),
  ]);
  const resolvedCategory = categories.find((c) => c.id === product.categoryId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    image: product.images.map((img) => img.url),
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewsCount,
          },
        }
      : {}),
  };

  return (
    <Container className="flex flex-col gap-10 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Produtos", href: "/produtos" },
          ...(resolvedCategory
            ? [{ label: resolvedCategory.name, href: `/categoria/${resolvedCategory.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductBuyBox product={product} />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="text-h3 font-display text-foreground">Descrição</h2>
          <p className="text-body text-foreground-secondary">{product.description}</p>
          {product.features.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1.5 text-body-sm text-foreground-secondary">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-accent">—</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        {product.specifications.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-h3 font-display text-foreground">Especificações</h2>
            <dl className="divide-y divide-border rounded-md border border-border">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 px-4 py-3 text-body-sm">
                  <dt className="text-foreground-muted">{spec.label}</dt>
                  <dd className="text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="flex flex-col gap-6">
          <SectionHeader eyebrow="Você também pode gostar" title="Produtos relacionados" />
          <ProductGrid products={related} />
        </div>
      )}

      {/* eslint-disable-next-line react/no-danger -- JSON-LD estático, sem entrada de usuário */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}

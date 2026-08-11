import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Headset, ListChecks, MonitorSmartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductBuyBox } from "@/components/product/product-buy-box";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { productService } from "@/domain/product/product-service";
import { PLATFORMS } from "@/domain/product/platform";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) return {};

  const platformLabel = PLATFORMS[product.platform].label;
  const title = `${product.name} — ${platformLabel}`;

  return {
    title,
    description: product.shortDescription,
    openGraph: {
      title: `${title} | FusionXit`,
      description: product.shortDescription,
      images: product.images.map((img) => ({ url: img.url })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) notFound();

  const related = await productService.getRelated(product);
  const platform = PLATFORMS[product.platform];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    category: platform.label,
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

  const hasBeforeBuying =
    product.requirements.length > 0 || product.compatibility.length > 0;

  return (
    <Container className="flex flex-col gap-10 py-10">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Produtos", href: "/produtos" },
          { label: platform.label, href: `/categoria/${platform.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductBuyBox product={product} />
      </div>

      {hasBeforeBuying && (
        <section className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-5 sm:p-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display text-h3 text-foreground">Antes de comprar</h2>
            <p className="text-body-sm text-foreground-secondary">
              Este é um produto digital para {platform.label}. Confira os requisitos e a
              compatibilidade antes de finalizar o pedido.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {product.requirements.length > 0 && (
              <InfoList
                icon={<ListChecks className="size-4 shrink-0 text-accent" aria-hidden="true" />}
                title="Requisitos"
                items={product.requirements}
              />
            )}
            {product.compatibility.length > 0 && (
              <InfoList
                icon={
                  <MonitorSmartphone className="size-4 shrink-0 text-accent" aria-hidden="true" />
                }
                title="Compatibilidade"
                items={product.compatibility}
              />
            )}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-h3 text-foreground">Descrição</h2>
          <p className="text-body text-foreground-secondary">{product.description}</p>
          {product.features.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1.5 text-body-sm text-foreground-secondary">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        {product.specifications.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-h3 text-foreground">Especificações</h2>
            <dl className="divide-y divide-border rounded-md border border-border">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 px-4 py-3 text-body-sm">
                  <dt className="text-foreground-muted">{spec.label}</dt>
                  <dd className="text-right text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {(product.instructions.length > 0 || product.supportNote) && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {product.instructions.length > 0 && (
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <h2 className="font-display text-h4 text-foreground">Como você recebe</h2>
              <ol className="flex flex-col gap-2 text-body-sm text-foreground-secondary">
                {product.instructions.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-pill bg-surface-elevated text-caption text-accent">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {product.supportNote && (
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <h2 className="font-display text-h4 text-foreground">Suporte</h2>
              <p className="flex gap-3 text-body-sm text-foreground-secondary">
                <Headset className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {product.supportNote}
              </p>
            </div>
          )}
        </div>
      )}

      {related.length > 0 && (
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={`Mais para ${platform.label}`}
            title="Produtos relacionados"
          />
          <ProductGrid products={related} />
        </div>
      )}

      {/* JSON-LD estático, montado no servidor — sem entrada de usuário. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}

function InfoList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-label uppercase tracking-wide text-foreground-muted">{title}</span>
      <ul className="flex flex-col gap-2 text-body-sm text-foreground-secondary">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-0.5">{icon}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

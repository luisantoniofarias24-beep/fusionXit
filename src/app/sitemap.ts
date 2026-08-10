import type { MetadataRoute } from "next";
import { MOCK_PRODUCTS } from "@/data/mock/products";
import { MOCK_CATEGORIES } from "@/data/mock/categories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fusionxit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/produtos",
    "/sobre",
    "/contato",
    "/privacidade",
    "/termos",
    "/trocas-devolucoes",
    "/entrega",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = MOCK_PRODUCTS.filter((p) => p.active).map((product) => ({
    url: `${siteUrl}/produto/${product.slug}`,
    lastModified: new Date(product.createdAt),
  }));

  const categoryRoutes = MOCK_CATEGORIES.map((category) => ({
    url: `${siteUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}

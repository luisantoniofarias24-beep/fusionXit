import type { MetadataRoute } from "next";
import { MOCK_PRODUCTS } from "@/data/mock/products";
import { MOCK_CATEGORIES } from "@/data/mock/categories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fusionxit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { route: "", priority: 1 },
    { route: "/produtos", priority: 0.9 },
    { route: "/contato", priority: 0.7 },
    { route: "/sobre", priority: 0.5 },
    { route: "/entrega", priority: 0.5 },
    { route: "/trocas-devolucoes", priority: 0.4 },
    { route: "/privacidade", priority: 0.3 },
    { route: "/termos", priority: 0.3 },
  ].map(({ route, priority }) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    priority,
  }));

  // Categorias (Android / iPhone / PC) são portas de entrada do catálogo.
  const categoryRoutes = MOCK_CATEGORIES.map((category) => ({
    url: `${siteUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const productRoutes = MOCK_PRODUCTS.filter((p) => p.active).map((product) => ({
    url: `${siteUrl}/produto/${product.slug}`,
    lastModified: new Date(product.createdAt),
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

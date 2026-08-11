import type { Product, ProductFilters, ProductSortOption } from "./types";
import { platformLabel } from "./platform";
import { calculateDiscountPercent } from "@/lib/format";

/**
 * Regras puras de filtro e ordenação do catálogo.
 *
 * Ficam fora do Service porque são usadas nos dois lados: no servidor
 * (`ProductService.list`) e no cliente (filtros interativos do catálogo).
 * Mantê-las em um único lugar evita que a busca da vitrine e a da página de
 * produtos passem a se comportar de formas diferentes.
 */
export function matchesFilters(product: Product, filters: ProductFilters): boolean {
  if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
  if (filters.platform && product.platform !== filters.platform) return false;
  if (filters.onlyInStock && product.stock <= 0) return false;
  if (filters.onlyNew && !product.isNew) return false;
  if (filters.onlyFeatured && !product.featured) return false;
  if (
    filters.onlyOnSale &&
    calculateDiscountPercent(product.price, product.compareAtPrice) === null
  ) {
    return false;
  }
  if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
  if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

  if (filters.query) {
    const query = filters.query.trim().toLowerCase();
    if (query.length > 0) {
      const haystack = [
        product.name,
        product.shortDescription,
        product.description,
        platformLabel(product.platform),
        ...product.features,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
  }

  return true;
}

export function sortProducts(products: Product[], sort: ProductSortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "bestseller":
      return copy.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    case "relevance":
    default:
      return copy;
  }
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return sortProducts(
    products.filter((product) => matchesFilters(product, filters)),
    filters.sort ?? "relevance"
  );
}

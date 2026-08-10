import type { Product, ProductFilters, ProductSortOption } from "./types";
import { productRepository, type ProductRepository } from "@/data/repositories";
import { calculateDiscountPercent } from "@/lib/format";

/**
 * Regras de negócio sobre produtos: busca, filtro e ordenação.
 * A UI chama apenas o Service — nunca o Repository diretamente.
 */
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async list(filters: ProductFilters = {}): Promise<Product[]> {
    const all = await this.repository.getAll();
    const filtered = all.filter((product) => this.matches(product, filters));
    return this.sort(filtered, filters.sort ?? "relevance");
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return this.repository.getBySlug(slug);
  }

  async getFeatured(): Promise<Product[]> {
    const all = await this.repository.getAll();
    return all.filter((p) => p.featured);
  }

  async getBestsellers(): Promise<Product[]> {
    const all = await this.repository.getAll();
    return all.filter((p) => p.bestseller);
  }

  async getNewArrivals(): Promise<Product[]> {
    const all = await this.repository.getAll();
    return all
      .filter((p) => p.isNew)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getOnSale(): Promise<Product[]> {
    const all = await this.repository.getAll();
    return all.filter((p) => calculateDiscountPercent(p.price, p.compareAtPrice) !== null);
  }

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const all = await this.repository.getAll();
    return all
      .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
      .slice(0, limit);
  }

  private matches(product: Product, filters: ProductFilters): boolean {
    if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
    if (filters.onlyInStock && product.stock <= 0) return false;
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
          ...product.features,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
    }

    return true;
  }

  private sort(products: Product[], sort: ProductSortOption): Product[] {
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
}

export const productService = new ProductService(productRepository);

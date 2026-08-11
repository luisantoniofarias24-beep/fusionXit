import type { Product, ProductFilters, ProductPlatform } from "./types";
import { productRepository, type ProductRepository } from "@/data/repositories";
import { applyFilters } from "./filtering";
import { calculateDiscountPercent } from "@/lib/format";

/**
 * Regras de negócio sobre produtos: busca, filtro e ordenação.
 * A UI chama apenas o Service — nunca o Repository diretamente.
 * As regras de filtro/ordenação vivem em `./filtering` porque também são
 * aplicadas no cliente, nos filtros interativos do catálogo.
 */
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async list(filters: ProductFilters = {}): Promise<Product[]> {
    const all = await this.repository.getAll();
    return applyFilters(all, filters);
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

  async getByPlatform(platform: ProductPlatform): Promise<Product[]> {
    return this.list({ platform });
  }

  /** Relacionados = mesma plataforma, que é o critério útil em produto digital. */
  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const all = await this.repository.getAll();
    return all
      .filter((p) => p.id !== product.id && p.platform === product.platform)
      .slice(0, limit);
  }
}

export const productService = new ProductService(productRepository);

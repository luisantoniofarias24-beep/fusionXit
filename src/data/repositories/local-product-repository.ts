import type { Product } from "@/domain/product/types";
import type { ProductRepository } from "./product-repository";
import { MOCK_PRODUCTS } from "@/data/mock/products";

/**
 * Implementação local/mock de ProductRepository.
 *
 * Isolada intencionalmente nesta classe: nenhuma página ou componente lê
 * `MOCK_PRODUCTS` diretamente. Quando um backend existir, criar
 * `ApiProductRepository implements ProductRepository` com a mesma
 * assinatura e trocar a instância exportada em `./index.ts`.
 *
 * `Promise.resolve` é usado deliberadamente para manter a mesma forma
 * assíncrona que uma implementação de API futura terá, evitando retrabalho
 * de UI (loading/suspense) quando a troca acontecer.
 */
export class LocalProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    return Promise.resolve(MOCK_PRODUCTS.filter((p) => p.active));
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug && p.active);
    return Promise.resolve(product ?? null);
  }

  async getById(id: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    return Promise.resolve(product ?? null);
  }
}

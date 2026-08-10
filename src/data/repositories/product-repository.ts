import type { Product } from "@/domain/product/types";

/**
 * Contrato de acesso a dados de produtos.
 *
 * A UI e o ProductService nunca dependem de `LocalProductRepository`
 * diretamente — apenas desta interface. Quando um backend existir, basta
 * criar `ApiProductRepository implements ProductRepository` e trocar a
 * instância exportada em `src/data/repositories/index.ts`, sem alterar
 * páginas, componentes ou o Service.
 */
export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getById(id: string): Promise<Product | null>;
}

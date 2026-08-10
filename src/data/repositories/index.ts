import { LocalProductRepository } from "./local-product-repository";
import { LocalCategoryRepository } from "./local-category-repository";

/**
 * Único ponto de composição das implementações de Repository.
 *
 * Evolução futura: trocar `new LocalProductRepository()` por
 * `new ApiProductRepository()` (mesma interface) conecta toda a aplicação
 * a um backend real sem tocar em Services, páginas ou componentes.
 */
export const productRepository = new LocalProductRepository();
export const categoryRepository = new LocalCategoryRepository();

export type { ProductRepository } from "./product-repository";
export type { CategoryRepository } from "./category-repository";

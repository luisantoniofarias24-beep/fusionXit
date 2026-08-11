import type { Category } from "@/domain/category/types";
import { PLATFORM_LIST } from "@/domain/product/platform";

/**
 * Categorias da loja: Android, iPhone e PC.
 *
 * Derivadas de `PLATFORM_LIST` para que catálogo, filtros, navegação e admin
 * nunca fiquem fora de sincronia com a plataforma dos produtos.
 */
export const MOCK_CATEGORIES: Category[] = PLATFORM_LIST.map((meta) => ({
  id: meta.categoryId,
  slug: meta.categorySlug,
  name: meta.label,
  description: meta.description,
  platform: meta.platform,
}));

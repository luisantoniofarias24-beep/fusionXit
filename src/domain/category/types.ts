import type { ProductPlatform } from "@/domain/product/types";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  /**
   * Plataforma representada pela categoria. Categoria e plataforma são o
   * mesmo eixo na loja digital (ver domain/product/platform.ts).
   */
  platform: ProductPlatform;
  /** Arte opcional. As categorias atuais são representadas por ícone. */
  image?: ProductCategoryImage;
}

export interface ProductCategoryImage {
  url: string;
  alt: string;
}

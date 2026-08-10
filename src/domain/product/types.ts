/** Uma especificação técnica exibida na página do produto (ex.: "Peso: 320g"). */
export interface ProductSpecification {
  label: string;
  value: string;
}

/** Uma variação do produto (ex.: cor, tamanho). */
export interface ProductVariant {
  id: string;
  name: string;
  /** Ex.: "Cor" ou "Tamanho" — usado para agrupar variantes na UI. */
  type: string;
  /** Estoque específico desta variante. */
  stock: number;
  /** Diferença de preço em relação ao preço base, se houver (pode ser 0). */
  priceDelta: number;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  images: ProductImage[];
  /** Preço atual, em reais (ex.: 399.9). */
  price: number;
  /** Preço "de", usado para calcular desconto. Null quando não há promoção. */
  compareAtPrice: number | null;
  stock: number;
  sku: string;
  specifications: ProductSpecification[];
  features: string[];
  variants: ProductVariant[];
  /** Média de 0 a 5. Null quando o produto ainda não possui avaliações. */
  rating: number | null;
  reviewsCount: number;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  active: boolean;
  createdAt: string;
}

export type ProductSortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "bestseller";

export interface ProductFilters {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  onlyOnSale?: boolean;
  sort?: ProductSortOption;
}

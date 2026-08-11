/**
 * Plataforma de destino de um produto digital.
 * É o eixo principal de navegação da loja (categorias, filtros e badges).
 */
export type ProductPlatform = "android" | "ios" | "pc";

/** Uma especificação técnica exibida na página do produto (ex.: "Formato: aplicativo"). */
export interface ProductSpecification {
  label: string;
  value: string;
}

/** Uma variação do produto (ex.: duração da licença, edição). */
export interface ProductVariant {
  id: string;
  name: string;
  /** Ex.: "Licença" ou "Duração" — usado para agrupar variantes na UI. */
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
  /**
   * Plataforma do produto. Sempre coerente com `categoryId` — use
   * `categoryIdForPlatform` (domain/product/platform.ts) ao criar produtos.
   */
  platform: ProductPlatform;
  images: ProductImage[];
  /** Preço atual, em reais (ex.: 399.9). */
  price: number;
  /** Preço "de", usado para calcular desconto. Null quando não há promoção. */
  compareAtPrice: number | null;
  /**
   * Disponibilidade. Em produto digital representa quantas licenças/acessos
   * estão liberados para venda; 0 significa indisponível.
   */
  stock: number;
  sku: string;
  specifications: ProductSpecification[];
  features: string[];
  /** Requisitos mínimos informados pelo lojista. Vazio = não informado. */
  requirements: string[];
  /** Dispositivos/versões compatíveis. Vazio = não informado. */
  compatibility: string[];
  /** Passos de acesso/instalação enviados após a compra. Vazio = não informado. */
  instructions: string[];
  /** Duração da licença (ex.: "30 dias"). Null quando não se aplica. */
  licenseDuration: string | null;
  /** Como o produto é entregue. Null quando não informado — nunca presumir prazo. */
  deliveryNote: string | null;
  /** Observação de suporte específica do produto. Null quando não informado. */
  supportNote: string | null;
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
  platform?: ProductPlatform;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  onlyOnSale?: boolean;
  onlyNew?: boolean;
  onlyFeatured?: boolean;
  sort?: ProductSortOption;
}

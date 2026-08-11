import type { ProductPlatform } from "./types";

/**
 * FONTE ÚNICA DE VERDADE das plataformas da loja.
 *
 * Categoria e plataforma são o mesmo eixo de navegação (Android / iPhone /
 * PC). Em vez de duplicar essa relação em mocks, filtros, header e admin,
 * tudo deriva daqui — evitando divergência entre `categoryId` e `platform`.
 */
export interface PlatformMeta {
  platform: ProductPlatform;
  /** Nome exibido em navegação, filtros e página de categoria. */
  label: string;
  /** Texto curto do badge no card do produto. */
  badge: string;
  /** Id da categoria correspondente no catálogo. */
  categoryId: string;
  /** Slug da rota /categoria/[slug]. */
  categorySlug: string;
  /** Descrição usada na página de categoria e no card da Home. */
  description: string;
  /** Arte padrão usada quando o produto não tem imagem própria. */
  defaultImage: string;
}

export const PLATFORMS: Record<ProductPlatform, PlatformMeta> = {
  android: {
    platform: "android",
    label: "Android",
    badge: "Android",
    categoryId: "cat-android",
    categorySlug: "android",
    description: "Produtos e serviços digitais para quem joga em aparelhos Android.",
    defaultImage: "/images/products/android-01.svg",
  },
  ios: {
    platform: "ios",
    label: "iPhone",
    badge: "iOS",
    categoryId: "cat-ios",
    categorySlug: "iphone",
    description: "Produtos e serviços digitais para quem joga em iPhone e iPad.",
    defaultImage: "/images/products/ios-01.svg",
  },
  pc: {
    platform: "pc",
    label: "PC",
    badge: "PC",
    categoryId: "cat-pc",
    categorySlug: "pc",
    description: "Produtos e serviços digitais para quem joga em PC ou emulador.",
    defaultImage: "/images/products/pc-01.svg",
  },
};

/** Ordem canônica de exibição — usada em categorias, filtros e navegação. */
export const PLATFORM_ORDER: ProductPlatform[] = ["android", "ios", "pc"];

export const PLATFORM_LIST: PlatformMeta[] = PLATFORM_ORDER.map((p) => PLATFORMS[p]);

export function categoryIdForPlatform(platform: ProductPlatform): string {
  return PLATFORMS[platform].categoryId;
}

export function platformLabel(platform: ProductPlatform): string {
  return PLATFORMS[platform].label;
}

/** Resolve a plataforma a partir do id de categoria. Null quando não reconhecido. */
export function platformFromCategoryId(categoryId: string): ProductPlatform | null {
  return PLATFORM_ORDER.find((p) => PLATFORMS[p].categoryId === categoryId) ?? null;
}

/** Type guard usado ao ler dados externos (localStorage, formulários). */
export function isProductPlatform(value: unknown): value is ProductPlatform {
  return typeof value === "string" && value in PLATFORMS;
}

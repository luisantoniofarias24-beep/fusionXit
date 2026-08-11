import type { Product } from "./types";
import { categoryIdForPlatform, isProductPlatform, platformFromCategoryId } from "./platform";

/**
 * COMPATIBILIDADE COM DADOS JÁ SALVOS.
 *
 * O admin persiste produtos em localStorage. Produtos cadastrados antes da
 * migração para catálogo digital não possuem `platform`, `requirements`,
 * `compatibility`, `instructions`, `licenseDuration`, `deliveryNote` nem
 * `supportNote` — e podem apontar para categorias que não existem mais
 * (áudio, computação, wearables, mobilidade).
 *
 * Esta função aceita o registro antigo e devolve um `Product` completo, sem
 * descartar o que o lojista já havia cadastrado (nome, preço, SKU, textos).
 * Campos digitais ausentes ficam vazios/null — nunca preenchidos com
 * informação inventada.
 */
export function normalizeStoredProduct(raw: unknown): Product | null {
  if (typeof raw !== "object" || raw === null) return null;
  const value = raw as Record<string, unknown>;

  if (typeof value.id !== "string" || typeof value.name !== "string") return null;

  const platform = isProductPlatform(value.platform)
    ? value.platform
    : // Registro antigo: tenta derivar da categoria; sem correspondência,
      // cai em Android e o lojista corrige na edição.
      (platformFromCategoryId(String(value.categoryId ?? "")) ?? "android");

  return {
    id: value.id,
    slug: asString(value.slug, value.id),
    name: value.name,
    shortDescription: asString(value.shortDescription, ""),
    description: asString(value.description, ""),
    categoryId: categoryIdForPlatform(platform),
    platform,
    images: Array.isArray(value.images) ? (value.images as Product["images"]) : [],
    price: asNumber(value.price, 0),
    compareAtPrice: typeof value.compareAtPrice === "number" ? value.compareAtPrice : null,
    stock: asNumber(value.stock, 0),
    sku: asString(value.sku, ""),
    specifications: Array.isArray(value.specifications)
      ? (value.specifications as Product["specifications"])
      : [],
    features: asStringArray(value.features),
    requirements: asStringArray(value.requirements),
    compatibility: asStringArray(value.compatibility),
    instructions: asStringArray(value.instructions),
    licenseDuration: nullableString(value.licenseDuration),
    deliveryNote: nullableString(value.deliveryNote),
    supportNote: nullableString(value.supportNote),
    variants: Array.isArray(value.variants) ? (value.variants as Product["variants"]) : [],
    rating: typeof value.rating === "number" ? value.rating : null,
    reviewsCount: asNumber(value.reviewsCount, 0),
    featured: value.featured === true,
    bestseller: value.bestseller === true,
    isNew: value.isNew === true,
    active: value.active !== false,
    createdAt: asString(value.createdAt, new Date(0).toISOString()),
  };
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function nullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

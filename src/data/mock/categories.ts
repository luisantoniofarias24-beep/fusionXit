import type { Category } from "@/domain/category/types";

/**
 * DADOS DEMONSTRATIVOS — NÃO SÃO O CATÁLOGO REAL DA FUSIONXIT.
 * Servem para desenvolver e testar catálogo, filtros e navegação por
 * categoria. Devem ser substituídos pelas categorias reais antes do
 * lançamento comercial.
 */
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-audio",
    slug: "audio",
    name: "Áudio",
    description: "Fones, caixas de som e equipamentos de áudio de alta performance.",
    image: { url: "/images/products/placeholder-audio.svg", alt: "Categoria Áudio" },
  },
  {
    id: "cat-computacao",
    slug: "computacao",
    name: "Computação",
    description: "Periféricos e acessórios para setups de alta performance.",
    image: { url: "/images/products/placeholder-computacao.svg", alt: "Categoria Computação" },
  },
  {
    id: "cat-wearables",
    slug: "wearables",
    name: "Wearables",
    description: "Smartwatches e dispositivos vestíveis para o dia a dia.",
    image: { url: "/images/products/placeholder-wearables.svg", alt: "Categoria Wearables" },
  },
  {
    id: "cat-mobilidade",
    slug: "mobilidade",
    name: "Mobilidade",
    description: "Carregadores, power banks e acessórios para uso móvel.",
    image: { url: "/images/products/placeholder-mobilidade.svg", alt: "Categoria Mobilidade" },
  },
];

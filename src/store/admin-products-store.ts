import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/domain/product/types";
import { MOCK_PRODUCTS } from "@/data/mock/products";

interface AdminProductsState {
  products: Product[];
  create: (product: Product) => void;
  update: (id: string, patch: Partial<Product>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Product | undefined;
}

/**
 * CAMADA ADMINISTRATIVA LOCAL/DEMONSTRATIVA.
 *
 * Isolada deliberadamente da camada pública (`ProductRepository`/
 * `ProductService`), que continua servindo o catálogo comercial a partir
 * dos dados mock estáticos, renderizados em Server Components.
 *
 * Esta store roda inteiramente no navegador (Zustand + persist em
 * localStorage) porque não existe backend nesta fase. Implicações reais,
 * documentadas em vez de escondidas:
 *  - alterações feitas aqui NÃO persistem entre dispositivos ou navegadores;
 *  - alterações feitas aqui NÃO se refletem automaticamente nas páginas
 *    públicas (Home, catálogo, produto), pois essas páginas são Server
 *    Components renderizados a partir do repository estático — refletir
 *    edições do admin ali exigiria um backend real ou converter essas
 *    páginas para leitura client-side, o que sacrificaria performance/SEO
 *    sem necessidade nesta fase de demonstração;
 *  - esta store existe para validar o FLUXO de cadastro/edição/exclusão,
 *    não para simular um banco de dados real.
 */
export const useAdminProductsStore = create<AdminProductsState>()(
  persist(
    (set, get) => ({
      products: MOCK_PRODUCTS,

      create: (product) => set((state) => ({ products: [product, ...state.products] })),

      update: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      remove: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

      getById: (id) => get().products.find((p) => p.id === id),
    }),
    { name: "fusionxit-admin-products" }
  )
);

"use client";

import { useMemo, useState } from "react";
import { PackageX } from "lucide-react";
import type { Product, ProductSortOption } from "@/domain/product/types";
import type { Category } from "@/domain/category/types";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductGrid } from "@/components/product/product-grid";

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "newest", label: "Mais recentes" },
  { value: "bestseller", label: "Mais vendidos" },
];

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
  initialCategoryId?: string;
}

export function CatalogClient({ products, categories, initialCategoryId }: CatalogClientProps) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId ?? "");
  const [sort, setSort] = useState<ProductSortOption>("relevance");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const result = products.filter((product) => {
      if (categoryId && product.categoryId !== categoryId) return false;
      if (onlyInStock && product.stock <= 0) return false;
      if (normalizedQuery) {
        const haystack = [product.name, product.shortDescription, product.description, ...product.features]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });

    const sorted = [...result];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "bestseller":
        sorted.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
        break;
    }

    return sorted;
  }, [products, categoryId, sort, onlyInStock, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          className="sm:max-w-xs"
        />
        <Select
          aria-label="Categoria"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={[{ value: "", label: "Todas as categorias" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
          className="sm:w-48"
        />
        <Select
          aria-label="Ordenar por"
          value={sort}
          onChange={(e) => setSort(e.target.value as ProductSortOption)}
          options={SORT_OPTIONS}
          className="sm:w-48"
        />
        <label className="flex items-center gap-2 text-body-sm text-foreground-secondary">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="size-4 rounded border-border-strong bg-surface accent-accent"
          />
          Somente disponíveis
        </label>
      </div>

      <p className="text-body-sm text-foreground-muted">
        {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<PackageX aria-hidden="true" />}
          title="Nenhum resultado encontrado"
          description="Tente ajustar a busca, a categoria ou os filtros selecionados."
        />
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}

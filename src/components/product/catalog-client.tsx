"use client";

import { useMemo, useState } from "react";
import { PackageX } from "lucide-react";
import type { Product, ProductPlatform, ProductSortOption } from "@/domain/product/types";
import { PLATFORM_LIST } from "@/domain/product/platform";
import { applyFilters } from "@/domain/product/filtering";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductGrid } from "@/components/product/product-grid";
import { cn } from "@/lib/cn";

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "newest", label: "Mais recentes" },
  { value: "bestseller", label: "Mais procurados" },
];

/** Faixas fixas: mais rápidas de usar no mobile do que dois campos numéricos. */
const PRICE_RANGES: { value: string; label: string; min?: number; max?: number }[] = [
  { value: "", label: "Qualquer preço" },
  { value: "ate-50", label: "Até R$ 50", max: 50 },
  { value: "50-100", label: "R$ 50 a R$ 100", min: 50, max: 100 },
  { value: "acima-100", label: "Acima de R$ 100", min: 100 },
];

type ToggleKey = "onlyInStock" | "onlyNew" | "onlyFeatured";

const TOGGLES: { key: ToggleKey; label: string }[] = [
  { key: "onlyInStock", label: "Disponíveis" },
  { key: "onlyNew", label: "Novidades" },
  { key: "onlyFeatured", label: "Destaques" },
];

interface CatalogClientProps {
  products: Product[];
  /** Pré-seleciona a plataforma — usado pela página de categoria. */
  initialPlatform?: ProductPlatform;
}

export function CatalogClient({ products, initialPlatform }: CatalogClientProps) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<ProductPlatform | "">(initialPlatform ?? "");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState<ProductSortOption>("relevance");
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    onlyInStock: false,
    onlyNew: false,
    onlyFeatured: false,
  });

  const selectedRange = PRICE_RANGES.find((range) => range.value === priceRange);
  const hasActiveFilters =
    query.trim().length > 0 ||
    platform !== (initialPlatform ?? "") ||
    priceRange !== "" ||
    sort !== "relevance" ||
    Object.values(toggles).some(Boolean);

  const filtered = useMemo(
    () =>
      applyFilters(products, {
        query,
        platform: platform || undefined,
        minPrice: selectedRange?.min,
        maxPrice: selectedRange?.max,
        sort,
        ...toggles,
      }),
    [products, query, platform, selectedRange?.min, selectedRange?.max, sort, toggles]
  );

  function resetFilters() {
    setQuery("");
    setPlatform(initialPlatform ?? "");
    setPriceRange("");
    setSort("relevance");
    setToggles({ onlyInStock: false, onlyNew: false, onlyFeatured: false });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          className="sm:max-w-sm"
        />

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por plataforma">
          <FilterChip
            label="Todos"
            active={platform === ""}
            onClick={() => setPlatform("")}
          />
          {PLATFORM_LIST.map((meta) => (
            <FilterChip
              key={meta.platform}
              label={meta.label}
              active={platform === meta.platform}
              onClick={() => setPlatform(meta.platform)}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
          <Select
            aria-label="Faixa de preço"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            options={PRICE_RANGES.map(({ value, label }) => ({ value, label }))}
          />
          <Select
            aria-label="Ordenar por"
            value={sort}
            onChange={(e) => setSort(e.target.value as ProductSortOption)}
            options={SORT_OPTIONS}
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros adicionais">
          {TOGGLES.map(({ key, label }) => (
            <FilterChip
              key={key}
              label={label}
              active={toggles[key]}
              onClick={() => setToggles((current) => ({ ...current, [key]: !current[key] }))}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-body-sm text-foreground-muted">
          {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-body-sm text-accent transition-colors hover:text-accent-hover"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<PackageX aria-hidden="true" />}
          title="Nenhum resultado encontrado"
          description="Tente ajustar a busca, a plataforma ou os filtros selecionados."
        />
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center rounded-pill border px-4 text-body-sm transition-colors duration-fast",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-border-strong text-foreground-secondary hover:border-foreground-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

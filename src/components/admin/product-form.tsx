"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MOCK_CATEGORIES } from "@/data/mock/categories";
import type { Product } from "@/domain/product/types";
import { useToastStore } from "@/store/toast-store";

export interface ProductFormValues {
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  stock: string;
  active: boolean;
  featured: boolean;
  isNew: boolean;
  bestseller: boolean;
}

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  slug: "",
  categoryId: MOCK_CATEGORIES[0]?.id ?? "",
  shortDescription: "",
  description: "",
  price: "",
  compareAtPrice: "",
  sku: "",
  stock: "",
  active: true,
  featured: false,
  isNew: false,
  bestseller: false,
};

export function productToFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    slug: product.slug,
    categoryId: product.categoryId,
    shortDescription: product.shortDescription,
    description: product.description,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
    sku: product.sku,
    stock: String(product.stock),
    active: product.active,
    featured: product.featured,
    isNew: product.isNew,
    bestseller: product.bestseller,
  };
}

interface ProductFormProps {
  initialValues?: ProductFormValues;
  onSubmit: (product: Product) => void;
  existingId?: string;
  existingImages?: Product["images"];
  existingSpecifications?: Product["specifications"];
  existingFeatures?: string[];
  existingVariants?: Product["variants"];
  existingRating?: number | null;
  existingReviewsCount?: number;
  existingCreatedAt?: string;
  submitLabel: string;
}

export function ProductForm({
  initialValues = EMPTY_VALUES,
  onSubmit,
  existingId,
  existingImages,
  existingSpecifications,
  existingFeatures,
  existingVariants,
  existingRating,
  existingReviewsCount,
  existingCreatedAt,
  submitLabel,
}: ProductFormProps) {
  const router = useRouter();
  const pushToast = useToastStore((state) => state.push);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormValues, string>>>({});

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof ProductFormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Informe o nome do produto";
    if (!values.slug.trim()) nextErrors.slug = "Informe o slug";
    if (!values.sku.trim()) nextErrors.sku = "Informe o SKU";
    if (!values.shortDescription.trim()) nextErrors.shortDescription = "Informe a descrição curta";
    const price = Number(values.price);
    if (!values.price || Number.isNaN(price) || price <= 0) {
      nextErrors.price = "Informe um preço válido";
    }
    const stock = Number(values.stock);
    if (values.stock === "" || Number.isNaN(stock) || stock < 0) {
      nextErrors.stock = "Informe um estoque válido";
    }
    if (values.compareAtPrice) {
      const compareAt = Number(values.compareAtPrice);
      if (Number.isNaN(compareAt) || compareAt <= price) {
        nextErrors.compareAtPrice = "O preço anterior deve ser maior que o preço atual";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      pushToast("error", "Corrija os campos destacados antes de continuar");
      return;
    }

    const product: Product = {
      id: existingId ?? `prod-${crypto.randomUUID()}`,
      slug: values.slug.trim(),
      name: values.name.trim(),
      shortDescription: values.shortDescription.trim(),
      description: values.description.trim(),
      categoryId: values.categoryId,
      images: existingImages ?? [{ url: "/images/products/product-01.svg", alt: values.name }],
      price: Number(values.price),
      compareAtPrice: values.compareAtPrice ? Number(values.compareAtPrice) : null,
      stock: Number(values.stock),
      sku: values.sku.trim(),
      specifications: existingSpecifications ?? [],
      features: existingFeatures ?? [],
      variants: existingVariants ?? [],
      rating: existingRating ?? null,
      reviewsCount: existingReviewsCount ?? 0,
      featured: values.featured,
      bestseller: values.bestseller,
      isNew: values.isNew,
      active: values.active,
      createdAt: existingCreatedAt ?? new Date().toISOString(),
    };

    onSubmit(product);
    pushToast("success", `${product.name} salvo com sucesso`);
    router.push("/admin/produtos");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Nome"
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          errorText={errors.name}
        />
        <Input
          label="Slug"
          required
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          errorText={errors.slug}
          helperText={!errors.slug ? "Usado na URL: /produto/seu-slug" : undefined}
        />
        <Select
          label="Categoria"
          value={values.categoryId}
          onChange={(e) => set("categoryId", e.target.value)}
          options={MOCK_CATEGORIES.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input
          label="SKU"
          required
          value={values.sku}
          onChange={(e) => set("sku", e.target.value)}
          errorText={errors.sku}
        />
        <Input
          label="Preço"
          required
          type="number"
          step="0.01"
          value={values.price}
          onChange={(e) => set("price", e.target.value)}
          errorText={errors.price}
        />
        <Input
          label="Preço anterior (promoção)"
          type="number"
          step="0.01"
          value={values.compareAtPrice}
          onChange={(e) => set("compareAtPrice", e.target.value)}
          errorText={errors.compareAtPrice}
          helperText={!errors.compareAtPrice ? "Deixe em branco se não houver promoção" : undefined}
        />
        <Input
          label="Estoque"
          required
          type="number"
          value={values.stock}
          onChange={(e) => set("stock", e.target.value)}
          errorText={errors.stock}
        />
      </div>

      <Input
        label="Descrição curta"
        required
        value={values.shortDescription}
        onChange={(e) => set("shortDescription", e.target.value)}
        errorText={errors.shortDescription}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-label text-foreground-secondary">
          Descrição completa
        </label>
        <textarea
          id="description"
          rows={5}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className="rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-body text-foreground placeholder:text-foreground-muted focus-visible:outline-none focus-visible:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        {(
          [
            ["active", "Ativo"],
            ["featured", "Destaque"],
            ["isNew", "Lançamento"],
            ["bestseller", "Mais vendido"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-body-sm text-foreground-secondary">
            <input
              type="checkbox"
              checked={values[key]}
              onChange={(e) => set(key, e.target.checked)}
              className="size-4 rounded border-border-strong bg-surface accent-accent"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/produtos")}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

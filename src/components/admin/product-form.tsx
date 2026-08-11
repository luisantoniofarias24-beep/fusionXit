"use client";

import { useState, useId, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PLATFORMS, PLATFORM_LIST, categoryIdForPlatform } from "@/domain/product/platform";
import type { Product, ProductPlatform } from "@/domain/product/types";
import { useToastStore } from "@/store/toast-store";

export interface ProductFormValues {
  name: string;
  slug: string;
  platform: ProductPlatform;
  shortDescription: string;
  description: string;
  price: string;
  compareAtPrice: string;
  sku: string;
  stock: string;
  licenseDuration: string;
  deliveryNote: string;
  supportNote: string;
  /** Campos de lista são editados como texto, um item por linha. */
  requirements: string;
  compatibility: string;
  instructions: string;
  active: boolean;
  featured: boolean;
  isNew: boolean;
  bestseller: boolean;
}

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  slug: "",
  platform: "android",
  shortDescription: "",
  description: "",
  price: "",
  compareAtPrice: "",
  sku: "",
  stock: "",
  licenseDuration: "",
  deliveryNote: "",
  supportNote: "",
  requirements: "",
  compatibility: "",
  instructions: "",
  active: true,
  featured: false,
  isNew: false,
  bestseller: false,
};

export function productToFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    slug: product.slug,
    platform: product.platform,
    shortDescription: product.shortDescription,
    description: product.description,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
    sku: product.sku,
    stock: String(product.stock),
    licenseDuration: product.licenseDuration ?? "",
    deliveryNote: product.deliveryNote ?? "",
    supportNote: product.supportNote ?? "",
    requirements: product.requirements.join("\n"),
    compatibility: product.compatibility.join("\n"),
    instructions: product.instructions.join("\n"),
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
      nextErrors.stock = "Informe uma disponibilidade válida";
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
      // Categoria e plataforma são o mesmo eixo: derivar evita divergência.
      categoryId: categoryIdForPlatform(values.platform),
      platform: values.platform,
      images: existingImages ?? [
        { url: PLATFORMS[values.platform].defaultImage, alt: values.name },
      ],
      price: Number(values.price),
      compareAtPrice: values.compareAtPrice ? Number(values.compareAtPrice) : null,
      stock: Number(values.stock),
      sku: values.sku.trim(),
      specifications: existingSpecifications ?? [],
      features: existingFeatures ?? [],
      requirements: linesToArray(values.requirements),
      compatibility: linesToArray(values.compatibility),
      instructions: linesToArray(values.instructions),
      licenseDuration: emptyToNull(values.licenseDuration),
      deliveryNote: emptyToNull(values.deliveryNote),
      supportNote: emptyToNull(values.supportNote),
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-label uppercase tracking-wide text-foreground-muted">
          Dados do produto
        </legend>
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
            label="Plataforma"
            value={values.platform}
            onChange={(e) => set("platform", e.target.value as ProductPlatform)}
            options={PLATFORM_LIST.map((meta) => ({
              value: meta.platform,
              label: meta.label,
            }))}
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
            label="Disponibilidade"
            required
            type="number"
            value={values.stock}
            onChange={(e) => set("stock", e.target.value)}
            errorText={errors.stock}
            helperText={
              !errors.stock ? "Quantidade de acessos/licenças liberados. 0 = indisponível" : undefined
            }
          />
          <Input
            label="Duração / licença"
            value={values.licenseDuration}
            onChange={(e) => set("licenseDuration", e.target.value)}
            helperText="Ex.: 30 dias. Deixe em branco se não se aplica"
          />
        </div>

        <Input
          label="Descrição curta"
          required
          value={values.shortDescription}
          onChange={(e) => set("shortDescription", e.target.value)}
          errorText={errors.shortDescription}
        />

        <TextareaField
          label="Descrição completa"
          rows={5}
          value={values.description}
          onChange={(value) => set("description", value)}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-label uppercase tracking-wide text-foreground-muted">
          Produto digital
        </legend>
        <TextareaField
          label="Requisitos"
          rows={4}
          value={values.requirements}
          onChange={(value) => set("requirements", value)}
          helperText="Um requisito por linha"
        />
        <TextareaField
          label="Compatibilidade"
          rows={3}
          value={values.compatibility}
          onChange={(value) => set("compatibility", value)}
          helperText="Uma versão/dispositivo por linha"
        />
        <TextareaField
          label="Instruções de acesso"
          rows={4}
          value={values.instructions}
          onChange={(value) => set("instructions", value)}
          helperText="Um passo por linha"
        />
        <TextareaField
          label="Informações de entrega"
          rows={2}
          value={values.deliveryNote}
          onChange={(value) => set("deliveryNote", value)}
          helperText="Como o acesso chega ao cliente"
        />
        <TextareaField
          label="Suporte"
          rows={2}
          value={values.supportNote}
          onChange={(value) => set("supportNote", value)}
          helperText="Como o cliente é atendido para este produto"
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-label uppercase tracking-wide text-foreground-muted">
          Exibição na loja
        </legend>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {(
            [
              ["active", "Ativo"],
              ["featured", "Destaque"],
              ["isNew", "Novo"],
              ["bestseller", "Mais procurado"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 text-body-sm text-foreground-secondary"
            >
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
      </fieldset>

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

function TextareaField({
  label,
  value,
  onChange,
  rows,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  helperText?: string;
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-foreground-secondary">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helperText ? `${id}-helper` : undefined}
        className="rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-body text-foreground placeholder:text-foreground-muted focus-visible:border-accent focus-visible:outline-none"
      />
      {helperText && (
        <p id={`${id}-helper`} className="text-body-sm text-foreground-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

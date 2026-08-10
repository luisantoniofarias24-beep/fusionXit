"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ProductForm, productToFormValues } from "@/components/admin/product-form";
import { useAdminProductsStore } from "@/store/admin-products-store";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const product = useAdminProductsStore((state) => state.getById(id));
  const updateProduct = useAdminProductsStore((state) => state.update);

  if (!product) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-display text-h1 text-foreground">Editar produto</h1>
      <ProductForm
        initialValues={productToFormValues(product)}
        existingId={product.id}
        existingImages={product.images}
        existingSpecifications={product.specifications}
        existingFeatures={product.features}
        existingVariants={product.variants}
        existingRating={product.rating}
        existingReviewsCount={product.reviewsCount}
        existingCreatedAt={product.createdAt}
        onSubmit={(updated) => updateProduct(product.id, updated)}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}

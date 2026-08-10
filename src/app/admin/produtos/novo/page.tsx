"use client";

import { ProductForm } from "@/components/admin/product-form";
import { useAdminProductsStore } from "@/store/admin-products-store";

export default function NewProductPage() {
  const createProduct = useAdminProductsStore((state) => state.create);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-display text-h1 text-foreground">Novo produto</h1>
      <ProductForm onSubmit={createProduct} submitLabel="Criar produto" />
    </div>
  );
}

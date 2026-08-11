"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/format";
import { useAdminProductsStore } from "@/store/admin-products-store";
import { platformLabel } from "@/domain/product/platform";
import type { Product } from "@/domain/product/types";

export default function AdminProductsPage() {
  const products = useAdminProductsStore((state) => state.products);
  const removeProduct = useAdminProductsStore((state) => state.remove);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-h1 text-foreground">Produtos</h1>
        <Link href="/admin/produtos/novo">
          <Button variant="primary" iconLeft={<Plus className="size-4" aria-hidden="true" />}>
            Novo produto
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] text-left text-body-sm">
          <thead className="border-b border-border bg-surface text-foreground-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Plataforma</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Disponibilidade</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded bg-background-secondary">
                    {product.images[0] && (
                      <Image src={product.images[0].url} alt="" fill sizes="40px" className="object-cover" />
                    )}
                  </div>
                  <span className="text-foreground">{product.name}</span>
                </td>
                <td className="px-4 py-3 text-foreground-muted">{product.sku}</td>
                <td className="px-4 py-3 text-foreground-muted">
                  {platformLabel(product.platform)}
                </td>
                <td className="px-4 py-3 text-foreground">{formatCurrency(product.price)}</td>
                <td className="px-4 py-3 text-foreground">{product.stock}</td>
                <td className="px-4 py-3">
                  <Badge variant={product.active ? "success" : "neutral"}>
                    {product.active ? "Ativo" : "Inativo"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/produtos/${product.id}/editar`}
                      aria-label={`Editar ${product.name}`}
                      className="flex size-8 items-center justify-center rounded text-foreground-muted hover:text-accent"
                    >
                      <Pencil className="size-4" aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Excluir ${product.name}`}
                      onClick={() => setPendingDelete(product)}
                      className="flex size-8 items-center justify-center rounded text-foreground-muted hover:text-danger"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title="Excluir produto"
      >
        <p className="mb-4 text-body-sm text-foreground-secondary">
          Tem certeza de que deseja excluir <strong className="text-foreground">{pendingDelete?.name}</strong>?
          Esta ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setPendingDelete(null)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (pendingDelete) removeProduct(pendingDelete.id);
              setPendingDelete(null);
            }}
          >
            Excluir
          </Button>
        </div>
      </Modal>
    </div>
  );
}

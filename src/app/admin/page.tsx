"use client";

import { calculateDiscountPercent } from "@/lib/format";
import { useAdminProductsStore } from "@/store/admin-products-store";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-5">
      <span className="text-label text-foreground-secondary">{label}</span>
      <span className="text-h1 font-display text-foreground">{value}</span>
    </div>
  );
}

export default function AdminDashboardPage() {
  const products = useAdminProductsStore((state) => state.products);

  const stats = {
    total: products.length,
    active: products.filter((p) => p.active).length,
    onSale: products.filter((p) => calculateDiscountPercent(p.price, p.compareAtPrice) !== null).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter((p) => p.stock <= 0).length,
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-h1 text-foreground">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Produtos" value={stats.total} />
        <StatCard label="Ativos" value={stats.active} />
        <StatCard label="Em promoção" value={stats.onSale} />
        <StatCard label="Estoque baixo" value={stats.lowStock} />
        <StatCard label="Esgotados" value={stats.outOfStock} />
      </div>
    </div>
  );
}

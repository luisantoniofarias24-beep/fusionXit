"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { cartService } from "@/domain/cart/cart-service";
import { productRepository } from "@/data/repositories";
import { buildWhatsAppCheckoutUrl } from "@/lib/whatsapp";
import { whatsappNumber } from "@/config/whatsapp";
import type { Product } from "@/domain/product/types";

const STEPS = ["Identificação", "Endereço", "Entrega", "Pagamento", "Revisão"] as const;

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<Record<string, Product>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        items.map(async (item) => [item.productId, await productRepository.getById(item.productId)] as const)
      );
      if (cancelled) return;
      const map: Record<string, Product> = {};
      for (const [id, product] of entries) if (product) map[id] = product;
      setProducts(map);
    })();
    return () => {
      cancelled = true;
    };
  }, [items]);

  const summary = cartService.summarize(items);
  const whatsappUrl = buildWhatsAppCheckoutUrl({ items, products, total: summary.total });

  if (items.length === 0) {
    return (
      <Container className="flex flex-col gap-6 py-10">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Checkout" }]} />
        <EmptyState
          title="Seu carrinho está vazio"
          description="Adicione produtos ao carrinho antes de finalizar a compra."
          action={
            <Link href="/produtos">
              <Button variant="primary">Explorar produtos</Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-8 py-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Carrinho", href: "/carrinho" }, { label: "Checkout" }]} />

      <div>
        <h1 className="font-display text-h1 text-foreground">Checkout</h1>
        <p className="mt-1 text-body-sm text-foreground-muted">
          Fluxo de demonstração — nenhum pagamento real é processado nesta versão.
        </p>
      </div>

      <ol className="flex flex-wrap gap-2" aria-label="Etapas do checkout">
        {STEPS.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(index)}
              aria-current={step === index ? "step" : undefined}
              className={`flex items-center gap-2 rounded-pill border px-3.5 py-1.5 text-body-sm transition-colors ${
                step === index
                  ? "border-accent text-accent"
                  : index < step
                  ? "border-border-strong text-foreground-secondary"
                  : "border-border text-foreground-muted"
              }`}
            >
              {index < step && <CheckCircle2 className="size-3.5" aria-hidden="true" />}
              {index + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-lg border border-border p-6 lg:col-span-2">
          <StepContent step={step} />
          <div className="mt-6 flex justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              Voltar
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="primary" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>
                Continuar
              </Button>
            ) : whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" iconLeft={<MessageCircle className="size-4" aria-hidden="true" />}>
                  Finalizar via WhatsApp
                </Button>
              </a>
            ) : (
              <Button variant="primary" disabled title="Número do WhatsApp não configurado">
                Finalizar via WhatsApp
              </Button>
            )}
          </div>
          {step === STEPS.length - 1 && !whatsappNumber && (
            <p className="mt-3 text-body-sm text-warning">
              A finalização via WhatsApp requer configurar NEXT_PUBLIC_WHATSAPP_NUMBER.
            </p>
          )}
        </div>

        <div className="flex h-fit flex-col gap-4 rounded-lg border border-border p-5">
          <h2 className="text-h4 text-foreground">Resumo do pedido</h2>
          <div className="flex justify-between text-body-sm">
            <span className="text-foreground-secondary">Subtotal ({summary.itemCount} itens)</span>
            <span className="text-foreground">{formatCurrency(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-4 text-body font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{formatCurrency(summary.total)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nome completo" placeholder="Seu nome" required />
          <Input label="E-mail" type="email" placeholder="voce@exemplo.com" required />
        </div>
      );
    case 1:
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="CEP" placeholder="00000-000" required />
          <Input label="Cidade" placeholder="Sua cidade" required />
          <Input label="Endereço" placeholder="Rua, número" required className="sm:col-span-2" />
          <Input label="Complemento" placeholder="Opcional" />
        </div>
      );
    case 2:
      return (
        <Select
          label="Modalidade de entrega"
          options={[
            { value: "standard", label: "Padrão (a definir)" },
            { value: "express", label: "Expressa (a definir)" },
          ]}
        />
      );
    case 3:
      return (
        <div className="flex flex-col gap-3">
          <p className="text-body-sm text-foreground-secondary">
            Esta etapa é uma preparação visual para integração futura com um gateway de pagamento.
            Nenhum dado de cartão é coletado ou armazenado nesta versão.
          </p>
          <Select
            label="Forma de pagamento (preparação)"
            options={[
              { value: "whatsapp", label: "Finalizar via WhatsApp" },
              { value: "future", label: "Cartão / Pix (em breve)" },
            ]}
          />
        </div>
      );
    case 4:
    default:
      return (
        <p className="text-body-sm text-foreground-secondary">
          Revise os dados nas etapas anteriores e finalize seu pedido via WhatsApp.
        </p>
      );
  }
}

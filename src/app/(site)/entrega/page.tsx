import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Entrega digital",
  description:
    "Como funciona a entrega dos produtos digitais da FusionXit: nenhum item é enviado fisicamente.",
};

export default function DeliveryPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Entrega digital" }]} />
      <h1 className="font-display text-h2 text-foreground sm:text-h1">Entrega digital</h1>
      <p className="text-body text-foreground-secondary">
        Todos os itens da FusionXit são digitais — nada é enviado fisicamente e não há
        frete. Cada página de produto descreve, em “Como você recebe”, o que é entregue
        e por qual canal.
      </p>
      <p className="text-body text-foreground-secondary">
        Antes de finalizar o pedido, confira a seção “Antes de comprar” do produto:
        ela informa a plataforma (Android, iPhone ou PC), os requisitos e a
        compatibilidade declarados.
      </p>
      <p className="text-body-sm text-foreground-muted">
        [Prazos de liberação e demais regras comerciais serão publicados aqui quando
        forem definidos oficialmente pela FusionXit.]
      </p>
    </Container>
  );
}

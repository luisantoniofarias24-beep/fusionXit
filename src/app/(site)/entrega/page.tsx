import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = { title: "Entrega" };

export default function ShippingPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Entrega" }]} />
      <h1 className="font-display text-h1 text-foreground">Entrega</h1>
      <p className="text-body text-foreground-secondary">
        [Prazos, regiões atendidas e custos de entrega pendentes de definição
        comercial pela FusionXit — placeholder até recebermos essas informações.]
      </p>
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = { title: "Trocas e Devoluções" };

export default function ReturnsPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Trocas e Devoluções" }]} />
      <h1 className="font-display text-h1 text-foreground">Trocas e Devoluções</h1>
      <p className="text-body text-foreground-secondary">
        [Política comercial de trocas e devoluções pendente de definição pela
        FusionXit — placeholder até recebermos as regras oficiais (prazos,
        condições, processo).]
      </p>
    </Container>
  );
}

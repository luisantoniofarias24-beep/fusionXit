import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = { title: "Sobre" };

export default function AboutPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sobre" }]} />
      <h1 className="font-display text-h1 text-foreground">Sobre a FusionXit</h1>
      <p className="text-body text-foreground-secondary">
        [Conteúdo institucional a ser fornecido pela FusionXit — placeholder até
        recebermos o texto oficial sobre a história e a proposta da marca.]
      </p>
    </Container>
  );
}

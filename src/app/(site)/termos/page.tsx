import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermsPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Termos de Uso" }]} />
      <h1 className="font-display text-h1 text-foreground">Termos de Uso</h1>
      <p className="text-body text-foreground-secondary">
        [Texto jurídico definitivo pendente — este é um placeholder. Os termos
        oficiais devem ser fornecidos por um responsável jurídico antes do
        lançamento comercial.]
      </p>
    </Container>
  );
}

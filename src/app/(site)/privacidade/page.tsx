import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacyPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Política de Privacidade" }]} />
      <h1 className="font-display text-h1 text-foreground">Política de Privacidade</h1>
      <p className="text-body text-foreground-secondary">
        [Texto jurídico definitivo pendente — este é um placeholder. A política
        oficial de privacidade da FusionXit deve ser fornecida por um responsável
        jurídico antes do lançamento comercial.]
      </p>
    </Container>
  );
}

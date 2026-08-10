import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Contato" };

export default function ContactPage() {
  return (
    <Container className="flex max-w-lg flex-col gap-4 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contato" }]} />
      <h1 className="font-display text-h1 text-foreground">Contato</h1>
      <p className="text-body-sm text-foreground-muted">
        [Canais oficiais de atendimento — telefone, e-mail e endereço — serão
        adicionados quando fornecidos pela FusionXit.]
      </p>
      <form className="flex flex-col gap-4">
        <Input label="Nome" placeholder="Seu nome" required />
        <Input label="E-mail" type="email" placeholder="voce@exemplo.com" required />
        <Input label="Mensagem" placeholder="Como podemos ajudar?" required />
        <Button type="submit" variant="primary" className="self-start">
          Enviar
        </Button>
      </form>
    </Container>
  );
}

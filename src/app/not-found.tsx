import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="font-display text-display text-accent">404</span>
      <h1 className="text-h2 text-foreground">Página não encontrada</h1>
      <p className="max-w-sm text-body text-foreground-secondary">
        O endereço acessado não existe ou foi movido.
      </p>
      <Link href="/">
        <Button variant="primary">Voltar para a Home</Button>
      </Link>
    </Container>
  );
}

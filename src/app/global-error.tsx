"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-h2 font-display">Algo deu errado</h1>
          <p className="max-w-sm text-body text-foreground-secondary">
            Ocorreu um erro inesperado ao carregar esta página.
          </p>
          <Button variant="primary" onClick={reset}>
            Tentar novamente
          </Button>
        </Container>
      </body>
    </html>
  );
}

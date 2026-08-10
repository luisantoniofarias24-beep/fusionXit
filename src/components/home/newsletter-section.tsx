"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToastStore } from "@/store/toast-store";

/**
 * Interface pronta para cadastro futuro de e-mail.
 * Sem backend, este formulário apenas simula o envio localmente (não
 * persiste nem transmite o e-mail a lugar nenhum) — comportamento
 * claramente demonstrativo até existir integração real.
 */
export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const pushToast = useToastStore((state) => state.push);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      pushToast("error", "Informe um e-mail válido");
      return;
    }
    pushToast("success", "Cadastro recebido (demonstração — sem envio real)");
    setEmail("");
  }

  return (
    <section className="border-b border-border py-16">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-h2 text-foreground">Fique por dentro das novidades</h2>
        <p className="max-w-md text-body text-foreground-secondary">
          Cadastre seu e-mail para receber lançamentos e ofertas selecionadas.
        </p>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            aria-label="Seu e-mail"
            placeholder="voce@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary">
            Cadastrar
          </Button>
        </form>
      </Container>
    </section>
  );
}

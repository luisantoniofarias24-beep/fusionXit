import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

/**
 * Hero da Home.
 *
 * Tipografia responsiva por degraus (2rem → 4.25rem) em vez do token fixo
 * `display-xl`: em 320px a palavra mais longa do título ("JOGABILIDADE")
 * precisa caber nos 288px úteis do Container, sem corte nem overflow
 * horizontal. `break-words` é a rede de segurança para telas ainda menores.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgb(var(--color-accent) / 0.16), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-5 py-16 text-center sm:gap-6 sm:py-24 lg:py-32">
        <span className="text-label uppercase tracking-[0.16em] text-accent">
          FusionXit — Loja digital
        </span>
        <h1 className="max-w-[16ch] text-balance break-words font-display text-[2rem] font-semibold uppercase leading-[1.06] tracking-tight text-foreground xs:text-[2.5rem] sm:text-[3.25rem] lg:text-[4.25rem]">
          Melhore sua jogabilidade
        </h1>
        <p className="max-w-md text-body text-foreground-secondary sm:max-w-lg sm:text-body-lg">
          Produtos e serviços digitais para jogadores de Free Fire — configuração,
          otimização e acompanhamento para Android, iPhone e PC.
        </p>
        <Link
          href="/produtos"
          className="group mt-2 inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-md bg-accent px-7 text-button font-semibold uppercase tracking-wide text-accent-foreground transition-colors duration-fast hover:bg-accent-hover sm:w-auto"
        >
          Ver produtos
          <ArrowRight
            className="size-4 transition-transform duration-fast group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </section>
  );
}

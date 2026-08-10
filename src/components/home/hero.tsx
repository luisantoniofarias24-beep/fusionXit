import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

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
      <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32">
        <span className="text-label uppercase tracking-[0.16em] text-accent">FusionXit</span>
        <h1 className="max-w-3xl font-display text-display-xl text-foreground">
          Tecnologia. Performance. Evolução.
        </h1>
        <p className="max-w-lg text-body-lg text-foreground-secondary">
          Produtos selecionados para quem exige mais.
        </p>
        <Link
          href="/produtos"
          className="group mt-2 inline-flex h-12 items-center gap-2 rounded-md bg-accent px-7 text-button font-semibold text-accent-foreground transition-colors duration-fast hover:bg-accent-hover"
        >
          Explorar produtos
          <ArrowRight className="size-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}

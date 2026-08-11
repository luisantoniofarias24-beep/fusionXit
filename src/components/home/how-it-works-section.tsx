import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const STEPS = [
  {
    title: "Escolha seu produto",
    description:
      "Navegue pelo catálogo por plataforma — Android, iPhone ou PC — e abra o produto que resolve o que você precisa.",
  },
  {
    title: "Confira plataforma e requisitos",
    description:
      "Cada página traz a seção “Antes de comprar”, com requisitos e compatibilidade declarados.",
  },
  {
    title: "Finalize o pedido e siga as instruções de acesso",
    description:
      "Depois da confirmação, o acesso é enviado pelo canal de atendimento junto com as instruções do produto.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-b border-border py-14 sm:py-16">
      <Container className="flex flex-col gap-8">
        <SectionHeader eyebrow="Passo a passo" title="Como funciona" />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 sm:p-6"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-surface-elevated font-display text-body font-semibold text-accent">
                {index + 1}
              </span>
              <span className="text-body font-medium text-foreground">{step.title}</span>
              <p className="text-body-sm text-foreground-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

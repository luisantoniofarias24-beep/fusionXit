import { Download, Headset, ListChecks, MonitorSmartphone } from "lucide-react";
import { Container } from "@/components/ui/container";

/**
 * Benefícios de uma loja digital.
 * Nenhum prazo, garantia ou política é afirmado aqui — apenas o que a loja
 * de fato faz. Números e regras comerciais entram quando forem definidos.
 */
const BENEFITS = [
  {
    icon: Download,
    title: "Entrega digital",
    description: "Sem envio físico: o acesso é enviado após a confirmação do pedido.",
  },
  {
    icon: MonitorSmartphone,
    title: "Compatibilidade clara",
    description: "Plataforma, requisitos e compatibilidade declarados em cada produto.",
  },
  {
    icon: ListChecks,
    title: "Compra simples",
    description: "Escolher, conferir e finalizar em poucos passos, do celular ou do PC.",
  },
  {
    icon: Headset,
    title: "Suporte",
    description: "Canal de atendimento para dúvidas antes e depois da compra.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-border py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-md bg-surface-elevated text-accent">
                <benefit.icon className="size-5" aria-hidden="true" />
              </div>
              <span className="text-body font-medium text-foreground">{benefit.title}</span>
              <p className="text-body-sm text-foreground-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

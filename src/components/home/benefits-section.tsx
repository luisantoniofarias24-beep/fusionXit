import { ShieldCheck, Headset, Truck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

const BENEFITS = [
  { icon: ShieldCheck, title: "Compra segura", description: "Navegação protegida em todas as etapas." },
  { icon: Sparkles, title: "Qualidade selecionada", description: "Produtos escolhidos com critério técnico." },
  { icon: Headset, title: "Atendimento", description: "Suporte disponível para dúvidas sobre seu pedido." },
  { icon: Truck, title: "Experiência premium", description: "Do primeiro clique até a entrega." },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-border py-16">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
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

import type { Metadata } from "next";
import { HelpCircle, ListChecks, MessageCircle, MonitorSmartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buildWhatsAppSupportUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Atendimento FusionXit: tire dúvidas sobre plataforma, requisitos e compatibilidade dos produtos digitais antes e depois da compra.",
};

const SUPPORT_MESSAGE = "Olá! Preciso de suporte com um produto digital da FusionXit.";

const TOPICS = [
  {
    icon: MonitorSmartphone,
    title: "Antes de comprar",
    description:
      "Confirmação de plataforma, requisitos e compatibilidade com o seu aparelho.",
  },
  {
    icon: ListChecks,
    title: "Acesso ao produto",
    description: "Dúvidas sobre as instruções de acesso e sobre o que você recebe.",
  },
  {
    icon: HelpCircle,
    title: "Acompanhamento do pedido",
    description: "Situação do pedido e dúvidas após a confirmação da compra.",
  },
];

export default function SupportPage() {
  const whatsappUrl = buildWhatsAppSupportUrl(SUPPORT_MESSAGE);

  return (
    <Container className="flex max-w-3xl flex-col gap-8 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Suporte" }]} />
        <h1 className="font-display text-h2 text-foreground sm:text-h1">Suporte</h1>
        <p className="text-body text-foreground-secondary">
          Fale com a FusionXit para confirmar se um produto atende ao seu aparelho ou
          para acompanhar um pedido já realizado.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-h4 text-foreground">Canal de atendimento</h2>
        {whatsappUrl ? (
          <>
            <p className="text-body-sm text-foreground-secondary">
              O atendimento é feito por WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-button font-semibold text-accent-foreground transition-colors duration-fast hover:bg-accent-hover sm:w-auto sm:self-start"
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </>
        ) : (
          <p className="text-body-sm text-foreground-muted">
            [O canal oficial de atendimento será exibido aqui assim que a FusionXit
            informar o número. Nenhum contato é publicado sem confirmação.]
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-h4 text-foreground">Com o que podemos ajudar</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-5"
            >
              <topic.icon className="size-5 text-accent" aria-hidden="true" />
              <span className="text-body font-medium text-foreground">{topic.title}</span>
              <p className="text-body-sm text-foreground-muted">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-background-secondary p-5">
        <span className="text-label uppercase tracking-wide text-foreground-muted">
          Para agilizar o atendimento
        </span>
        <ul className="flex flex-col gap-2 text-body-sm text-foreground-secondary">
          <li>Informe o nome do produto e a plataforma (Android, iPhone ou PC).</li>
          <li>Descreva o modelo do aparelho ou a configuração do PC.</li>
          <li>Se já comprou, tenha em mãos os dados do pedido.</li>
        </ul>
      </div>
    </Container>
  );
}

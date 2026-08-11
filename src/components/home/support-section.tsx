import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buildWhatsAppSupportUrl } from "@/lib/whatsapp";

const SUPPORT_MESSAGE =
  "Olá! Tenho uma dúvida sobre os produtos digitais da FusionXit.";

/**
 * Seção de suporte da Home.
 *
 * O canal de WhatsApp vem de `NEXT_PUBLIC_WHATSAPP_NUMBER` (config
 * centralizada em src/config/whatsapp.ts). Sem número configurado, nenhum
 * link falso é exibido: a seção direciona para a página de atendimento.
 */
export function SupportSection() {
  const whatsappUrl = buildWhatsAppSupportUrl(SUPPORT_MESSAGE);

  return (
    <section id="suporte" className="border-b border-border py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 120% at 100% 0%, rgb(var(--color-accent) / 0.14), transparent 65%)",
            }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-label uppercase tracking-[0.14em] text-accent">Suporte</span>
              <h2 className="max-w-lg font-display text-h3 text-foreground sm:text-h2">
                Dúvida antes de comprar? Fale com a gente.
              </h2>
              <p className="max-w-lg text-body text-foreground-secondary">
                Atendimento para confirmar plataforma, requisitos e compatibilidade — e
                para acompanhar seu pedido depois da compra.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 text-button font-semibold text-accent-foreground transition-colors duration-fast hover:bg-accent-hover"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              ) : null}
              <Link
                href="/contato"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border-strong px-6 text-button font-semibold text-foreground transition-colors duration-fast hover:border-accent hover:text-accent"
              >
                Central de atendimento
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-fast group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

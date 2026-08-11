import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * FAQ em `<details>/<summary>` nativo: acessível por teclado e funcional
 * sem JavaScript, sem custo de bundle no cliente.
 *
 * As respostas descrevem apenas o funcionamento da loja. Prazos, políticas
 * de reembolso e regras comerciais só entram aqui quando forem definidos
 * oficialmente pela FusionXit.
 */
const FAQ_ITEMS = [
  {
    question: "Os produtos são digitais?",
    answer:
      "Sim. Nada é enviado fisicamente. Cada produto informa como o acesso é entregue e o que você recebe após a confirmação do pedido.",
  },
  {
    question: "Como sei se funciona no meu aparelho?",
    answer:
      "Todo produto é publicado para uma plataforma específica — Android, iPhone ou PC — e traz a seção “Antes de comprar”, com requisitos e compatibilidade. Na dúvida, fale com o suporte antes de finalizar.",
  },
  {
    question: "O que exatamente a FusionXit vende?",
    answer:
      "Guias de configuração, materiais de otimização do próprio aparelho, mentoria, análise de gameplay e conteúdo para criadores. Não vendemos nada que altere o jogo, automatize ações ou interfira em sistemas de segurança.",
  },
  {
    question: "Como recebo o acesso depois de comprar?",
    answer:
      "As instruções de acesso estão descritas na página de cada produto, em “Como você recebe”, e são enviadas pelo canal de atendimento após a confirmação do pedido.",
  },
  {
    question: "Posso falar com alguém antes de comprar?",
    answer:
      "Pode. A seção de suporte leva ao canal de atendimento para tirar dúvidas sobre plataforma, requisitos e compatibilidade.",
  },
];

export function FaqSection() {
  return (
    <section className="border-b border-border py-14 sm:py-16">
      <Container className="flex flex-col gap-8">
        <SectionHeader eyebrow="Dúvidas frequentes" title="FAQ" />
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-surface transition-colors duration-base hover:border-border-strong"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-body font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="size-4 shrink-0 text-foreground-muted transition-transform duration-base group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-body-sm text-foreground-secondary">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

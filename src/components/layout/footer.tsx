import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PLATFORM_LIST } from "@/domain/product/platform";

const FOOTER_COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Produtos", href: "/produtos" },
    ],
  },
  {
    title: "Plataformas",
    links: PLATFORM_LIST.map((meta) => ({
      label: meta.label,
      href: `/categoria/${meta.categorySlug}`,
    })),
  },
  {
    title: "Atendimento",
    links: [
      { label: "Suporte", href: "/contato" },
      { label: "Entrega digital", href: "/entrega" },
      { label: "Trocas e devoluções", href: "/trocas-devolucoes" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre a FusionXit", href: "/sobre" },
      { label: "Política de privacidade", href: "/privacidade" },
      { label: "Termos de uso", href: "/termos" },
    ],
  },
];

/**
 * Footer base. Deliberadamente sem CNPJ, endereço, telefone, e-mail ou
 * redes sociais — nenhum desses dados foi fornecido oficialmente pela
 * FusionXit; serão adicionados quando disponíveis.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      <Container>
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <span className="font-display text-h4 font-semibold text-foreground">FUSIONXIT</span>
            <p className="text-body-sm text-foreground-muted">
              Produtos e serviços digitais para jogadores de Free Fire.
            </p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-label text-foreground-secondary">{column.title}</span>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-border py-6 text-caption text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {year} FusionXit. Todos os direitos reservados.</span>
          <span>Produtos digitais — nenhum item é enviado fisicamente.</span>
        </div>
      </Container>
    </footer>
  );
}

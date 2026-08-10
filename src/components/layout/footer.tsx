import Link from "next/link";
import { Container } from "@/components/ui/container";

const FOOTER_COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Produtos", href: "/produtos" },
      { label: "Ofertas", href: "/produtos?promocao=1" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Contato", href: "/contato" },
      { label: "Trocas e devoluções", href: "/trocas-devolucoes" },
      { label: "Entrega", href: "/entrega" },
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
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <span className="font-display text-h4 font-semibold text-foreground">FUSIONXIT</span>
            <p className="text-body-sm text-foreground-muted">
              Tecnologia. Performance. Evolução.
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
        </div>
      </Container>
    </footer>
  );
}

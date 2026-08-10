import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Admin FusionXit",
  robots: { index: false, follow: false },
};

const ADMIN_LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Produtos", href: "/admin/produtos" },
];

/**
 * Layout do admin. Não herda Header/Footer/CartDrawer do grupo (site).
 * O aviso abaixo é permanente e deliberado: esta área NÃO possui
 * autenticação real. Qualquer pessoa com a URL acessa — proteção de
 * verdade só existe quando houver backend/autenticação real (ver item 8
 * do handoff de arquitetura).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-warning/30 bg-warning/10 px-4 py-2 text-center text-caption text-warning">
        <span className="inline-flex items-center gap-1.5">
          <AlertTriangle className="size-3.5" aria-hidden="true" />
          Área administrativa local/demonstrativa — sem autenticação real. Não usar com dados sensíveis reais.
        </span>
      </div>
      <header className="border-b border-border">
        <Container className="flex h-16 items-center gap-8">
          <Link href="/admin" className="font-display text-h4 font-semibold text-foreground">
            FusionXit Admin
          </Link>
          <nav className="flex gap-6" aria-label="Navegação administrativa">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-foreground-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </header>
      <Container className="py-8">{children}</Container>
    </div>
  );
}

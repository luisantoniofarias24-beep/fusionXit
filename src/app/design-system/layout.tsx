import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — Ferramenta interna",
  robots: { index: false, follow: false },
};

/**
 * Layout isolado do Design Lab: não inclui Header/Footer/CartDrawer do
 * grupo (site) porque esta rota é uma ferramenta interna de
 * desenvolvimento, não parte da navegação comercial (item 40 do briefing).
 * Fontes e tokens já vêm do layout raiz — nada é reimportado aqui.
 */
export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}

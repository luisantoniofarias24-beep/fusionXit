import type { Metadata } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import { ToastViewport } from "@/components/ui/toast";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fusionxit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FusionXit — Tecnologia. Performance. Evolução.",
    template: "%s | FusionXit",
  },
  description: "Produtos de tecnologia selecionados para quem exige mais.",
};

/**
 * Layout raiz: apenas o essencial compartilhado por TODAS as rotas
 * (site comercial, admin e design-system). Header/Footer/CartDrawer
 * pertencem ao layout do grupo `(site)`, para não vazar para o admin
 * nem para o Design Lab interno.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}

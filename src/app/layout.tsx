import type { Metadata } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import { ToastViewport } from "@/components/ui/toast";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fusionxit.com";

const siteDescription =
  "Loja digital de produtos e serviços para jogadores de Free Fire: guias de configuração, otimização, mentoria e conteúdo para Android, iPhone e PC.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FusionXit — Produtos digitais para jogadores de Free Fire",
    template: "%s | FusionXit",
  },
  description: siteDescription,
  keywords: [
    "Free Fire",
    "produtos digitais",
    "guia de sensibilidade",
    "configuração Android",
    "configuração iPhone",
    "emulador PC",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "FusionXit",
    url: siteUrl,
    title: "FusionXit — Produtos digitais para jogadores de Free Fire",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "FusionXit — Produtos digitais para jogadores de Free Fire",
    description: siteDescription,
  },
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

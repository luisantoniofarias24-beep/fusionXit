import { Manrope, Inter } from "next/font/google";

/**
 * Tipografia da FusionXit.
 *
 * Display — Manrope: geométrica, moderna, com peso técnico-premium sem
 * ser decorativa. Usada em Display/H1/H2 e no logo.
 *
 * Body — Inter: alta legibilidade em blocos de texto, preços e UI densa
 * (catálogo, admin, formulários). Referência de mercado para e-commerce.
 *
 * Ambas carregadas via next/font (self-hosted pelo Next.js, sem layout
 * shift de fonte externa e sem custo de privacidade de terceiros).
 */
export const fontDisplay = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

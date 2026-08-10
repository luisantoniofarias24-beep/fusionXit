import type { Config } from "tailwindcss";

/**
 * Tailwind config da FusionXit.
 *
 * Todas as cores de marca são lidas de CSS custom properties definidas em
 * `src/app/globals.css` (ver seção "DESIGN TOKENS"). Isso permite:
 *  - um único ponto central de alteração visual;
 *  - preparação futura para Light Mode (bastaria sobrescrever as variáveis
 *    sob um seletor `.light`, sem tocar nos componentes);
 *  - nenhum hexadecimal solto dentro de componentes.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        "background-secondary":
          "rgb(var(--color-background-secondary) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--color-surface-hover) / <alpha-value>)",
        "surface-elevated":
          "rgb(var(--color-surface-elevated) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        "foreground-secondary":
          "rgb(var(--color-foreground-secondary) / <alpha-value>)",
        "foreground-muted":
          "rgb(var(--color-foreground-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        "border-strong": "rgb(var(--color-border-strong) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "accent-foreground":
          "rgb(var(--color-accent-foreground) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" }],
        display: ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
        h1: ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        h2: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        label: ["0.8125rem", { lineHeight: "1.3", fontWeight: "500" }],
        button: ["0.9375rem", { lineHeight: "1", fontWeight: "600" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
        pill: "999px",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        elevated: "0 8px 24px -8px rgb(0 0 0 / 0.5)",
        overlay: "0 24px 64px -16px rgb(0 0 0 / 0.65)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;

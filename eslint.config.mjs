import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  // Artefatos de build não são código-fonte: sem isto, `npm run lint`
  // executado depois de `npm run build` passa a analisar `.next/`.
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];

export default eslintConfig;

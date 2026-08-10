import type { NextConfig } from "next";

/**
 * Configuração do Next.js para a FusionXit.
 *
 * reactStrictMode: mantém checagens extras de desenvolvimento.
 * images.formats: prioriza AVIF/WebP para produtos.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

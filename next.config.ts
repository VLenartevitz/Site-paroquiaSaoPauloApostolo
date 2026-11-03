import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática (deploy em hospedagens como Netlify, hospedagens
  // compartilhadas etc.). Os HTMLs finais são gerados na pasta `out/`.
  output: "export",
  // Gera cada página como "pasta/index.html" (ex.: horarios/index.html),
  // formato que a Netlify e demais hospedagens estáticas servem nativamente.
  trailingSlash: true,
  // cacheComponents/partialPrefetching exigem servidor Node e não funcionam
  // com exportação estática — desativados de propósito.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

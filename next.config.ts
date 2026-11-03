import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo servidor (necessário para o painel /admin + banco de dados).
  // A cartel de páginas é mantida em cache pelo Next; edições do painel
  // revalidam as páginas alteradas na hora.
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

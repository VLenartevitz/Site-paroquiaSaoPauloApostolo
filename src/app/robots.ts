import type { MetadataRoute } from "next";

// Necessário para "output: export"
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // painel de administração não é indexado
      disallow: "/admin",
    },
  };
}

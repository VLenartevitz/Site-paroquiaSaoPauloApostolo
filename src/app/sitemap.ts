import type { MetadataRoute } from "next";

// Necessário para "output: export"
export const dynamic = "force-static";

// TODO: trocar pela URL definitiva quando o domínio do site for definido
const SITE_URL = "https://saopauloapostolopariquera.exemplo.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    "",
    "/paroquia",
    "/padroeiro",
    "/comunidades",
    "/horarios",
    "/sacramentos",
    "/sacramentos/batismo",
    "/sacramentos/eucaristia",
    "/sacramentos/crisma",
    "/sacramentos/matrimonio",
    "/sacramentos/confissao",
    "/sacramentos/uncao-dos-enfermos",
    "/pastorais",
    "/noticias",
    "/oracoes",
    "/vela-virtual",
    "/dizimo",
    "/contato",
  ];

  return rotas.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.7,
  }));
}

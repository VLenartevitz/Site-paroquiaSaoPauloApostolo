import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getSacramentos } from "@/lib/repositorio";
import { salvarSacramentos } from "../acoes";
import ListaEditor, { type CampoEditor } from "@/components/admin/ListaEditor";
import { Banner, BotaoSalvar } from "@/components/admin/ui";

export default async function AdminSacramentosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const sacramentos = await getSacramentos();

  const campos: CampoEditor[] = [
    { nome: "nome", rotulo: "Nome", dica: "ex.: Batismo" },
    { nome: "slug", rotulo: "Slug (URL)", dica: "ex.: batismo â€” nÃ£o mexa por seguranÃ§a dos links" },
    { nome: "emoji", rotulo: "Ãcone (emoji)", dica: "ex.: ðŸ•Šï¸" },
    {
      nome: "resumo",
      rotulo: "Resumo",
      tipo: "textoLongo",
      largura: "inteira",
      dica: "explicaÃ§Ã£o breve do sacramento",
    },
    {
      nome: "comoAgendar",
      rotulo: "Como agendar",
      tipo: "linhas",
      largura: "inteira",
      dica: "uma etapa por linha",
    },
    {
      nome: "documentos",
      rotulo: "Documentos",
      tipo: "linhas",
      largura: "inteira",
      dica: "um documento por linha",
    },
    {
      nome: "observacoes",
      rotulo: "ObservaÃ§Ãµes",
      tipo: "linhas",
      largura: "inteira",
      dica: "uma observaÃ§Ã£o por linha",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        Sacramentos
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Cada sacramento tem sua prÃ³pria pÃ¡gina no site (Batismo, Eucaristia,
        Crisma, MatrimÃ´nioâ€¦).
      </p>

      <form action={salvarSacramentos} className="space-y-6">
        <ListaEditor
          campos={campos}
          nomeCampo="sacramentos"
          rotuloAdicionar="sacramento"
          itensIniciais={sacramentos.map((s) => ({
            nome: s.nome,
            slug: s.slug,
            emoji: s.emoji,
            resumo: s.resumo,
            comoAgendar: s.comoAgendar.join("\n"),
            documentos: s.documentos.join("\n"),
            observacoes: s.observacoes.join("\n"),
          }))}
        />

        <BotaoSalvar />
      </form>
    </div>
  );
}

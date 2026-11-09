import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getOracoes } from "@/lib/repositorio";
import { salvarOracoes } from "../acoes";
import ListaEditor, { type CampoEditor } from "@/components/admin/ListaEditor";
import { Banner, BotaoSalvar, CampoArea, Campo } from "@/components/admin/ui";

export default async function AdminOracoesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const { basicas, padroeiro } = await getOracoes();

  const campos: CampoEditor[] = [
    { nome: "titulo", rotulo: "TÃ­tulo da oraÃ§Ã£o" },
    {
      nome: "paragrafos",
      rotulo: "Texto",
      tipo: "linhas",
      largura: "inteira",
      dica: "um parÃ¡grafo por linha",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        OraÃ§Ãµes
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        OraÃ§Ãµes bÃ¡sicas e a oraÃ§Ã£o da parÃ³quia (pÃ¡gina OraÃ§Ãµes).
      </p>

      <form action={salvarOracoes} className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-brand-800">
            OraÃ§Ã£o ao padroeiro
          </h2>
          <div className="mt-3 grid gap-4">
            <Campo
              rotulo="TÃ­tulo"
              nome="tituloPadroeiro"
              valor={padroeiro.titulo}
            />
            <CampoArea
              rotulo="Texto"
              nome="paragrafosPadroeiro"
              valor={padroeiro.paragrafos.join("\n")}
              linhas={6}
              dica="um parÃ¡grafo por linha"
            />
          </div>
        </section>

        <section>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-800">
            OraÃ§Ãµes bÃ¡sicas
          </h2>
          <ListaEditor
            campos={campos}
            nomeCampo="basicas"
            rotuloAdicionar="oraÃ§Ã£o"
            itensIniciais={basicas.map((o) => ({
              titulo: o.titulo,
              paragrafos: o.paragrafos.join("\n"),
            }))}
          />
        </section>

        <BotaoSalvar />
      </form>
    </div>
  );
}

import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getComunidades } from "@/lib/repositorio";
import { salvarComunidades } from "../acoes";
import ListaEditor, { type CampoEditor } from "@/components/admin/ListaEditor";
import { Banner, BotaoSalvar, CampoArea } from "@/components/admin/ui";

export default async function AdminComunidadesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const { lista, nota } = await getComunidades();

  const campos: CampoEditor[] = [
    { nome: "nome", rotulo: "Nome", dica: "ex.: Igreja Matriz" },
    { nome: "padroeiro", rotulo: "Padroeiro(a)", dica: "ex.: SÃ£o SebastiÃ£o" },
    {
      nome: "endereco",
      rotulo: "EndereÃ§o",
      largura: "inteira",
    },
    {
      nome: "horarios",
      rotulo: "HorÃ¡rios prÃ³prios",
      tipo: "linhas",
      largura: "inteira",
      dica: "uma linha por horÃ¡rio",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        Comunidades e capelas
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Lista exibida na pÃ¡gina Comunidades.
      </p>

      <form action={salvarComunidades} className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-brand-800">
            Nota da pÃ¡gina
          </h2>
          <div className="mt-3">
            <CampoArea
              rotulo="Texto de orientaÃ§Ã£o"
              nome="nota"
              valor={nota}
              linhas={4}
            />
          </div>
        </section>

        <section>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-800">
            Comunidades
          </h2>
          <ListaEditor
            campos={campos}
            nomeCampo="lista"
            rotuloAdicionar="comunidade"
            itensIniciais={lista.map((c) => ({
              nome: c.nome,
              padroeiro: c.padroeiro,
              endereco: c.endereco,
              horarios: c.horarios.join("\n"),
            }))}
          />
        </section>

        <BotaoSalvar />
      </form>
    </div>
  );
}

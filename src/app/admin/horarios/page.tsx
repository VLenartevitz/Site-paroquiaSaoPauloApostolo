import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getMissas, getConfissoes, getProgramacao } from "@/lib/repositorio";
import { salvarHorarios } from "../acoes";
import ListaEditor, { type CampoEditor } from "@/components/admin/ListaEditor";
import { Banner, BotaoSalvar, CampoLinhas } from "@/components/admin/ui";

export default async function AdminHorariosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const [missas, confissoes, programacao] = await Promise.all([
    getMissas(),
    getConfissoes(),
    getProgramacao(),
  ]);

  const camposMissa: CampoEditor[] = [
    { nome: "dia", rotulo: "Dia", dica: "ex.: Domingo" },
    {
      nome: "horarios",
      rotulo: "HorÃ¡rios",
      tipo: "linhas",
      dica: "um por linha",
      placeholder: "8h\n19h",
    },
    {
      nome: "observacao",
      rotulo: "ObservaÃ§Ã£o (opcional)",
      largura: "inteira",
    },
  ];

  const camposProgramacao: CampoEditor[] = [
    { nome: "dia", rotulo: "Dia", dica: "ex.: Quarta-feira" },
    {
      nome: "itens",
      rotulo: "Atividades",
      tipo: "linhas",
      largura: "inteira",
      dica: "uma atividade por linha",
      placeholder: "Santa Missa â€“ 19h30\nCatequese â€“ consulte a secretaria",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        HorÃ¡rios
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Missas de fim de semana, confissÃµes e programaÃ§Ã£o da semana (pÃ¡gina
        HorÃ¡rios e pÃ¡gina inicial).
      </p>

      <form action={salvarHorarios} className="space-y-8">
        <section>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-800">
            Missas de fim de semana
          </h2>
          <ListaEditor
            campos={camposMissa}
            nomeCampo="missas"
            rotuloAdicionar="missa"
            itensIniciais={missas.map((m) => ({
              dia: m.dia,
              horarios: m.horarios.join("\n"),
              observacao: m.observacao ?? "",
            }))}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-brand-800">
            ConfissÃµes
          </h2>
          <div className="mt-3">
            <CampoLinhas
              rotulo="Linhas de confissÃ£o"
              nome="confissoes"
              itens={confissoes}
              dica="uma informaÃ§Ã£o por linha"
            />
          </div>
        </section>

        <section>
          <h2 className="font-display mb-3 text-lg font-semibold text-brand-800">
            ProgramaÃ§Ã£o da semana
          </h2>
          <ListaEditor
            campos={camposProgramacao}
            nomeCampo="programacao"
            rotuloAdicionar="dia"
            itensIniciais={programacao.map((p) => ({
              dia: p.dia,
              itens: p.itens.join("\n"),
            }))}
          />
        </section>

        <BotaoSalvar />
      </form>
    </div>
  );
}

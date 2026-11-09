import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getPastorais } from "@/lib/repositorio";
import { salvarPastorais } from "../acoes";
import ListaEditor, { type CampoEditor } from "@/components/admin/ListaEditor";
import { Banner, BotaoSalvar } from "@/components/admin/ui";

export default async function AdminPastoraisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const pastorais = await getPastorais();

  const campos: CampoEditor[] = [
    { nome: "nome", rotulo: "Nome", dica: "ex.: Catequese" },
    { nome: "emoji", rotulo: "Ãcone (emoji)", dica: "ex.: ðŸ“–" },
    {
      nome: "descricao",
      rotulo: "DescriÃ§Ã£o",
      tipo: "textoLongo",
      largura: "inteira",
    },
    {
      nome: "encontros",
      rotulo: "Encontros",
      largura: "inteira",
      dica: "ex.: Semanais â€” consulte a coordenaÃ§Ã£o",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        Pastorais e movimentos
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Lista exibida na pÃ¡gina Pastorais.
      </p>

      <form action={salvarPastorais} className="space-y-6">
        <ListaEditor
          campos={campos}
          nomeCampo="pastorais"
          rotuloAdicionar="pastoral"
          itensIniciais={pastorais.map((p) => ({
            nome: p.nome,
            emoji: p.emoji,
            descricao: p.descricao,
            encontros: p.encontros,
          }))}
        />

        <BotaoSalvar />
      </form>
    </div>
  );
}

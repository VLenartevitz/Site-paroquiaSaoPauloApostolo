import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getNoticias } from "@/lib/repositorio";
import { salvarNoticias } from "../acoes";
import ListaEditor, { type CampoEditor } from "@/components/admin/ListaEditor";
import { Banner, BotaoSalvar } from "@/components/admin/ui";

export default async function AdminNoticiasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const noticias = await getNoticias();

  const campos: CampoEditor[] = [
    { nome: "titulo", rotulo: "TÃ­tulo", largura: "inteira" },
    { nome: "data", rotulo: "Data", tipo: "data", dica: "AAAA-MM-DD" },
    {
      nome: "categoria",
      rotulo: "Categoria",
      tipo: "lista",
      opcoes: ["ParÃ³quia", "Diocese", "Igreja", "Aviso"],
      dica: "â€œAvisoâ€ tambÃ©m aparece na pÃ¡gina inicial",
    },
    { nome: "slug", rotulo: "Slug (URL)", dica: "deixe vazio para gerar" },
    {
      nome: "resumo",
      rotulo: "Resumo",
      tipo: "textoLongo",
      largura: "inteira",
      dica: "1 ou 2 frases que resumem a notÃ­cia",
    },
    {
      nome: "corpo",
      rotulo: "Texto da notÃ­cia",
      tipo: "linhas",
      largura: "inteira",
      dica: "um parÃ¡grafo por linha",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        NotÃ­cias e avisos
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        As notÃ­cias mais recentes aparecem na pÃ¡gina NotÃ­cias; as marcadas como
        â€œAvisoâ€ tambÃ©m entram na pÃ¡gina inicial.
      </p>

      <form action={salvarNoticias} className="space-y-6">
        <ListaEditor
          campos={campos}
          nomeCampo="noticias"
          rotuloAdicionar="notÃ­cia"
          itensIniciais={noticias.map((n) => ({
            titulo: n.titulo,
            slug: n.slug,
            data: n.data,
            categoria: n.categoria,
            resumo: n.resumo,
            corpo: n.corpo.join("\n"),
          }))}
        />

        <BotaoSalvar />
      </form>
    </div>
  );
}

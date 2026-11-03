import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getNoticias } from "@/lib/repositorio";
import { getDataFormatada } from "@/data/noticias";

export const metadata: Metadata = {
  title: "Notícias e Avisos",
  description: "Notícias, avisos e comunicados da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP.",
};

export default async function NoticiasPage() {
  const noticias = await getNoticias();
  const avisos = noticias.filter((n) => n.categoria === "Aviso");
  const demais = noticias.filter((n) => n.categoria !== "Aviso");

  return (
    <>
      <PageHeader
        titulo="Notícias e Avisos"
        subtitulo="O que está acontecendo na nossa comunidade"
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-800">
          ⚠️ As notícias abaixo são <strong>exemplos</strong> para demonstrar o
          layout do site. Assim que a equipe da paróquia enviar as notícias
          reais, elas substituem estes textos (arquivo{" "}
          <code className="rounded bg-amber-100 px-1">src/data/noticias.ts</code>).
        </div>

        {avisos.length > 0 && (
          <>
            <h2 className="font-display mt-12 text-3xl font-semibold text-brand-800">
              Avisos paroquiais
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {avisos.map((a) => (
                <article
                  key={a.slug}
                  className="rounded-2xl border-l-4 border-l-gold-500 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {getDataFormatada(a.data)} · Aviso
                  </p>
                  <h3 className="font-display mt-1 text-xl font-semibold text-brand-800">
                    {a.titulo}
                  </h3>
                  {a.corpo.map((p, i) => (
                    <p key={i} className="mt-2 text-sm leading-relaxed text-slate-600">
                      {p}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </>
        )}

        <h2 className="font-display mt-12 text-3xl font-semibold text-brand-800">
          Notícias
        </h2>
        <div className="mt-5 space-y-5">
          {demais.map((n) => (
            <article
              key={n.slug}
              className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                {getDataFormatada(n.data)} · {n.categoria}
              </p>
              <h3 className="font-display mt-1 text-2xl font-semibold text-brand-800">
                {n.titulo}
              </h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                {n.corpo.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

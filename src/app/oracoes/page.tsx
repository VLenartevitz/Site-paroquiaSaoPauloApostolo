import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getOracoes } from "@/lib/repositorio";

export const metadata: Metadata = {
  title: "Orações",
  description: "Orações básicas da Igreja Católica e oração a São Paulo Apóstolo, padroeiro da paróquia de Pariquera-Açu/SP.",
};

export default async function OracoesPage() {
  const oracoes = await getOracoes();
  const oracoesBasicas = oracoes.basicas;
  const oracaoSaoPaulo = oracoes.padroeiro;
  return (
    <>
      <PageHeader
        titulo="Orações"
        subtitulo="Orações para alimentar sua vida de fé todos os dias"
      />

      <section className="mx-auto max-w-4xl px-4 py-14">
        {/* Padroeiro em destaque */}
        <article className="rounded-2xl bg-linear-to-br from-brand-900 to-brand-700 p-8 text-white shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-gold-300">
            {oracaoSaoPaulo.titulo}
          </h2>
          <div className="mt-4 space-y-3 leading-relaxed text-brand-100/90">
            {oracaoSaoPaulo.paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>

        <h2 className="font-display mt-12 text-3xl font-semibold text-brand-800">
          Orações básicas
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {oracoesBasicas.map((o) => (
            <article
              key={o.titulo}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="font-display text-xl font-semibold text-brand-800">
                🙏 {o.titulo}
              </h3>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {o.paragrafos.map((p, i) => (
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

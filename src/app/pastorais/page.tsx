import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { pastorais } from "@/data/pastorais";
import { paroquia } from "@/data/paroquia";

export const metadata: Metadata = {
  title: "Pastorais e Movimentos",
  description: "Pastorais, movimentos e grupos de oração da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP.",
};

export default function PastoraisPage() {
  return (
    <>
      <PageHeader
        titulo="Pastorais e Movimentos"
        subtitulo="Cada fiel é chamado a servir — encontre o seu lugar na missão da Igreja"
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pastorais.map((p) => (
            <article
              key={p.nome}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl">{p.emoji}</span>
              <h2 className="font-display mt-2 text-xl font-semibold text-brand-800">
                {p.nome}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {p.descricao}
              </p>
              <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                🗓️ Encontros: {p.encontros}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-brand-800 p-8 text-white">
          <h2 className="font-display text-2xl font-semibold text-gold-300">
            Quer fazer parte de uma pastoral?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-100/85">
            Procure a secretaria paroquial ou o coordenador da pastoral que
            você sentiu o chamado. A Igreja cresce quando cada um oferece
            seus dons a serviço da comunidade.
          </p>
          <a
            href={paroquia.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-gold-400"
          >
            Quero participar
          </a>
        </div>
      </section>
    </>
  );
}

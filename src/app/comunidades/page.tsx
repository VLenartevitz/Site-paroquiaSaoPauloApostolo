import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getComunidades, getParoquia } from "@/lib/repositorio";

export const metadata: Metadata = {
  title: "Comunidades e Capelas",
  description: "Igreja Matriz e capelas da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP.",
};

export default async function ComunidadesPage() {
  const [paroquia, comunidadesDoc] = await Promise.all([
    getParoquia(),
    getComunidades(),
  ]);
  const comunidades = comunidadesDoc.lista;
  const notaComunidades = comunidadesDoc.nota;
  return (
    <>
      <PageHeader
        titulo="Comunidades e Capelas"
        subtitulo="A paróquia é uma só família, presente em vários pontos da cidade e da região"
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {comunidades.map((c) => (
            <article
              key={c.nome}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span className="text-2xl">⛪</span>
              <h2 className="font-display mt-2 text-xl font-semibold text-brand-800">
                {c.nome}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>👑 {c.padroeiro}</li>
                <li>📍 {c.endereco}</li>
                {c.horarios.map((h) => (
                  <li key={h}>⏰ {h}</li>
                ))}
              </ul>
            </article>
          ))}

          {/* Card futuro para próximas capelas */}
          <article className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            <span className="text-2xl">➕</span>
            <p className="font-display mt-2 text-lg font-semibold text-slate-500">
              Capelas e comunidades
            </p>
            <p className="mt-2 text-sm text-slate-500">{notaComunidades}</p>
          </article>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-brand-800">
            Localização da Matriz
          </h2>
          <p className="mt-2 text-sm text-slate-600">{paroquia.endereco}</p>
          <div className="mt-4 overflow-hidden rounded-xl">
            <iframe
              title="Mapa da Igreja Matriz"
              src={paroquia.mapsEmbedUrl}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

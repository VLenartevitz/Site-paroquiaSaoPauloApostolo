import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { paroquia } from "@/data/paroquia";

export const metadata: Metadata = {
  title: "Nossa Paróquia",
  description: "História, pároco e vida da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP, da Diocese de Registro.",
};

export default function ParoquiaPage() {
  return (
    <>
      <PageHeader
        titulo="Nossa Paróquia"
        subtitulo="Uma comunidade a serviço da fé, da esperança e da caridade no interior do Vale do Ribeira"
      />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <article className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-brand-800">
            Quem somos
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
            <p>
              A Paróquia São Paulo Apóstolo, sediada em {paroquia.cidade}/
              {paroquia.estado}, pertence à {paroquia.diocese} e tem como
              padroeiro São Paulo Apóstolo, o grande missionário que levou o
              Evangelho ao mundo inteiro.
            </p>
            <p>
              Nossa comunidade vive da oração, das celebrações, das pastorais e
              do trabalho silencioso de tantas famílias que doam seu tempo para servir aos
              irmãos, cuidando dos enfermos, educando as crianças e animando a liturgia.
            </p>
            <p className="rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-800">
              ⚠️ Esta página ainda será completada com a história detalhada da
              paróquia (data de criação, vigários anteriores, obras e datas
              importantes). As informações faltantes devem ser fornecidas
              pela secretaria paroquial.
            </p>
          </div>
        </article>

        <article className="mt-8 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-brand-800">
            Clero
          </h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-900 font-display text-3xl font-semibold text-gold-300">
              GF
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-brand-800">
                {paroquia.paroco}
              </p>
              <p className="text-sm text-slate-500">Pároco</p>
              <p className="mt-1 text-sm text-slate-600">
                Atendimento na secretaria paroquial e celebrações conforme a
                programação da paróquia.
              </p>
            </div>
          </div>
        </article>

        <article className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/padroeiro"
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-2xl">📖</span>
            <p className="font-display mt-2 text-lg font-semibold text-brand-800">
              Nosso Padroeiro
            </p>
            <p className="mt-1 text-sm text-slate-500">
              A vida de São Paulo Apóstolo
            </p>
          </Link>
          <Link
            href="/comunidades"
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-2xl">⛪</span>
            <p className="font-display mt-2 text-lg font-semibold text-brand-800">
              Comunidades
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Matriz e capelas da paróquia
            </p>
          </Link>
          <Link
            href="/contato"
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-2xl">📍</span>
            <p className="font-display mt-2 text-lg font-semibold text-brand-800">
              Secretaria
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Horários e contato
            </p>
          </Link>
        </article>
      </section>
    </>
  );
}

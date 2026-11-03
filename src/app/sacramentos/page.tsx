import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { sacramentos } from "@/data/sacramentos";

export const metadata: Metadata = {
  title: "Sacramentos",
  description: "Orientações para agendar Batismo, Eucaristia, Crisma, Matrimônio, Confissão e Unção dos Enfermos na Paróquia São Paulo Apóstolo de Pariquera-Açu/SP.",
};

export default function SacramentosPage() {
  return (
    <>
      <PageHeader
        titulo="Sacramentos"
        subtitulo="Passo a passo para agendar cada celebração na nossa paróquia"
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sacramentos.map((s) => (
            <Link
              key={s.slug}
              href={`/sacramentos/${s.slug}`}
              className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-3xl">{s.emoji}</span>
              <h2 className="font-display mt-3 text-xl font-semibold text-brand-800 group-hover:text-brand-600">
                {s.nome}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {s.resumo}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-gold-600 group-hover:text-gold-700">
                Como agendar →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-brand-800 p-8 text-white">
          <h2 className="font-display text-2xl font-semibold text-gold-300">
            Precisa de ajuda?
          </h2>
          <p className="mt-2 text-sm text-brand-100/85">
            Todas as solicitações de sacramentos começam na secretaria
            paroquial, no horário de atendimento. Fale conosco pelo WhatsApp
            ou telefone para tirar dúvidas e combinar o melhor caminho para
            sua família.
          </p>
          <Link
            href="/contato"
            className="mt-4 inline-block rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-gold-400"
          >
            Contato da Secretaria
          </Link>
        </div>
      </section>
    </>
  );
}

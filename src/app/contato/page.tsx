import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { paroquia, contatoCards } from "@/data/paroquia";

export const metadata: Metadata = {
  title: "Contato e Secretaria",
  description: "Endereço, telefone, WhatsApp e horários da secretaria da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        titulo="Contato e Secretaria"
        subtitulo="Estamos à disposição para atender você e sua família"
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {contatoCards.map((card) => (
            <article
              key={card.titulo}
              className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
            >
              <h2 className="font-display text-xl font-semibold text-brand-800">
                {card.titulo}
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                {card.linhas.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-brand-800 p-8 text-white">
          <h2 className="font-display text-2xl font-semibold text-gold-300">
            Fale conosco pelo WhatsApp
          </h2>
          <p className="mt-2 text-sm text-brand-100/85">
            Sacramentos, avisos, pedidos de oração e informações em geral.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={paroquia.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25d366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Abrir WhatsApp
            </a>
            <a
              href={paroquia.telefoneLink}
              className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Ligar: {paroquia.telefone}
            </a>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <iframe
            title="Mapa — Paróquia São Paulo Apóstolo de Pariquera-Açu"
            src={paroquia.mapsEmbedUrl}
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";

type Vela = { id: number; intencao: string };

let contador = 0;

export default function VelaVirtual({
  telefone,
  whatsappUrl,
}: {
  telefone: string;
  whatsappUrl: string;
}) {
  const [velas, setVelas] = useState<Vela[]>([]);
  const [intencao, setIntencao] = useState("");

  function acender() {
    const texto = intencao.trim() || "Por intenções recebidas";
    const nova: Vela = { id: ++contador, intencao: texto };
    setVelas((v) => [...v, nova]);
    setIntencao("");
  }

  function apagar(id: number) {
    setVelas((v) => v.filter((vela) => vela.id !== id));
  }

  return (
    <div>
      {/* Capela */}
      <div className="rounded-2xl border border-brand-100 bg-gradient-to-b from-brand-950 to-brand-800 p-8 text-center text-white">
        <p className="font-display text-2xl font-semibold text-gold-300">
          Capela Virtual
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-100/85">
          Acenda sua vela em intenção de alguém, de uma graça ou de um
          agradecimento. Que sua oração se una a toda a comunidade.
        </p>

        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={intencao}
            maxLength={80}
            onChange={(e) => setIntencao(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && acender()}
            placeholder="Escreva sua intenção (opcional)"
            className="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/50 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <button
            type="button"
            onClick={acender}
            className="shrink-0 rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 shadow transition-colors hover:bg-gold-400"
          >
            🔥 Acender vela
          </button>
        </div>

        {/* Velas acesas */}
        <div className="mt-8 flex min-h-28 flex-wrap items-end justify-center gap-6">
          {velas.length === 0 && (
            <p className="pb-3 text-sm text-brand-100/60">
              Nenhuma vela acesa ainda — seja a primeira a acender 🕯️
            </p>
          )}
          {velas.map((vela) => (
            <button
              type="button"
              key={vela.id}
              onClick={() => apagar(vela.id)}
              title="Clique para apagar"
              className="group flex flex-col items-center"
            >
              {/* chama */}
              <span className="relative">
                <span
                  className="flame block h-5 w-3 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200"
                  aria-hidden="true"
                />
              </span>
              {/* corpo da vela */}
              <span className="mt-0.5 block h-10 w-2.5 rounded-sm bg-gradient-to-b from-brand-100 to-brand-300" />
              <span className="mt-2 block max-w-32 truncate text-[11px] text-brand-100/80 group-hover:text-white">
                {vela.intencao}
              </span>
              <span className="text-[10px] text-brand-100/40 group-hover:text-gold-300">
                apagar
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Suas intenções ficam apenas no seu aparelho (não são enviadas pela
        internet). Para um pedido real de oração ligue para {telefone}{" "}
        ou{" "}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-700 underline"
        >
          fale com a secretaria no WhatsApp
        </a>
        .
      </p>
    </div>
  );
}

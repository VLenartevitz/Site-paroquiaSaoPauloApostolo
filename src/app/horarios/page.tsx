import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { missas, confissoes, programacaoSemana, avisoHorarios } from "@/data/horarios";

export const metadata: Metadata = {
  title: "Horários de Missas",
  description: "Horários de missas, confissões e programação da semana da Paróquia São Paulo Apóstolo, em Pariquera-Açu/SP.",
};

export default function HorariosPage() {
  return (
    <>
      <PageHeader
        titulo="Horários de Missas"
        subtitulo="Celebrações e confissões na Igreja Matriz São Paulo Apóstolo"
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        {/* Missas */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {missas.map((m) => (
            <div
              key={m.dia}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                {m.dia}
              </p>
              <p className="font-display mt-2 text-3xl font-semibold text-brand-800">
                {m.horarios.join(" · ")}
              </p>
              {m.observacao && (
                <p className="mt-2 text-xs text-slate-500">{m.observacao}</p>
              )}
            </div>
          ))}
        </div>

        {/* Confissões */}
        <div className="mt-10 rounded-2xl border-l-4 border-l-gold-500 bg-white p-6 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-brand-800">
            Confissões
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
            {confissoes.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </div>

        {/* Programação da semana */}
        <h2 className="font-display mt-14 text-3xl font-semibold text-brand-800">
          Programação da Semana
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-800 text-white">
              <tr>
                <th className="px-5 py-3 font-medium">Dia</th>
                <th className="px-5 py-3 font-medium">Atividades e celebrações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programacaoSemana.map((d) => (
                <tr key={d.dia} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3 font-medium text-brand-800">{d.dia}</td>
                  <td className="px-5 py-3 text-slate-600">
                    {d.itens.length === 0
                      ? "—"
                      : d.itens.map((i) => <div key={i}>• {i}</div>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-800">
          ⚠️ {avisoHorarios}
        </p>
      </section>
    </>
  );
}

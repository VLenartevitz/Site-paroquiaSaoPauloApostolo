"use client";

import { useState } from "react";

/**
 * Editor de listas de conteúdo (missas, notícias, pastorais…).
 *
 * Roda no navegador: mantém os itens no estado e guarda a lista inteira
 * em um <input type="hidden"> como JSON, que a Server Action valida e
 * salva. Linhas multi-valores (ex.: horários) são separadas por \n.
 */
export type CampoEditor = {
  nome: string;
  rotulo: string;
  /** padrão: linha única de texto */
  tipo?: "texto" | "linhas" | "textoLongo" | "data" | "lista";
  opcoes?: string[];
  placeholder?: string;
  dica?: string;
  largura?: "inteira" | "metade";
};

type Item = Record<string, string>;

export default function ListaEditor({
  campos,
  itensIniciais,
  nomeCampo = "lista",
  rotuloAdicionar = "item",
}: {
  campos: CampoEditor[];
  itensIniciais: Item[];
  nomeCampo?: string;
  rotuloAdicionar?: string;
}) {
  const [itens, setItens] = useState<Item[]>(itensIniciais);

  function atualizar(indice: number, nome: string, valor: string) {
    setItens((atual) =>
      atual.map((item, i) => (i === indice ? { ...item, [nome]: valor } : item)),
    );
  }

  function adicionar() {
    setItens((atual) => [
      ...atual,
      Object.fromEntries(campos.map((c) => [c.nome, ""])),
    ]);
  }

  function remover(indice: number) {
    setItens((atual) => atual.filter((_, i) => i !== indice));
  }

  function mover(indice: number, delta: -1 | 1) {
    setItens((atual) => {
      const destino = indice + delta;
      if (destino < 0 || destino >= atual.length) return atual;
      const copia = [...atual];
      const [item] = copia.splice(indice, 1);
      copia.splice(destino, 0, item);
      return copia;
    });
  }

  return (
    <div className="space-y-4">
      {itens.map((item, indice) => (
        <fieldset
          key={indice}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
            {rotuloAdicionar} {indice + 1}
          </legend>

          <div className="flex items-center justify-end gap-1 pb-2">
            <button
              type="button"
              onClick={() => mover(indice, -1)}
              disabled={indice === 0}
              title="Mover para cima"
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => mover(indice, 1)}
              disabled={indice === itens.length - 1}
              title="Mover para baixo"
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 disabled:opacity-30"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => remover(indice)}
              title="Remover item"
              className="ml-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600"
            >
              Remover
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {campos.map((campo) => {
              const valor = item[campo.nome] ?? "";
              const tipo = campo.tipo ?? "texto";
              const largura =
                campo.largura === "inteira"
                  ? "sm:col-span-2"
                  : campo.largura === "metade"
                    ? "sm:col-span-1"
                    : "";
              const rotulo = (
                <label
                  htmlFor={`${nomeCampo}-${indice}-${campo.nome}`}
                  className="block text-xs font-semibold text-slate-600"
                >
                  {campo.rotulo}
                  {campo.dica && (
                    <span className="font-normal text-slate-400">
                      {" "}
                      — {campo.dica}
                    </span>
                  )}
                </label>
              );

              return (
                <div key={campo.nome} className={largura}>
                  {rotulo}
                  {tipo === "linhas" || tipo === "textoLongo" ? (
                    <textarea
                      id={`${nomeCampo}-${indice}-${campo.nome}`}
                      value={valor}
                      onChange={(e) =>
                        atualizar(indice, campo.nome, e.target.value)
                      }
                      rows={tipo === "textoLongo" ? 4 : 3}
                      placeholder={campo.placeholder}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                    />
                  ) : tipo === "lista" ? (
                    <select
                      id={`${nomeCampo}-${indice}-${campo.nome}`}
                      value={valor}
                      onChange={(e) =>
                        atualizar(indice, campo.nome, e.target.value)
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                    >
                      {campo.opcoes?.map((opcao) => (
                        <option key={opcao} value={opcao}>
                          {opcao}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`${nomeCampo}-${indice}-${campo.nome}`}
                      type={tipo === "data" ? "date" : "text"}
                      value={valor}
                      onChange={(e) =>
                        atualizar(indice, campo.nome, e.target.value)
                      }
                      placeholder={campo.placeholder}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={adicionar}
        className="rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
      >
        + Adicionar {rotuloAdicionar}
      </button>

      <input
        type="hidden"
        name={nomeCampo}
        value={JSON.stringify(itens)}
      />
    </div>
  );
}

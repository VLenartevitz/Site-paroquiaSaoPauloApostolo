import type { ReactNode } from "react";

/**
 * Peças de interface do painel /admin (Server Components).
 */

const classesInput =
  "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-white";

export function Campo({
  rotulo,
  nome,
  valor,
  tipo = "text",
  dica,
  placeholder,
}: {
  rotulo: string;
  nome: string;
  valor?: string;
  tipo?: "text" | "url" | "email";
  dica?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={nome} className="block text-xs font-semibold text-slate-600">
        {rotulo}
        {dica && <span className="font-normal text-slate-400"> — {dica}</span>}
      </label>
      <input
        id={nome}
        name={nome}
        type={tipo}
        defaultValue={valor ?? ""}
        placeholder={placeholder}
        className={classesInput}
      />
    </div>
  );
}

export function CampoArea({
  rotulo,
  nome,
  valor,
  linhas = 3,
  dica,
  placeholder,
}: {
  rotulo: string;
  nome: string;
  valor?: string;
  linhas?: number;
  dica?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={nome} className="block text-xs font-semibold text-slate-600">
        {rotulo}
        {dica && <span className="font-normal text-slate-400"> — {dica}</span>}
      </label>
      <textarea
        id={nome}
        name={nome}
        defaultValue={valor ?? ""}
        rows={linhas}
        placeholder={placeholder}
        className={classesInput}
      />
    </div>
  );
}

export function CampoLinhas({
  rotulo,
  nome,
  itens,
  dica,
}: {
  rotulo: string;
  nome: string;
  itens: string[];
  dica?: string;
}) {
  return (
    <CampoArea
      rotulo={rotulo}
      nome={nome}
      valor={itens.join("\n")}
      dica={dica ?? "um item por linha"}
      linhas={Math.max(3, Math.min(itens.length + 1, 8))}
    />
  );
}

export function BotaoSalvar() {
  return (
    <button
      type="submit"
      className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 sm:w-auto"
    >
      Salvar alterações
    </button>
  );
}

/** Banner de feedback lido dos parâmetros ?salvo=1 / ?erro=… */
export function Banner({
  salvo,
  erro,
}: {
  salvo?: string | string[] | undefined;
  erro?: string | string[] | undefined;
}) {
  const textoErro = Array.isArray(erro) ? erro.join(". ") : erro;
  if (salvo === "1") {
    return (
      <p className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
        ✓ Alterações publicadas — o site já está exibindo o conteúdo novo.
      </p>
    );
  }
  if (erro) {
    return (
      <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
        ⚠ {textoErro}
      </p>
    );
  }
  return null;
}

export function Cartao({
  titulo,
  descricao,
  href,
  emoji,
}: {
  titulo: string;
  descricao: string;
  href: string;
  emoji: string;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="text-2xl">{emoji}</p>
      <h2 className="font-display mt-2 text-lg font-semibold text-brand-800 group-hover:text-gold-600">
        {titulo}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{descricao}</p>
    </a>
  );
}

export function Avisos({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-16">{children}</section>
  );
}

import { redirect } from "next/navigation";
import { temSessao, painelConfigurado } from "@/lib/admin";
import { entrar } from "../acoes";

export default async function LoginAdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (await temSessao()) redirect("/admin");

  const { erro } = await searchParams;
  const configurado = painelConfigurado();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <h1 className="font-display text-xl font-semibold text-brand-800">
          Painel da Paróquia
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Paróquia São Paulo Apóstolo — Pariquera-Açu/SP
        </p>

        {!configurado ? (
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            A senha do painel ainda não foi configurada. Defina a variável{" "}
            <strong>ADMIN_PASSWORD</strong> no arquivo .env.local (local) ou nas
            variáveis de ambiente da Netlify (produção).
          </p>
        ) : (
          <form action={entrar} className="mt-6 space-y-3">
            {erro && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs text-red-700">
                Senha incorreta. Tente novamente.
              </p>
            )}

            <label
              htmlFor="senha"
              className="block text-xs font-semibold text-slate-600"
            >
              Senha do painel
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

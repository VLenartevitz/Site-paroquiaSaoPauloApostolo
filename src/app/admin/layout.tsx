import type { Metadata } from "next";
import { temSessao } from "@/lib/admin";
import { sair } from "./acoes";

export const metadata: Metadata = {
  title: "Painel da Paróquia",
  robots: { index: false, follow: false },
};

// O painel depende de cookie de sessão — nunca pré-renderizar no build
export const dynamic = "force-dynamic";

const osLinks = [
  { href: "/admin", rotulo: "Início" },
  { href: "/admin/paroquia", rotulo: "Paróquia" },
  { href: "/admin/horarios", rotulo: "Horários" },
  { href: "/admin/noticias", rotulo: "Notícias" },
  { href: "/admin/sacramentos", rotulo: "Sacramentos" },
  { href: "/admin/pastorais", rotulo: "Pastorais" },
  { href: "/admin/comunidades", rotulo: "Comunidades" },
  { href: "/admin/oracoes", rotulo: "Orações" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logado = await temSessao();

  if (!logado) {
    // fora do login: renderiza o conteúdo sem o cabeçalho do painel
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="font-display text-sm font-semibold text-brand-800">
            Painel — Paróquia São Paulo Apóstolo
          </p>

          <nav className="flex flex-wrap items-center gap-1 text-xs">
            {osLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-brand-700"
              >
                {l.rotulo}
              </a>
            ))}

            <form action={sair} className="ml-2">
              <button
                type="submit"
                className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-500 hover:bg-slate-100"
              >
                Sair
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="py-10">{children}</main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-4">
        <a
          href="/"
          className="text-xs text-slate-400 underline-offset-2 hover:underline"
        >
          ↩ Ver o site
        </a>
      </footer>
    </div>
  );
}

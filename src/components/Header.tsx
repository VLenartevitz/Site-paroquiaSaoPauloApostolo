"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { InfoParoquia } from "@/lib/repositorio";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const nav: NavItem[] = [
  { label: "Início", href: "/" },
  {
    label: "Paróquia",
    href: "/paroquia",
    children: [
      { label: "História e Clero", href: "/paroquia" },
      { label: "Nosso Padroeiro", href: "/padroeiro" },
      { label: "Comunidades e Capelas", href: "/comunidades" },
    ],
  },
  { label: "Horários", href: "/horarios" },
  {
    label: "Sacramentos",
    href: "/sacramentos",
    children: [
      { label: "Batismo", href: "/sacramentos/batismo" },
      { label: "Eucaristia (Primeira Comunhão)", href: "/sacramentos/eucaristia" },
      { label: "Crisma", href: "/sacramentos/crisma" },
      { label: "Matrimônio", href: "/sacramentos/matrimonio" },
      { label: "Confissão", href: "/sacramentos/confissao" },
      { label: "Unção dos Enfermos", href: "/sacramentos/uncao-dos-enfermos" },
    ],
  },
  { label: "Pastorais", href: "/pastorais" },
  { label: "Notícias", href: "/noticias" },
  {
    label: "Vida de Fé",
    href: "/oracoes",
    children: [
      { label: "Orações", href: "/oracoes" },
      { label: "Vela Virtual", href: "/vela-virtual" },
      { label: "Seja Dizimista", href: "/dizimo" },
    ],
  },
];

function Logo({
  paroquia,
  className = "",
}: {
  paroquia: InfoParoquia;
  className?: string;
}) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="24" cy="24" r="23" fill="#1e4068" />
        <circle cx="24" cy="24" r="23" stroke="#cda23c" strokeWidth="2" />
        {/* cruz */}
        <rect x="21.5" y="9" width="5" height="24" rx="1.5" fill="#cda23c" />
        <rect x="14" y="15" width="20" height="4.5" rx="1.5" fill="#cda23c" />
        {/* livro aberto */}
        <path
          d="M10 36c4-2 9-2 14 .6 5-2.6 10-2.6 14-.6V38c-4-2-9-2-14 .6-5-2.6-10-2.6-14-.6v-2Z"
          fill="#ffffff"
        />
      </svg>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-brand-800 sm:text-xl">
          {paroquia.nome}
        </span>
        <span className="block text-[11px] uppercase tracking-wider text-gold-600">
          {paroquia.cidade} · {paroquia.estado}
        </span>
      </span>
    </Link>
  );
}

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  return pathname.startsWith(item.href);
}

export default function Header({ paroquia }: { paroquia: InfoParoquia }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Barra de contato e redes */}
      <div className="hidden bg-brand-900 text-brand-100 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs">
          <span>
            📍 {paroquia.endereco} · ☎ {paroquia.telefone}
          </span>
          <div className="flex items-center gap-4">
            <a
              href={paroquia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300"
            >
              Instagram
            </a>
            <a
              href={paroquia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300"
            >
              Facebook
            </a>
            <a
              href={paroquia.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal */}
      <div className="border-b border-brand-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo paroquia={paroquia} />

          {/* Navegação desktop */}
          <nav className="hidden items-center lg:flex">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(pathname, item)
                        ? "bg-brand-50 text-brand-800"
                        : "text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <svg width="10" height="10" viewBox="0 0 10 10" className="mt-px">
                        <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    )}
                  </Link>

                  {item.children && (
                    <ul className="invisible absolute left-0 top-full z-10 mt-1 w-64 rounded-xl border border-brand-100 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {item.children.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              pathname === sub.href
                                ? "bg-brand-50 font-medium text-brand-800"
                                : "text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <a
              href={paroquia.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-900 shadow transition-colors hover:bg-gold-400"
            >
              Fale conosco
            </a>
          </nav>

          <details className="group relative lg:hidden">
            <summary
              aria-label="Abrir ou fechar menu"
              className="list-none cursor-pointer rounded-lg p-2 text-brand-800 hover:bg-brand-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </summary>

            {/* Menu mobile */}
            <nav className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100dvh-5rem)] w-[calc(20rem-15px)] max-w-[calc(100vw-2.9375rem)] touch-pan-y overflow-y-auto overscroll-contain rounded-xl border border-brand-100 bg-white shadow-xl lg:hidden">
              <ul className="divide-y divide-brand-50 px-4 py-2">
                {nav.map((item) => (
                  <li key={item.label} className="py-1">
                    {item.children && (
                      <div className="flex items-center gap-2">
                        <Link
                          href={item.href}
                          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5 active:-translate-y-0.5 ${
                            isActive(pathname, item)
                              ? "bg-brand-50 text-brand-800"
                              : "text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                          }`}
                        >
                          {item.label}
                        </Link>
                        <details className="mobile-submenu">
                          <summary
                            aria-label={`Alternar links de ${item.label}`}
                            className="list-none cursor-pointer rounded-full bg-gold-500 p-2 text-brand-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-gold-400 active:-translate-y-0.5 [&::-webkit-details-marker]:hidden"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                              className="mobile-submenu-arrow transition-transform duration-200"
                            >
                              <path
                                d="m3 6 5 5 5-5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </summary>
                          <ul
                            aria-label={`Links de ${item.label}`}
                            className="ml-3 mt-2 max-h-40 overflow-y-auto overscroll-contain rounded-lg border border-brand-100 bg-slate-50/70 p-1"
                          >
                            {item.children.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-transform hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-800 active:-translate-y-0.5"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                    {!item.children && (
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5 active:-translate-y-0.5 ${
                          isActive(pathname, item)
                            ? "bg-brand-50 text-brand-800"
                            : "text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="py-3">
                  <a
                    href={paroquia.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg bg-gold-500 px-4 py-2.5 text-center text-sm font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 hover:bg-gold-400 active:-translate-y-0.5"
                  >
                    Fale conosco no WhatsApp
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

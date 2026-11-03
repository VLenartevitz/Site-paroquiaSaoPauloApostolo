import Link from "next/link";
import { paroquia } from "@/data/paroquia";
import { missas } from "@/data/horarios";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        {/* Sobre */}
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            {paroquia.nome}
          </p>
          <p className="mt-1 text-sm text-gold-300">{paroquia.lema}</p>
          <p className="mt-4 text-sm leading-relaxed text-brand-100/80">
            {paroquia.diocese} · {paroquia.cidade} – {paroquia.estado}
            <br />
            Pároco: {paroquia.paroco}
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a
              href={paroquia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand-800 px-3 py-1.5 hover:bg-brand-700"
            >
              Instagram
            </a>
            <a
              href={paroquia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand-800 px-3 py-1.5 hover:bg-brand-700"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Menu rápido */}
        <nav aria-label="Menu do rodapé">
          <p className="font-display text-lg font-semibold text-gold-300">
            Navegue
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/horarios" className="hover:text-white">Horários de Missas</Link></li>
            <li><Link href="/sacramentos" className="hover:text-white">Sacramentos</Link></li>
            <li><Link href="/pastorais" className="hover:text-white">Pastorais e Movimentos</Link></li>
            <li><Link href="/noticias" className="hover:text-white">Notícias e Avisos</Link></li>
            <li><Link href="/oracoes" className="hover:text-white">Orações</Link></li>
            <li><Link href="/vela-virtual" className="hover:text-white">Acenda uma vela</Link></li>
            <li><Link href="/dizimo" className="hover:text-white">Seja Dizimista</Link></li>
            <li><Link href="/contato" className="hover:text-white">Contato e Secretaria</Link></li>
          </ul>
        </nav>

        {/* Contato + missas */}
        <div>
          <p className="font-display text-lg font-semibold text-gold-300">
            Contato
          </p>
          <ul className="mt-3 space-y-2 text-sm text-brand-100/85">
            <li>📍 {paroquia.endereco}</li>
            <li>☎ {paroquia.telefone}</li>
            <li>
              <a
                href={paroquia.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold-400/50 underline-offset-4 hover:text-white"
              >
                WhatsApp: {paroquia.telefone}
              </a>
            </li>
          </ul>

          <p className="font-display mt-8 text-lg font-semibold text-gold-300">
            Missas (resumo)
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-brand-100/85">
            {missas.map((m) => (
              <li key={m.dia}>
                <span className="text-gold-200">{m.dia}:</span>{" "}
                {m.horarios.join(" e ")}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-brand-100/70 sm:flex-row">
          <p>
            {/* TODO: atualizar o ano manualmente, ou tornar client-side, se desejar */}
            © 2026 {paroquia.nome} — {paroquia.cidade}/
            {paroquia.estado}. Todos os direitos reservados.
          </p>
          <p>
            Site mantido pela comunidade · {paroquia.diocese}
          </p>
        </div>
      </div>
    </footer>
  );
}

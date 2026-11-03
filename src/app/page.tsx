import Link from "next/link";
import { getDataFormatada } from "@/data/noticias";
import {
  getParoquia,
  getMissas,
  getProgramacao,
  getSacramentos,
  getNoticias,
} from "@/lib/repositorio";

const atalhos = [
  { href: "/vela-virtual", emoji: "🕯️", titulo: "Vela Virtual", texto: "Acenda uma vela com sua intenção" },
  { href: "/horarios", emoji: "⏰", titulo: "Horários de Missa", texto: "Confira as celebrações da semana" },
  { href: "/sacramentos", emoji: "🕊️", titulo: "Sacramentos", texto: "Batismo, Crisma, Matrimônio e mais" },
  { href: "/dizimo", emoji: "💛", titulo: "Seja Dizimista", texto: "Contribua com a missão da Igreja" },
];

export default async function HomePage() {
  const [paroquia, missas, programacaoSemana, sacramentos, noticias] =
    await Promise.all([
      getParoquia(),
      getMissas(),
      getProgramacao(),
      getSacramentos(),
      getNoticias(),
    ]);
  const avisos = noticias.filter((n) => n.categoria === "Aviso");
  const destaqueNoticias = noticias.filter((n) => n.categoria !== "Aviso").slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 text-white">
        {/* brilhos decorativos */}
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-[1.2fr,0.8fr] lg:py-28">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-300">
              {paroquia.cidade} · {paroquia.estado} · {paroquia.diocese}
            </p>
            <h1 className="font-display mt-4 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {paroquia.nome}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-100/90">
              {paroquia.lema}. Seja bem-vindo(a) ao site da nossa comunidade:
              aqui você encontra os horários das celebrações, os sacramentos,
              as pastorais e todas as novidades da paróquia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/horarios"
                className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-colors hover:bg-gold-400"
              >
                Horários de Missa
              </Link>
              <a
                href={paroquia.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                Fale conosco no WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-brand-100/70">
              Pároco: <span className="font-medium text-white">{paroquia.paroco}</span>
            </p>
          </div>

          {/* Card de horários */}
          <aside className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <h2 className="font-display text-2xl font-semibold text-gold-300">
              Missas esta semana
            </h2>
            <ul className="mt-4 space-y-3">
              {missas.map((m) => (
                <li
                  key={m.dia}
                  className="flex items-baseline justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-brand-100/90">{m.dia}</span>
                  <span className="font-display text-xl font-semibold text-white">
                    {m.horarios.join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/horarios"
              className="mt-4 inline-block text-sm font-medium text-gold-300 hover:text-gold-200"
            >
              Ver programação completa →
            </Link>
          </aside>
        </div>
      </section>

      {/* ===== ATALHOS ===== */}
      <section className="mx-auto -mt-8 max-w-6xl px-4">
        <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-xl shadow-brand-900/5 sm:grid-cols-2 lg:grid-cols-4">
          {atalhos.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group rounded-xl border border-slate-100 bg-slate-50/70 p-5 transition-all hover:-translate-y-0.5 hover:border-gold-400/60 hover:shadow-md"
            >
              <span className="text-2xl">{a.emoji}</span>
              <span className="font-display mt-2 block text-lg font-semibold text-brand-800">
                {a.titulo}
              </span>
              <span className="mt-1 block text-sm text-slate-500">{a.texto}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== AVISOS PAROQUIAIS ===== */}
      {avisos.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4">
          <h2 className="font-display text-3xl font-semibold text-brand-800">
            📢 Avisos Paroquiais
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {avisos.map((aviso) => (
              <article
                key={aviso.slug}
                className="rounded-2xl border-l-4 border-l-gold-500 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                  {getDataFormatada(aviso.data)} · Aviso
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold text-brand-800">
                  {aviso.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {aviso.resumo}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===== PROGRAMAÇÃO DA SEMANA ===== */}
      <section className="mt-16 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold text-brand-800">
                Programação da Semana
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Celebrações, encontros e atividades da comunidade
              </p>
            </div>
            <Link
              href="/horarios"
              className="text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Agenda completa →
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {programacaoSemana.map((d) => (
              <div
                key={d.dia}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-5"
              >
                <p className="font-display text-lg font-semibold text-gold-600">
                  {d.dia}
                </p>
                {d.itens.length === 0 ? (
                  <p className="mt-2 text-sm text-slate-400">Sem atividades divulgadas</p>
                ) : (
                  <ul className="mt-2 space-y-1.5">
                    {d.itens.map((item) => (
                      <li key={item} className="text-sm text-slate-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SACRAMENTOS ===== */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <h2 className="font-display text-3xl font-semibold text-brand-800">
          Sacramentos
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Como agendar cada celebração na nossa paróquia
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sacramentos.map((s) => (
            <Link
              key={s.slug}
              href={`/sacramentos/${s.slug}`}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl">{s.emoji}</span>
              <h3 className="font-display mt-2 text-xl font-semibold text-brand-800 group-hover:text-brand-600">
                {s.nome}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">{s.resumo}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== ÚLTIMAS NOTÍCIAS ===== */}
      <section className="mt-16 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl font-semibold text-brand-800">
              Últimas Notícias
            </h2>
            <Link
              href="/noticias"
              className="text-sm font-medium text-brand-700 hover:text-brand-900"
            >
              Ver todas →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {destaqueNoticias.map((n) => (
              <Link
                key={n.slug}
                href="/noticias"
                className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-6 transition-all hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                  {getDataFormatada(n.data)} · {n.categoria}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold text-brand-800 group-hover:text-brand-600">
                  {n.titulo}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                  {n.resumo}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMO CHEGAR / CONTATO ===== */}
      <section className="mx-auto mt-16 max-w-6xl px-4 pb-20">
        <div className="grid gap-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:grid-cols-2">
          <div className="p-8">
            <h2 className="font-display text-3xl font-semibold text-brand-800">
              Venha nos visitar
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Será uma alegria receber você e sua família. Estamos na{" "}
              <strong>{paroquia.endereco}</strong>.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>☎ {paroquia.telefone}</li>
              <li>👦 {paroquia.paroco} — Pároco</li>
              <li>⛪ {paroquia.diocese}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={paroquia.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Como chegar (Google Maps)
              </a>
              <Link
                href="/contato"
                className="rounded-xl border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                Contato e Secretaria
              </Link>
            </div>
          </div>
          <div className="min-h-64 bg-slate-100">
            <iframe
              title="Mapa — Paróquia São Paulo Apóstolo"
              src={paroquia.mapsEmbedUrl}
              className="h-full min-h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

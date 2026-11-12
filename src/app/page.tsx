import Link from "next/link";
import { getDataFormatada } from "@/data/noticias";
import {
  getParoquia,
  getMissas,
  getNoticias,
} from "@/lib/repositorio";

// Substitua este caminho para testar outra imagem; mantenha o arquivo dentro de public/.
const imagemDestaque = "/imagem-destaque.jpg";

// Ordem fixa dos quadrados; os horários existentes são associados a cada dia abaixo.
const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Cada atalho define seu próprio gradiente visual.
const atalhos: {
  href: string;
  emoji: string;
  titulo: string;
  texto: string;
  fundo: string;
  imagemFundo?: string;
}[] = [
  {
    href: "/vela-virtual",
    emoji: "🕯️",
    titulo: "Vela Virtual",
    texto: "Acenda uma vela com sua intenção",
    fundo: "from-brand-950 via-brand-800 to-brand-600",
  },
  {
    href: "/sacramentos",
    emoji: "🕊️",
    titulo: "Sacramentos",
    texto: "Batismo, Crisma, Matrimônio e mais",
    fundo: "from-sky-0 via-brand-0 to-sky-0",
    imagemFundo: "/images/7sacramentos.png",
  },
  {
    href: "/dizimo",
    emoji: "💛",
    titulo: "Seja Dizimista",
    texto: "Contribua com a missão da Igreja",
    fundo: "from-amber-950 via-amber-800 to-gold-700",
  },
];

export default async function HomePage() {
  const [paroquia, missas, noticias] =
    await Promise.all([
      getParoquia(),
      getMissas(),
      getNoticias(),
    ]);
  const avisos = noticias.filter((n) => n.categoria === "Aviso");
  const destaqueNoticias = noticias.filter((n) => n.categoria !== "Aviso").slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11, 21, 35, 0.7), rgba(11, 21, 35, 0.88)), url("${imagemDestaque}")`,
        }}
      >
        {/* brilhos decorativos */}
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-400/60 to-transparent" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-[1.2fr,0.8fr] lg:py-28">
          <div>
            <div className="rounded-3xl px-5 py-6 sm:px-7 lg:px-8 lg:py-12">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-300">
                {paroquia.cidade} · {paroquia.estado} · {paroquia.diocese}
              </p>
              <h1 className="font-display mt-4 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                {paroquia.nome}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-100/90">
                {paroquia.lema}. Seja bem-vindo(a) ao site da nossa comunidade:
                aqui você encontra os horários das celebrações, as pastorais e
                todas as novidades da paróquia.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/horarios"
                  className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-colors hover:#99bff0"
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
            </div>
            <p className="mt-6 text-sm text-brand-100/70">
              Pároco: <span className="font-medium text-white">{paroquia.paroco}</span>
            </p>
          </div>

          {/* Card de horários */}
          <aside className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <h2 className="font-display text-center text-2xl font-semibold text-gold-300">
              Missas esta semana na igreja Matriz
            </h2>
            <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-3">
              {diasDaSemana.map((dia) => {
                const missa = missas.find((item) => item.dia === dia);

                return (
                  <div
                    key={dia}
                    className="w-[calc((100%-2.25rem)/4)] max-w-24 text-center sm:w-[calc((100%-4.5rem)/7)]"
                  >
                    <div className="group flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-white/20 bg-white/10 px-1 text-center transition-colors duration-200 hover:border-gold-300 hover:bg-missa-hover">
                      <span className="text-xs font-medium leading-tight text-brand-100 transition-colors group-hover:text-brand-950 sm:text-sm">
                        {dia.replace(/-feira$/, "")}
                      </span>
                      {missa && (
                        <span className="text-[0.7rem] font-semibold leading-tight text-gold-300 transition-colors group-hover:text-brand-950">
                          {missa.horarios.join(" · ")}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
        {/* Os três cards ficam centralizados em uma grade responsiva. */}
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {/* Os cards permanecem centralizados e usam gradientes para manter o texto legível. */}
          {atalhos.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={
                // O degradê escuro sobre a imagem mantém o texto legível; cover preenche o card.
                a.imagemFundo
                  ? {
                      // A terceira camada cria o contorno dourado-azulado sem cobrir a foto.
                      backgroundImage: `linear-gradient(180deg, rgba(11, 21, 35, 0.35), rgba(11, 21, 35, 0.85)), url("${a.imagemFundo}"), linear-gradient(135deg, #f3e3b3, #ddb95f 45%, #5587b2)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundOrigin: "padding-box, padding-box, border-box",
                      backgroundClip: "padding-box, padding-box, border-box",
                    }
                  : undefined
              }
              className={`group relative isolate flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-3xl border-2 ${a.imagemFundo ? "border-transparent" : "border-white/20"} bg-linear-to-br ${a.fundo} p-7 text-center text-white shadow-lg shadow-brand-950/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
              />
              <span className="relative z-10 grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/10 text-3xl shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <span aria-hidden="true">{a.emoji}</span>
              </span>
              <span className="font-display relative z-10 mt-5 block text-2xl font-semibold">
                {a.titulo}
              </span>
              <span className="relative z-10 mt-2 block max-w-xs text-sm leading-relaxed text-white/80">
                {a.texto}
              </span>
              <span className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors group-hover:bg-white/20">
                Saiba mais <span aria-hidden="true">→</span>
              </span>
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

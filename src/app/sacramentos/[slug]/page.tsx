import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getSacramento, sacramentos } from "@/data/sacramentos";
import { paroquia } from "@/data/paroquia";

export function generateStaticParams() {
  return sacramentos.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/sacramentos/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const sacramento = getSacramento(slug);
  if (!sacramento) return {};
  return {
    title: sacramento.nome,
    description: sacramento.resumo,
  };
}

// Bloco reutilizável de linhas
function Lista({ itens }: { itens: string[] }) {
  if (itens.length === 0) return null;
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
      {itens.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function SacramentoPage(
  props: PageProps<"/sacramentos/[slug]">
) {
  const { slug } = await props.params;
  const sacramento = getSacramento(slug);
  if (!sacramento) notFound();

  return (
    <>
      <PageHeader
        titulo={`${sacramento.emoji} ${sacramento.nome}`}
        subtitulo={sacramento.resumo}
      />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-brand-800">
              Como agendar
            </h2>
            <div className="mt-4">
              <Lista itens={sacramento.comoAgendar} />
            </div>
          </article>

          {sacramento.documentos.length > 0 && (
            <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-brand-800">
                Documentos necessários
              </h2>
              <div className="mt-4">
                <Lista itens={sacramento.documentos} />
              </div>
            </article>
          )}
        </div>

        {sacramento.observacoes.length > 0 && (
          <article className="mt-6 rounded-2xl border-l-4 border-l-gold-500 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-brand-800">
              Observações
            </h2>
            <div className="mt-4">
              <Lista itens={sacramento.observacoes} />
            </div>
          </article>
        )}

        <div className="mt-8 rounded-2xl bg-brand-800 p-6 text-white sm:flex sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm text-brand-100/85">
            Dúvidas sobre <strong>{sacramento.nome}</strong>? Fale com a
            secretaria paroquial — {paroquia.telefone}.
          </p>
          <a
            href={paroquia.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-brand-900 hover:bg-gold-400 sm:mt-0"
          >
            Falar no WhatsApp
          </a>
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/sacramentos"
            className="text-sm font-medium text-brand-700 hover:text-brand-900"
          >
            ← Todos os sacramentos
          </Link>
        </p>
      </section>
    </>
  );
}

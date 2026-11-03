import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getParoquia } from "@/lib/repositorio";

export const metadata: Metadata = {
  title: "Seja Dizimista",
  description: "Seja dizimista da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP: contribua com a manutenção das celebrações, ações pastorais e obras sociais.",
};

export default async function DizimoPage() {
  const paroquia = await getParoquia();
  return (
    <>
      <PageHeader
        titulo="Seja Dizimista"
        subtitulo="“Cada um contribua segundo propôs no seu coração, não com tristeza ou por necessidade; porque Deus ama ao que dá com alegria” (2 Cor 9,7)"
      />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <article className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-brand-800">
            O que é o Dízimo?
          </h2>
          <div className="mt-4 space-y-3 leading-relaxed text-slate-600">
            <p>
              O dízimo é a contribuição voluntária e periódica dos fiéis para
              a manutenção das atividades da paróquia: celebrações, catequese,
              assistência aos mais pobres, manutenção do templo e das obras
              pastorais.
            </p>
            <p>
              Mais importante do que a quantia é o gesto de fé e gratidão: o
              dizimista reconhece que tudo o que tem vem de Deus e se faz
              missionário da caridade na comunidade.
            </p>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <li className="rounded-xl bg-brand-50 p-4 text-center text-sm font-medium text-brand-800">
              ⚫ Mantém a igreja aberta e cuidada
            </li>
            <li className="rounded-xl bg-brand-50 p-4 text-center text-sm font-medium text-brand-800">
              📚 Sustenta a catequese e as pastorais
            </li>
            <li className="rounded-xl bg-brand-50 p-4 text-center text-sm font-medium text-brand-800">
              🤝 Chega de comida às famílias
            </li>
          </ul>
        </article>

        <article className="mt-8 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-brand-800">
            Como contribuir
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              A contribuição pode ser feita pela <strong>envelope do dizimista</strong>{" "}
              (entregue na secretaria), em <strong>espécie</strong> nas
              celebrações, ou por <strong>Pix</strong> / <strong>transferência</strong>:
            </p>
            <p className="rounded-xl bg-amber-50 px-5 py-4 text-amber-800">
              ⚠️ A <strong>chave Pix</strong> e os dados bancários da paróquia
              ainda serão cadastrados. Para obter os dados atualizados, fale
              com a secretaria pelo WhatsApp {paroquia.telefone}.
            </p>
            <p>
              Você também pode tornar-se dizimista cadastrado: seu nome será
              registrado e você receberá os avisos e o envelope mensal.
            </p>
          </div>
          <a
            href={paroquia.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 hover:bg-gold-400"
          >
            Quero ser dizimista — fale com a secretaria
          </a>
        </article>
      </section>
    </>
  );
}

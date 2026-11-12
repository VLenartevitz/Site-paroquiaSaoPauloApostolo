import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getOracoes, getParoquia } from "@/lib/repositorio";

export const metadata: Metadata = {
  title: "Nosso Padroeiro — São Paulo Apóstolo",
  description: "A vida de São Paulo Apóstolo, padroeiro da Paróquia de Pariquera-Açu/SP, e a oração a São Paulo.",
};

export default async function PadroeiroPage() {
  const [paroquia, oracoes] = await Promise.all([getParoquia(), getOracoes()]);
  const oracaoSaoPaulo = oracoes.padroeiro;
  return (
    <>
      <PageHeader
        titulo="São Paulo Apóstolo"
        subtitulo={`Padroeiro da ${paroquia.nome} · Festa: ${paroquia.festaPadroeiro}`}
      />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <article className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="space-y-4 leading-relaxed text-slate-600">
            <p>
              <strong className="text-brand-800">Paulo de Tarso</strong>, o
              apóstolo das gentes, nasceu em Tarso (atual Turquia), por volta
              do ano 7 d.C. Judeu fariseu, perseguia os cristãos até sua
              dramática conversão, no caminho de Damasco, quando o próprio
              Jesus o chamou: <em>“Saulo, Saulo, por que me persegues?”</em>
            </p>
            <p>
              De perseguidor, tornou-se o maior missionário da Igreja
              primitiva. Em suas três grandes viagens missionárias percorreu
              centenas de quilômetros, fundou comunidades cristãs em cidades
              como Corinto, Éfeso, Filipos e Tessalônica, e escreveu cartas que
              hoje fazem parte do Novo Testamento e continuam formando a fé e a
              vida da Igreja.
            </p>
            <p>
              Chicoteado, preso, apedrejado e finalmente martirizado em Roma,
              sob o imperador Nero, Paulo jamais deixou de proclamar com
              paixão: <em>“Vivo, mas já não sou eu; é Cristo quem vive em mim”</em>{" "}
              (Gl 2,20).
            </p>
            <p>
              Sua festa principal é celebrada no dia{" "}
              <strong className="text-brand-800">25 de janeiro</strong>{" "}
              (Conversão de São Paulo), e no dia 29 de junho a Igreja celebra
              juntos São Pedro e São Paulo, apóstolos e colunas da Igreja.
            </p>
          </div>

          <blockquote className="mt-8 rounded-xl border-l-4 border-l-gold-500 bg-slate-50 px-6 py-5 font-display text-xl italic text-brand-800">
            “Combati o bom combate, terminei a corrida, guardei a fé.”
            <footer className="mt-2 text-sm font-medium not-italic text-slate-500">
              — 2 Tm 4,7
            </footer>
          </blockquote>
        </article>

        {/* Oração ao padroeiro */}
        <article className="mt-8 rounded-2xl bg-linear-to-br from-brand-900 to-brand-700 p-8 text-white shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-gold-300">
            {oracaoSaoPaulo.titulo}
          </h2>
          <div className="mt-4 space-y-3 leading-relaxed text-brand-100/90">
            {oracaoSaoPaulo.paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}

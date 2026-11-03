import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import VelaVirtual from "@/components/VelaVirtual";

export const metadata: Metadata = {
  title: "Vela Virtual",
  description: "Acenda uma vela virtual com sua intenção na Capela Virtual da Paróquia São Paulo Apóstolo de Pariquera-Açu/SP.",
};

export default function VelaVirtualPage() {
  return (
    <>
      <PageHeader
        titulo="Vela Virtual"
        subtitulo="Escreva sua oração e acenda uma vela com a sua intenção"
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <VelaVirtual />
      </section>
    </>
  );
}

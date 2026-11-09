import { redirect } from "next/navigation";
import { temSessao } from "@/lib/admin";
import { getParoquia } from "@/lib/repositorio";
import { salvarParoquia } from "../acoes";
import {
  Banner,
  BotaoSalvar,
  Campo,
  CampoArea,
  CampoLinhas,
} from "@/components/admin/ui";

export default async function AdminParoquiaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { salvo, erro } = await searchParams;
  const info = await getParoquia();

  return (
    <div className="mx-auto max-w-3xl px-4">
      <Banner salvo={salvo} erro={erro} />
      <h1 className="font-display text-2xl font-semibold text-brand-800">
        Dados da ParÃ³quia
      </h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Aparecem no rodapÃ©, na pÃ¡gina ParÃ³quia, na pagina de contato e nos
        botÃµes de WhatsApp.
      </p>

      <form
        action={salvarParoquia}
        className="rounded-2xl border border-slate-100 bg-slate-100/40 p-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Campo rotulo="Nome da parÃ³quia" nome="nome" valor={info.nome} />
          </div>
          <div className="sm:col-span-2">
            <Campo rotulo="Lema" nome="lema" valor={info.lema} />
          </div>
          <Campo rotulo="Cidade" nome="cidade" valor={info.cidade} />
          <Campo
            rotulo="Estado"
            nome="estado"
            valor={info.estado}
            placeholder="SP"
          />
          <Campo rotulo="Diocese" nome="diocese" valor={info.diocese} />
          <Campo rotulo="Padroeiro" nome="padroeiro" valor={info.padroeiro} />
          <Campo
            rotulo="Festa do padroeiro"
            nome="festaPadroeiro"
            valor={info.festaPadroeiro}
            dica="ex.: 25 de janeiro"
          />
          <Campo rotulo="PÃ¡roco" nome="paroco" valor={info.paroco} />
          <CampoArea
            rotulo="EndereÃ§o"
            nome="endereco"
            valor={info.endereco}
            linhas={2}
            dica="usado no mapa embutido"
          />
          <Campo
            rotulo="Telefone"
            nome="telefone"
            valor={info.telefone}
            dica="ex.: (13) 3856-1282"
          />
          <Campo
            rotulo="WhatsApp"
            nome="whatsapp"
            valor={info.whatsapp}
            dica="sÃ³ nÃºmeros, com 55 + DDD"
          />
          <Campo rotulo="E-mail" nome="email" tipo="email" valor={info.email} />
          <Campo
            rotulo="Instagram (URL)"
            nome="instagram"
            tipo="url"
            valor={info.instagram}
          />
          <Campo
            rotulo="Facebook (URL)"
            nome="facebook"
            tipo="url"
            valor={info.facebook}
          />
          <div className="sm:col-span-2">
            <CampoLinhas
              rotulo="HorÃ¡rio de atendimento da secretaria"
              nome="horarioSecretaria"
              itens={info.horarioSecretaria}
              dica="uma linha por horÃ¡rio"
            />
          </div>
        </div>

        <BotaoSalvar />
      </form>
    </div>
  );
}

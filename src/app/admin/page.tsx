import { redirect } from "next/navigation";
import { temSessao, painelConfigurado } from "@/lib/admin";
import { temBanco } from "@/lib/supabase";
import { Cartao } from "@/components/admin/ui";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await temSessao())) redirect("/admin/login");

  const { erro } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-4">
      {erro && (
        <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          ⚠ {erro}
        </p>
      )}

      <h1 className="font-display text-2xl font-semibold text-brand-800">
        O que você quer editar?
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Escolha uma seção. Ao salvar, as páginas do site aparecem atualizadas
        na hora.
      </p>

      {/* status das integrações */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-xl border px-4 py-3 text-xs ${
            painelConfigurado()
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          <strong>Senha do painel:</strong>{" "}
          {painelConfigurado()
            ? "configurada ✓"
            : "faltando — defina ADMIN nas variáveis de ambiente"}
        </div>
        <div
          className={`rounded-xl border px-4 py-3 text-xs ${
            temBanco
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          <strong>Banco (Supabase):</strong>{" "}
          {temBanco
            ? "conectado ✓ — edições aparecem no site"
            : "não configurado — defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY para publicar edições"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Cartao
          emoji="⛪"
          titulo="Dados da Paróquia"
          descricao="Nome, lema, pároco, endereço, telefone, WhatsApp e redes sociais."
          href="/admin/paroquia"
        />
        <Cartao
          emoji="⏰"
          titulo="Horários"
          descricao="Missas de fim de semana, confissões e programação da semana."
          href="/admin/horarios"
        />
        <Cartao
          emoji="📰"
          titulo="Notícias e avisos"
          descricao="Publicar, editar e remover notícias (avisos entram na home)."
          href="/admin/noticias"
        />
        <Cartao
          emoji="🙏"
          titulo="Sacramentos"
          descricao="Como agendar, documentos e observações de cada sacramento."
          href="/admin/sacramentos"
        />
        <Cartao
          emoji="🤝"
          titulo="Pastorais e movimentos"
          descricao="Descrições e dias de encontro das pastorais da paróquia."
          href="/admin/pastorais"
        />
        <Cartao
          emoji="🏘️"
          titulo="Comunidades"
          descricao="Matriz, capelas e comunidades com endereço e horários."
          href="/admin/comunidades"
        />
        <Cartao
          emoji="📖"
          titulo="Orações"
          descricao="Orações básicas e a oração de São Paulo Apóstolo."
          href="/admin/oracoes"
        />
      </div>
    </div>
  );
}

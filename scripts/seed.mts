/**
 * Seed: sobe o conteúdo atual (src/data/) para a tabela `config` do Supabase.
 *
 * Uso:
 *   1) configure o .env.local com SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY
 *   2) npm run db:seed
 *
 * Pode ser executado quantas vezes quiser (usa upsert).
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { paroquia } from "../src/data/paroquia.ts";
import { missas, confissoes, programacaoSemana } from "../src/data/horarios.ts";
import { sacramentos } from "../src/data/sacramentos.ts";
import { pastorais } from "../src/data/pastorais.ts";
import { comunidades } from "../src/data/comunidades.ts";
import { noticias } from "../src/data/noticias.ts";
import { oracoesBasicas, oracaoSaoPaulo } from "../src/data/oracoes.ts";

/* ---------- carrega .env.local manualmente ---------- */
function env(nome: string): string | undefined {
  if (process.env[nome]) return process.env[nome];
  try {
    const conteudo = readFileSync(".env.local", "utf8");
    for (const linha of conteudo.split(/\r?\n/)) {
      const m = /^([A-Z0-9_]+)\s*=\s*(.+)\s*$/.exec(linha);
      if (m && m[1] === nome) return m[2].trim();
    }
  } catch {
    /* .env.local não existe */
  }
  return undefined;
}

const url = env("SUPABASE_URL");
const key = env("SUPABASE_SERVICE_ROLE_KEY");

if (!url || !key) {
  console.error(
    "✖ Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/* ---------- documentos para a tabela config ---------- */
const documentos: Record<string, unknown> = {
  paroquia: { ...paroquia },
  missas,
  confissoes,
  programacao: programacaoSemana,
  sacramentos,
  pastorais,
  comunidades,
  noticias,
  oracoes_basicas: oracoesBasicas,
  oracao_padroeiro: oracaoSaoPaulo,
};

let ok = 0;
let falha = 0;

for (const [chave, valor] of Object.entries(documentos)) {
  const { error } = await supabase
    .from("config")
    .upsert({ chave, valor, atualizado_em: new Date().toISOString() });
  if (error) {
    console.error(`  ✖ ${chave}: ${error.message}`);
    falha++;
  } else {
    console.log(`  ✔ ${chave}`);
    ok++;
  }
}

console.log(`\nSeed concluído: ${ok} documento(s) enviado(s), ${falha} falha(s).`);

/**
 * Camada de acesso ao conteúdo do site.
 *
 * - Com Supabase configurado: lê os documentos da tabela `config`.
 * - Sem Supabase (ou erro momentâneo): usa os dados locais em `src/data/`,
 *   garantindo que o site nunca fique offline.
 *
 * Usar apenas em Server Components / server actions.
 */
import {
  paroquia as paroquiaPadrao,
} from "@/data/paroquia";
import {
  missas as missasPadrao,
  confissoes as confissoesPadrao,
  programacaoSemana as programacaoPadrao,
  avisoHorarios,
  type Missa,
  type ProgramacaoDia,
} from "@/data/horarios";
import {
  sacramentos as sacramentosPadrao,
  getSacramento as getSacramentoPadrao,
  type Sacramento,
} from "@/data/sacramentos";
import { pastorais as pastoraisPadrao, type Pastoral } from "@/data/pastorais";
import {
  comunidades as comunidadesPadrao,
  notaComunidades as notaComunidadesPadrao,
  type Comunidade,
} from "@/data/comunidades";
import { noticias as noticiasPadrao, type Noticia } from "@/data/noticias";
import {
  oracoesBasicas as oracoesBasicasPadrao,
  oracaoSaoPaulo as oracaoSaoPauloPadrao,
  type Oracao,
} from "@/data/oracoes";
import { clienteAdmin } from "@/lib/supabase";

export interface InfoParoquia {
  nome: string;
  lema: string;
  cidade: string;
  estado: string;
  diocese: string;
  padroeiro: string;
  festaPadroeiro: string;
  endereco: string;
  telefone: string;
  telefoneLink: string;
  whatsapp: string;
  paroco: string;
  email: string;
  horarioSecretaria: string[];
  instagram: string;
  facebook: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  whatsappUrl: string;
}

export interface DocumentoComunidades {
  lista: Comunidade[];
  nota: string;
}

export interface DocumentoOracoes {
  basicas: Oracao[];
  padroeiro: Oracao;
}

/** Lê um documento da tabela `config` (chave × valor jsonb) */
async function lerDocumento<T>(chave: string, padrao: T): Promise<T> {
  const cliente = clienteAdmin();
  if (!cliente) return padrao;

  try {
    const { data, error } = await cliente
      .from("config")
      .select("valor")
      .eq("chave", chave)
      .maybeSingle();

    if (error || !data?.valor) return padrao;
    return data.valor as T;
  } catch {
    // banco fora do ar → mantém o site no ar com os dados padrão
    return padrao;
  }
}

/* ---------- Dados da paróquia (contato, endereço, redes…) ---------- */

export async function getParoquia(): Promise<InfoParoquia> {
  const sobrepor = await lerDocumento<Partial<InfoParoquia>>(
    "paroquia",
    {},
  );
  return { ...paroquiaPadrao, ...sobrepor } as InfoParoquia;
}

type ContatoCard = { titulo: string; linhas: string[] };

export function montarContatoCards(
  info: InfoParoquia,
): ContatoCard[] {
  return [
    {
      titulo: "Secretaria Paroquial",
      linhas: [info.endereco, `Telefone: ${info.telefone}`],
    },
    {
      titulo: "Horário de atendimento",
      linhas: info.horarioSecretaria,
    },
    {
      titulo: "Redes sociais",
      linhas: [
        "Instagram: @paroquiaspapariquera",
        "Facebook: Paróquia São Paulo Apóstolo Pariquera-Açu",
      ],
    },
  ];
}

/* ---------- Horários ---------- */

export async function getMissas(): Promise<Missa[]> {
  return lerDocumento<Missa[]>("missas", missasPadrao);
}

export async function getConfissoes(): Promise<string[]> {
  return lerDocumento<string[]>("confissoes", confissoesPadrao);
}

export async function getProgramacao(): Promise<ProgramacaoDia[]> {
  return lerDocumento<ProgramacaoDia[]>("programacao", programacaoPadrao);
}

export { avisoHorarios };

/* ---------- Sacramentos ---------- */

export async function getSacramentos(): Promise<Sacramento[]> {
  return lerDocumento<Sacramento[]>("sacramentos", sacramentosPadrao);
}

export async function getSacramento(
  slug: string,
): Promise<Sacramento | undefined> {
  const lista = await getSacramentos();
  return lista.find((s) => s.slug === slug) ?? getSacramentoPadrao(slug);
}

/* ---------- Pastorais ---------- */

export async function getPastorais(): Promise<Pastoral[]> {
  return lerDocumento<Pastoral[]>("pastorais", pastoraisPadrao);
}

/* ---------- Comunidades ---------- */

export async function getComunidades(): Promise<DocumentoComunidades> {
  const lista = await lerDocumento<Comunidade[]>(
    "comunidades",
    comunidadesPadrao,
  );
  return { lista, nota: notaComunidadesPadrao };
}

/* ---------- Notícias ---------- */

export async function getNoticias(): Promise<Noticia[]> {
  return lerDocumento<Noticia[]>("noticias", noticiasPadrao);
}

/* ---------- Orações ---------- */

export async function getOracoes(): Promise<DocumentoOracoes> {
  const basicas = await lerDocumento<Oracao[]>(
    "oracoes_basicas",
    oracoesBasicasPadrao,
  );
  const padroeiro = await lerDocumento<Oracao>(
    "oracao_padroeiro",
    oracaoSaoPauloPadrao,
  );
  return { basicas, padroeiro };
}

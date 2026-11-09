"use server";

/**
 * AÃ§Ãµes do painel /admin (Server Actions).
 *
 * - entrar/sair: sessÃ£o por senha (ADMIN_PASSWORD).
 * - salvar*: gravam o documento de conteÃºdo no Supabase (tabela `config`)
 *   e revalidam as pÃ¡ginas do site na hora.
 *
 * Toda aÃ§Ã£o confere a sessÃ£o antes de executar. Se o banco nÃ£o estiver
 * configurado, nada Ã© salvo e o usuÃ¡rio recebe uma mensagem clara.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SENHA, NOME_COOKIE, senhaConfere, temSessao, tokenDeSessao } from "@/lib/admin";
import { clienteAdmin } from "@/lib/supabase";
import { paroquia as padraoParoquia } from "@/data/paroquia";
import type { InfoParoquia, DocumentoComunidades, DocumentoOracoes } from "@/lib/repositorio";
import type { Missa, ProgramacaoDia } from "@/data/horarios";
import type { Sacramento } from "@/data/sacramentos";
import type { Pastoral } from "@/data/pastorais";
import type { Comunidade } from "@/data/comunidades";
import type { Noticia } from "@/data/noticias";
import type { Oracao } from "@/data/oracoes";

/* ============================================================
 * SessÃ£o
 * ============================================================ */

export async function entrar(formData: FormData) {
  const senha = String(formData.get("senha") ?? "");
  if (!senhaConfere(senha)) {
    redirect("/admin/login?erro=1");
  }

  const jar = await cookies();
  jar.set(NOME_COOKIE, tokenDeSessao(senha), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });

  redirect("/admin");
}

export async function sair() {
  const jar = await cookies();
  jar.delete(NOME_COOKIE);
  redirect("/admin/login");
}

/* ============================================================
 * UtilitÃ¡rios de leitura do formulÃ¡rio
 * ============================================================ */

function texto(fd: FormData, nome: string, padrao = ""): string {
  const valor = fd.get(nome);
  if (typeof valor !== "string") return padrao;
  return valor.trim();
}

function linhas(fd: FormData, nome: string): string[] {
  return texto(fd, nome)
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

type ItemBruto = Record<string, string>;

function lerLista(fd: FormData, nomeCampo: string): ItemBruto[] {
  const bruto = texto(fd, nomeCampo);
  if (!bruto) return [];
  const dados: unknown = JSON.parse(bruto);
  if (!Array.isArray(dados)) throw new Error("Lista invÃ¡lida");
  return (dados as ItemBruto[]).filter(Boolean);
}

/** Slug amigÃ¡vel (URL) a partir de um tÃ­tulo */
function slugDe(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ============================================================
 * GravaÃ§Ã£o no banco + revalidaÃ§Ã£o
 * ============================================================ */

/**
 * Salva um documento em `config`. Retorna null se ok, ou a
 * mensagem de erro (ex.: banco nÃ£o configurado).
 */
async function salvarDocumento(chave: string, valor: unknown): Promise<string | null> {
  const cliente = clienteAdmin();
  if (!cliente) {
    return "Banco (Supabase) nÃ£o configurado â€” defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no painel da Netlify. Nada foi salvo.";
  }

  const { error } = await cliente
    .from("config")
    .upsert({ chave, valor, atualizado_em: new Date().toISOString() });

  if (error) return `O banco recusou o salvamento: ${error.message}`;

  // nova renderizaÃ§Ã£o das pÃ¡ginas pÃºblicas que leem estes dados
  revalidatePath("/", "layout");
  return null;
}

/** Confere sessÃ£o; se indevido, manda para o login */
async function garantirSessao() {
  if (!(await temSessao())) redirect("/admin/login");
}

/**
 * redirect() lanÃ§a um erro de controle de fluxo do Next â€” re-lanÃ§Ã¡-lo
 * nos catch() para nÃ£o virar mensagem de erro na tela.
 */
function ehRedirect(erro: unknown): boolean {
  const alvo = erro as { message?: string; digest?: string } | null;
  const marcador = `${alvo?.message ?? ""}${alvo?.digest ?? ""}`;
  return marcador.includes("NEXT_REDIRECT");
}

/* ============================================================
 * Info da parÃ³quia
 * ============================================================ */

function soDigitos(v: string): string {
  return v.replace(/\D/g, "");
}

export async function salvarParoquia(formData: FormData) {
  await garantirSessao();
  const url = "/admin/paroquia";

  try {
    const endereco = texto(formData, "endereco") || padraoParoquia.endereco;
    const whatsapp = soDigitos(texto(formData, "whatsapp"));
    const mapsEndereco = encodeURIComponent(endereco);

    const parcial: Partial<InfoParoquia> = {
      nome: texto(formData, "nome") || padraoParoquia.nome,
      lema: texto(formData, "lema") || padraoParoquia.lema,
      cidade: texto(formData, "cidade") || padraoParoquia.cidade,
      estado: texto(formData, "estado") || padraoParoquia.estado,
      diocese: texto(formData, "diocese") || padraoParoquia.diocese,
      padroeiro: texto(formData, "padroeiro") || padraoParoquia.padroeiro,
      festaPadroeiro: texto(formData, "festaPadroeiro") || padraoParoquia.festaPadroeiro,
      endereco,
      telefone: texto(formData, "telefone"),
      telefoneLink: `tel:+55${soDigitos(texto(formData, "telefone"))}`,
      whatsapp,
      paroco: texto(formData, "paroco"),
      email: texto(formData, "email"),
      horarioSecretaria: linhas(formData, "horarioSecretaria"),
      instagram: texto(formData, "instagram"),
      facebook: texto(formData, "facebook"),
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsEndereco}`,
      mapsEmbedUrl: `https://www.google.com/maps?q=${mapsEndereco}&output=embed`,
      whatsappUrl: whatsapp
        ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
            "OlÃ¡! Vim pelo site da ParÃ³quia SÃ£o Paulo ApÃ³stolo.",
          )}`
        : "",
    };

    const erro = await salvarDocumento("paroquia", parcial);
    if (erro) redirect(`${url}?erro=${encodeURIComponent(erro)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

/* ============================================================
 * HorÃ¡rios (missas, confissÃµes, programaÃ§Ã£o)
 * ============================================================ */

function construirMissa(item: ItemBruto, i: number): Missa | null {
  const dia = item.dia?.trim();
  const horarios = (item.horarios ?? "")
    .split(/\r?\n/)
    .map((s: string) => s.trim())
    .filter(Boolean);
  if (!dia || horarios.length === 0) return null;
  const observacao = item.observacao?.trim();
  return { dia, horarios, ...(observacao ? { observacao } : {}) };
}

function construirProgramacao(item: ItemBruto): ProgramacaoDia | null {
  const dia = item.dia?.trim();
  const itens = (item.itens ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!dia) return null;
  return { dia, itens };
}

export async function salvarHorarios(formData: FormData) {
  await garantirSessao();
  const url = "/admin/horarios";

  try {
    let mensagem = "";

    const missas = lerLista(formData, "missas")
      .map(construirMissa)
      .filter((m): m is Missa => m !== null);
    mensagem =
      (await salvarDocumento("missas", missas)) ?? mensagem;

    const confissoes = linhas(formData, "confissoes");
    mensagem = (await salvarDocumento("confissoes", confissoes)) ?? mensagem;

    const programacao = lerLista(formData, "programacao")
      .map(construirProgramacao)
      .filter((p): p is ProgramacaoDia => p !== null);
    mensagem = (await salvarDocumento("programacao", programacao)) ?? mensagem;

    if (mensagem) redirect(`${url}?erro=${encodeURIComponent(mensagem)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

/* ============================================================
 * NotÃ­cias
 * ============================================================ */

const CATEGORIAS_NOTICIA = ["ParÃ³quia", "Diocese", "Igreja", "Aviso"] as const;

function construirNoticia(item: ItemBruto, indice: number): Noticia | null {
  const titulo = item.titulo?.trim();
  if (!titulo) return null;

  const corpo = (item.corpo ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const hoje = new Date().toISOString().slice(0, 10);
  const slug = item.slug?.trim() || slugDe(titulo) || `noticia-${indice + 1}`;
  const categoria = (CATEGORIAS_NOTICIA as readonly string[]).includes(
    item.categoria ?? "",
  )
    ? (item.categoria as Noticia["categoria"])
    : "ParÃ³quia";

  return {
    slug,
    titulo,
    data: item.data?.trim() || hoje,
    categoria: categoria as Noticia["categoria"],
    resumo: (item.resumo ?? "").trim(),
    corpo,
  };
}

export async function salvarNoticias(formData: FormData) {
  await garantirSessao();
  const url = "/admin/noticias";

  try {
    const noticias = lerLista(formData, "noticias")
      .map(construirNoticia)
      .filter((n): n is Noticia => n !== null);

    const erro = await salvarDocumento("noticias", noticias);
    if (erro) redirect(`${url}?erro=${encodeURIComponent(erro)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

/* ============================================================
 * Sacramentos
 * ============================================================ */

function construirSacramento(item: ItemBruto): Sacramento | null {
  const nome = item.nome?.trim();
  if (!nome) return null;

  const paraLista = (v: string) =>
    (v ?? "")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

  return {
    slug: item.slug?.trim() || slugDe(nome),
    nome,
    emoji: item.emoji?.trim() || "âœï¸",
    resumo: (item.resumo ?? "").trim(),
    comoAgendar: paraLista(item.comoAgendar ?? ""),
    documentos: paraLista(item.documentos ?? ""),
    observacoes: paraLista(item.observacoes ?? ""),
  };
}

export async function salvarSacramentos(formData: FormData) {
  await garantirSessao();
  const url = "/admin/sacramentos";

  try {
    const sacramentos = lerLista(formData, "sacramentos")
      .map(construirSacramento)
      .filter((s): s is Sacramento => s !== null);

    const erro = await salvarDocumento("sacramentos", sacramentos);
    if (erro) redirect(`${url}?erro=${encodeURIComponent(erro)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

/* ============================================================
 * Pastorais
 * ============================================================ */

function construirPastoral(item: ItemBruto): Pastoral | null {
  const nome = item.nome?.trim();
  if (!nome) return null;
  return {
    nome,
    emoji: item.emoji?.trim() || "ðŸ•Šï¸",
    descricao: (item.descricao ?? "").trim(),
    encontros: (item.encontros ?? "").trim(),
  };
}

export async function salvarPastorais(formData: FormData) {
  await garantirSessao();
  const url = "/admin/pastorais";

  try {
    const pastorais = lerLista(formData, "pastorais")
      .map(construirPastoral)
      .filter((p): p is Pastoral => p !== null);

    const erro = await salvarDocumento("pastorais", pastorais);
    if (erro) redirect(`${url}?erro=${encodeURIComponent(erro)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

/* ============================================================
 * Comunidades
 * ============================================================ */

function construirComunidade(item: ItemBruto): Comunidade | null {
  const nome = item.nome?.trim();
  if (!nome) return null;
  const horarios = (item.horarios ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    nome,
    padroeiro: (item.padroeiro ?? "").trim(),
    endereco: (item.endereco ?? "").trim(),
    horarios,
  };
}

export async function salvarComunidades(formData: FormData) {
  await garantirSessao();
  const url = "/admin/comunidades";

  try {
    const documento: DocumentoComunidades = {
      lista: lerLista(formData, "lista")
        .map(construirComunidade)
        .filter((c): c is Comunidade => c !== null),
      nota: texto(formData, "nota"),
    };

    const erro = await salvarDocumento("comunidades", documento);
    if (erro) redirect(`${url}?erro=${encodeURIComponent(erro)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

/* ============================================================
 * OraÃ§Ãµes
 * ============================================================ */

export async function salvarOracoes(formData: FormData) {
  await garantirSessao();
  const url = "/admin/oracoes";

  try {
    const padroeiro: Oracao = {
      titulo: texto(formData, "tituloPadroeiro") || "OraÃ§Ã£o de SÃ£o Paulo ApÃ³stolo",
      paragrafos: linhas(formData, "paragrafosPadroeiro"),
    };

    const basicas = lerLista(formData, "basicas")
      .map((item) => {
        const titulo = item.titulo?.trim();
        if (!titulo) return null;
        const paragrafos = (item.paragrafos ?? "")
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean);
        return { titulo, paragrafos } as Oracao;
      })
      .filter((o): o is Oracao => o !== null);

    const documento: DocumentoOracoes = { basicas, padroeiro };

    const erro = await salvarDocumento("oracoes", documento);
    if (erro) redirect(`${url}?erro=${encodeURIComponent(erro)}`);
    redirect(`${url}?salvo=1`);
  } catch (e) {
    if (ehRedirect(e)) throw e;
    redirect(`${url}?erro=${encodeURIComponent(String(e))}`);
  }
}

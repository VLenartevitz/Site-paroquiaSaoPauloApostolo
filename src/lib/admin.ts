/**
 * Autenticação do painel /admin.
 *
 * Acesso com senha única: defina ADMIN_PASSWORD no .env.local (sua
 * máquina) e nas variáveis de ambiente da Netlify (produção).
 *
 * A sessão é um cookie httpOnly com um token derivado da senha
 * (SHA-256 com sal fixo). Não é necessário o Supabase Auth — manter
 * o painel simples para um administrador só.
 */

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const NOME_COOKIE = "painel_sessao";

/** A senha do painel (ADMIN_PASSWORD). */
export const ADMIN_SENHA = process.env.ADMIN_PASSWORD ?? "";

/** Token de sessão derivado da senha (mesma senha → mesmo token). */
export function tokenDeSessao(senha = ADMIN_SENHA): string {
  return createHash("sha256")
    .update(`${senha}|painel-paroquia-sao-paulo-v1`)
    .digest("hex");
}

/** true quando a senha do painel está configurada nas env */
export function painelConfigurado(): boolean {
  return ADMIN_SENHA.length >= 4;
}

/** Compara em tempo constante para não vazar o tamanho/bytes iniciais */
function iguais(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** true se a senha informada confere com ADMIN_PASSWORD */
export function senhaConfere(senha: string): boolean {
  if (!painelConfigurado()) return false;
  return iguais(senha, ADMIN_SENHA);
}

/** Verifica o cookie de sessão do navegador atual */
export async function temSessao(): Promise<boolean> {
  if (!painelConfigurado()) return false;
  const jar = await cookies();
  const valor = jar.get(NOME_COOKIE)?.value;
  if (!valor) return false;
  return iguais(valor, tokenDeSessao());
}

/**
 * Cliente do Supabase (lado servidor apenas).
 *
 * As chaves vêm das variáveis de ambiente (.env.local na sua máquina e
 * "Environment variables" da Netlify). Enquanto não estiverem configuradas,
 * o site funciona normalmente usando os dados locais em `src/data/`.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** true se as chaves do banco estiverem configuradas */
export const temBanco = Boolean(SUPABASE_URL && SERVICE_ROLE_KEY);

let cliente: SupabaseClient | null = null;

/**
 * Cliente com a service_role key — usado apenas no servidor, pois a
 * service_role ignora o RLS e tem acesso total às tabelas.
 */
export function clienteAdmin(): SupabaseClient | null {
  if (!temBanco || !SUPABASE_URL || !SERVICE_ROLE_KEY) return null;
  cliente ??= createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cliente;
}

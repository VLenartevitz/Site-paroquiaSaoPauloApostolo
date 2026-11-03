-- ============================================================
-- Schema do banco (Supabase / Postgres)
-- Execute este arquivo no SQL Editor do Supabase na 1ª vez.
-- ============================================================

create table if not exists public.config (
  chave          text primary key,
  valor          jsonb not null,
  atualizado_em  timestamptz not null default now()
);

comment on table public.config is
  'Documentos de conteúdo do site (jsonb), um por chave: paroquia, tema, missas, sacramentos, noticias etc.';

-- RLS: as páginas públicas leem pelo servidor com service_role (ignora RLS),
-- então negamos acesso direto anônimo por padrão.
alter table public.config enable row level security;

-- (opcional, futuro) policies para o painel escrever com o usuário autenticado:
-- create policy "admin pode editar" on public.config
--   for all to authenticated using (true) with check (true);

-- ============================================================
-- Índice
-- ============================================================
create index if not exists config_chave_idx on public.config (chave);

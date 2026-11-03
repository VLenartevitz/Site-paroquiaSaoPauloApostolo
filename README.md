# Site — Paróquia São Paulo Apóstolo (Pariquera-Açu/SP)

Site oficial da Paróquia São Paulo Apóstolo, em Pariquera-Açu – SP, pertencente à Diocese de Registro.

## Tecnologia

- [Next.js 16](https://nextjs.org) (App Router, modo servidor) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- **Supabase** (opcional) — banco de dados para o futuro painel `/admin`
- Conteúdo em `src/data/` serve como **fallback**: enquanto o Supabase não
  estiver configurado, o site funciona normalmente com esses dados

## Como rodar

```bash
npm install     # apenas na primeira vez
npm run dev     # abre em http://localhost:3000
```

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Estrutura

```
src/
  app/              → páginas do site (rotas) + sitemap/robots
    /admin (futuro) → painel de edição protegido por login
  components/       → Header, Footer, PageHeader, VelaVirtual, BotaoWhatsApp
  lib/
    supabase.ts     → cliente do banco (server-side)
    repositorio.ts  → camada de dados: lê do Supabase com fallback para dados
                      locais
  db/
    schema.sql      → schema das tabelas (rodar no SQL Editor do Supabase)
  data/             → CONTEÚDO PADRÃO/fallback (ver tabela abaixo)
scripts/
  seed.mts          → sobe o conteúdo de src/data/ para o Supabase (npm run db:seed)
```

## Configurando o Supabase (painel admin)

1. Crie o projeto gratuitamente em supabase.com (região São Paulo)
2. **Project Settings → API**: copie `Project URL` e `service_role key`
3. Copie `.env.example` → `.env.local` e preencha:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Rode o `schema.sql` (src/db/schema.sql) no **SQL Editor** do Supabase
5. Sow o conteúdo: `npm run db:seed`
6. Na Netlify: **Site configuration → Environment variables** → cadastre as
   mesmas duas chaves (nunca as suba ao GitHub)

As contas dos membros da pastoral ficam em **Authentication → Users** do
Supabase (e-mail + senha) e o `/admin` sempre verificará essas contas.

## Deploy (Netlify)

Camada de build definida pelo `netlify.toml`:

| Campo            | Valor            |
| ---------------- | ---------------- |
| Build command    | `npm run build`  |
| Publish directory| `.next`          |

⚠️ O site agora é **dinâmico** (modo servidor do Next.js). A Netlify detecta
Next.js e aplica o runtime oficial automaticamente. Se um deploy falhar, o
site anterior continua no ar.

## Dados reais já confirmados

- Endereço: Rua João Araujo Rangel, 82 – Pariquera-Açu/SP
- Telefone/WhatsApp da paróquia: (13) 3856-1282
- Diocese de Registro · Pároco: Pe. Gilberto França
- Instagram: [@paroquiaspapariquera](https://www.instagram.com/paroquiaspapariquera/) ·
  Facebook: [Paróquia São Paulo Apóstolo Pariquera-Açu](https://www.facebook.com/saopauloapostolopariquera/)

Os demais dados (horários de missa, chave Pix, história completa, capelas)
estão marcados como placeholders e devem ser confirmados com a secretaria.

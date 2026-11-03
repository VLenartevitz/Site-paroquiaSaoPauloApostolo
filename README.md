# Site — Paróquia São Paulo Apóstolo (Pariquera-Açu/SP)

Site oficial da Paróquia São Paulo Apóstolo, em Pariquera-Açu – SP, pertencente à Diocese de Registro.

## Tecnologia

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- Sem backend: todo o conteúdo fica em arquivos de dados em `src/data/`

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
    page.tsx        → Início
    /horarios       → Missas, confissões e programação da semana
    /paroquia       → História e clero
    /padroeiro      → Vida de São Paulo Apóstolo
    /comunidades    → Matriz e capelas
    /sacramentos    → Batismo, Eucaristia, Crisma, Matrimônio, Confissão, Unção
    /pastorais      → Pastorais e movimentos
    /noticias       → Notícias e avisos
    /oracoes        → Orações tradicionais + oração ao padroeiro
    /vela-virtual   → Capela virtual (acender vela com intenção)
    /dizimo         → Seja dizimista
    /contato        → Secretaria, telefone, WhatsApp e mapa
  components/       → Header, Footer, PageHeader, VelaVirtual, BotaoWhatsApp
  data/             → CONTEÚDO EDITÁVEL (ver abaixo)
```

## Como atualizar o conteúdo ⚠️

Todo o conteúdo está centralizado em `src/data/` e marcado com `⚠️ PLACEHOLDER`:

| Arquivo          | O que contém                                                        |
| ---------------- | ------------------------------------------------------------------- |
| `paroquia.ts`    | Nome, endereço, telefone, redes, pároco, horário da secretaria       |
| `horarios.ts`    | Horários de missas, confissões e programação da semana (placeholders)|
| `sacramentos.ts` | Orientações de agendamento e documentos de cada sacramento           |
| `pastorais.ts`   | Lista de pastorais/movimentos ativos e seus encontros                |
| `comunidades.ts` | Matriz e capelas da paróquia                                         |
| `noticias.ts`    | Notícias e avisos (exemplos de demonstração)                         |
| `oracoes.ts`     | Orações básicas e oração a São Paulo Apóstolo                        |

Depois de editar, salve o arquivo — em modo `dev` as alterações aparecem na hora;
em produção, rode `npm run build` novamente.

## Dados reais já confirmados

- Endereço: Rua João Araujo Rangel, 82 – Pariquera-Açu/SP
- Telefone/WhatsApp da paróquia: (13) 3856-1282
- Diocese de Registro · Pároco: Pe. Gilberto França
- Instagram: [@paroquiaspapariquera](https://www.instagram.com/paroquiaspapariquera/) ·
  Facebook: [Paróquia São Paulo Apóstolo Pariquera-Açu](https://www.facebook.com/saopauloapostolopariquera/)

Os demais dados (horários de missa, chave Pix, história completa, capelas)
estão marcados como placeholders e devem ser confirmados com a secretaria.

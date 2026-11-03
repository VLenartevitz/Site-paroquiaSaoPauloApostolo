/**
 * Páginas dos sacramentos.
 *
 * ⚠️ PLACEHOLDER: orientações genéricas. Ajuste conforme o costume da paróquia
 *    (documentos exigidos, valores, cursos, datas de inscrição).
 */
export type Sacramento = {
  slug: string;
  nome: string;
  emoji: string;
  resumo: string;
  comoAgendar: string[];
  documentos: string[];
  observacoes: string[];
};

export const sacramentos: Sacramento[] = [
  {
    slug: "batismo",
    nome: "Batismo",
    emoji: "🕊️",
    resumo:
      "O primeiro sacramento: pelo batismo a pessoa se torna filha de Deus e membro da Igreja. As crianças são apresentadas pelos pais, e adultos preparam-se pelo Catecumenato.",
    comoAgendar: [
      "Procure a secretaria paroquial em horário de atendimento, levando os documentos abaixo.",
      "Participe do encontro de preparação para pais e padrinhos (consulte datas).",
      "Escolha o horário da celebração (normalmente nos finais de semana, na Missa ou fora dela).",
    ],
    documentos: [
      "Certidão de nascimento da criança",
      "Documento de identificação dos pais (cópias)",
      "Documentos dos padrinhos (batizados e, se casados, certidão de casamento religioso)",
      "Comprovante de residência",
    ],
    observacoes: [
      "Os padrinhos devem ser católicos praticantes, crismados.",
      "Agende com antecedência mínima sugerida de 15 dias.",
    ],
  },
  {
    slug: "eucaristia",
    nome: "Eucaristia (Primeira Comunhão)",
    emoji: "🍞",
    resumo:
      "Jesus se faz presente no pão e no vinho consagrados. A preparação para a Primeira Eucaristia é feita pela catequese paroquial.",
    comoAgendar: [
      "Inscreva-se na catequese paroquial na secretaria, no período divulgado.",
      "A preparação acontece em encontros semanais ao longo do ano.",
      "A data da celebração é definida pela coordenação da catequese.",
    ],
    documentos: [
      "Certidão de nascimento",
      "Comprovante de endereço",
      "Certidão de batismo (se batizado em outra paróquia)",
    ],
    observacoes: [
      "Há turmas para crianças e catequese de adultos.",
      "Contribuição para material e formação conforme comunicado na inscrição.",
    ],
  },
  {
    slug: "crisma",
    nome: "Crisma",
    emoji: "🔥",
    resumo:
      "No Crisma, o batizado recebe o dom especial do Espírito Santo e é confirmado como testemunho maduro da fé. A preparação inclui encontros, retiros e vivências.",
    comoAgendar: [
      "Fique atento ao período de inscrição divulgado nas redes sociais e nos avisos.",
      "A frequência aos encontros é obrigatória para a celebração.",
      "O sacramento é ministrado pelo bispo ou por padre delegado, em data definida pela Diocese.",
    ],
    documentos: [
      "Certidão de batismo atualizada",
      "Documento de identidade",
      "Comprovante de residência",
    ],
    observacoes: [
      "Jovens a partir de 15 anos e adultos.",
      "Escolha um padrinho/madrinha crismado(a) e praticante.",
    ],
  },
  {
    slug: "matrimonio",
    nome: "Matrimônio",
    emoji: "💍",
    resumo:
      "O casamento religioso é celebração do amor do casal, que vive a aliança sacramental diante de Deus e da comunidade.",
    comoAgendar: [
      "Agende a data no máximo com 6 meses de antecedência, na secretaria.",
      "Participe da entrevista preparatória com o pároco e do curso de noivos.",
      "Reúna os documentos exigidos e entregue na secretaria até a data combinada.",
    ],
    documentos: [
      "Certidões de batismo recentes (emitidas há menos de 6 meses)",
      "RG e CPF dos noivos",
      "Comprovante de residência",
      "Certidão de casamento civil (se já casados no civil)",
    ],
    observacoes: [
      "Ao menos um dos noivos deve ser batizado católico (para casamento canônico).",
      "Padrinhos e testemunhas serão definidos nas entrevistas.",
    ],
  },
  {
    slug: "confissao",
    nome: "Confissão (Penitência)",
    emoji: "🙏",
    resumo:
            "Deus nos oferece perdão e paz. A confissão é um momento de reconciliação com Deus e com a comunidade.",
    comoAgendar: [
      "Confissões dentro dos horários fixos do dia (conforme página de Horários).",
      "Para atender em horário especial, procure o padre ou agende pela secretaria.",
    ],
    documentos: [],
    observacoes: [
      "Há confessionário na igreja, com sigilo garantido.",
      "Antes da primeira confissão, as crianças passam pela catequese de preparação.",
    ],
  },
  {
    slug: "uncao-dos-enfermos",
    nome: "Unção dos Enfermos",
    emoji: "✝️",
    resumo:
      "A Unção dos Enfermos fortalece doentes e idosos com a graça de Deus. Não é sacramento só para o fim da vida: Deus deseja cura e consolo.",
    comoAgendar: [
      "Procure a secretaria ou entre em contato pelo WhatsApp para solicitar a visita do padre.",
      "Para internações hospitalares, comunique a família/pastoral de enfermagem local.",
    ],
    documentos: [],
    observacoes: [
      "Procure pedir a Unção no início de doenças graves, não apenas em momentos de urgência.",
      "As visitas aos enfermos podem ser agendadas em horário combinado.",
    ],
  },
];

export function getSacramento(slug: string): Sacramento | undefined {
  return sacramentos.find((s) => s.slug === slug);
}

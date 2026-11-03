/**
 * Notícias e avisos paroquiais.
 *
 * ⚠️ PLACEHOLDER: os textos abaixo são exemplos para demonstração do layout.
 *    Substitua pelas notícias reais da paróquia.
 */
export type Noticia = {
  slug: string;
  titulo: string;
  data: string; // formato: AAAA-MM-DD
  categoria: "Paróquia" | "Diocese" | "Igreja" | "Aviso";
  resumo: string;
  corpo: string[];
};

/** Notícias marcadas como aviso aparecem também na home, em "Avisos" */
export const noticias: Noticia[] = [
  {
    slug: "missa-finados-2-novembro",
    titulo: "Missa de Finados no dia 2 de novembro",
    data: "2026-11-01",
    categoria: "Paróquia",
    resumo:
      "A paróquia celebra a Santa Missa em intenção dos fiéis defuntos, no dia 2 de novembro, às 19h, na Igreja Matriz.",
    corpo: [
      "A Paróquia São Paulo Apóstolo convida toda a comunidade para a Santa Missa de Finados, no dia 2 de novembro, às 19h, na Igreja Matriz.",
      "A celebração reunirá as famílias em oração pelos seus entes queridos, sendo um momento de consolação e esperança na vida eterna que Cristo nos promete.",
      "Leve a lista dos nomes que deseja oferecer no altar. Confira o local no anúncio nas redes sociais paroquiais.",
    ],
  },
  {
    slug: "missa-pelas-familias-sabado",
    titulo: "Missa pelas Famílias acontece aos sábados",
    data: "2026-10-28",
    categoria: "Paróquia",
    resumo:
      "Toda a comunidade é convidada para a Missa das Famílias, com Terço às 19h e Santa Missa às 19h30.",
    corpo: [
      "Aos sábados, a Paróquia São Paulo Apóstolo celebra a Missa das Famílias: começa a Santo Terço às 19h e a Santa Missa às 19h30.",
      "As missas aos sábados seguem a liturgia dominical, formando um momento especial de oração para as famílias de Pariquera-Açu.",
      "Traga sua família e convide os vizinhos!",
    ],
  },
  {
    slug: "catequese-inscricoes",
    titulo: "Inscrições abertas para a catequese",
    data: "2026-10-20",
    categoria: "Aviso",
    resumo:
      "Podem inscrever-se crianças e jovens para a preparação da Primeira Eucaristia e do Crisma, em horário da secretaria.",
    corpo: [
      "As inscrições para a catequese paroquial estão abertas. As famílias que desejam preparar seus filhos para os sacramentos da Eucaristia e do Crisma devem procurar a secretaria paroquial.",
      "Documentos necessários: certidão de nascimento, comprovante de residência e certidão de batismo (se já batizado em outra paróquia).",
      "Confirme horários das turmas e valores diretamente na secretaria.",
    ],
  },
];

export function getDataFormatada(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

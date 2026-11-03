/**
 * Pastorais, movimentos e grupos da paróquia.
 *
 * ⚠️ PLACEHOLDER: a lista abaixo é recorrente em paróquias, mas confirme quais
 *    estão ativas na Paróquia São Paulo Apóstolo e os horários/dias dos
 *    encontros. Edite este arquivo para atualizar.
 */
export type Pastoral = {
  nome: string;
  emoji: string;
  descricao: string;
  encontros: string;
};

export const pastorais: Pastoral[] = [
  {
    nome: "Catequese",
    emoji: "📖",
    descricao:
      "Prepara crianças, jovens e adultos para os sacramentos da Eucaristia e do Crisma, com encontros de formação na fé.",
    encontros: "Semanais — horários definidos por turma, na secretaria",
  },
  {
    nome: "Pastoral da Acolhida",
    emoji: "🤝",
    descricao:
      "Recebe a comunidade na entrada da igreja, organiza as celebrações e cuida para que todos se sintam em casa.",
    encontros: "Escala nas missas de fim de semana",
  },
  {
    nome: "Acólitos e Coroinhas",
    emoji: "🕯️",
    descricao:
      "Servem ao altar durante as celebrações, apoiando o padre na liturgia, com formação contínua.",
    encontros: "Mensais — agendados pelo grupo",
  },
  {
    nome: "Ministério de Música",
    emoji: "🎶",
    descricao:
      "Animam os cantos das missas e celebrações, ensaiando semanalmente e servindo à liturgia com a beleza da música.",
    encontros: "Ensaios semanais — consulte a coordenação",
  },
  {
    nome: "Legião de Maria",
    emoji: "🙏",
    descricao:
      "Devoção mariana com oração em duplas, visitas a famílias e enfermos, e trabalho apostólico sob orientação de Nossa Senhora.",
    encontros: "Semanais — curia local",
  },
  {
    nome: "Apostolado da Oração",
    emoji: "❤️",
    descricao:
      "Grupos (vexilares) que rezam pelas intenções da Igreja e da paróquia, dedicando o dia a Deus com o Ofício da Imaculada Conceição.",
    encontros: "Mensais, nas casas dos membros",
  },
  {
    nome: "Pastoral da Criança",
    emoji: "👶",
    descricao:
      "Acompanha gestantes e crianças até 6 anos com atenção à saúde, nutrição e espiritualidade, no bairro e na comunidade.",
    encontros: "Semanais — consulte a coordenação",
  },
  {
    nome: "Sociedade de São Vicente de Paulo",
    emoji: "🍞",
    descricao:
      "Assistência fraterna a famílias em situação de vulnerabilidade, com visitas domiciliares e apoio material.",
    encontros: "Semanais — casa do grupo",
  },
  {
    nome: "Pastoral Juvenil",
    emoji: "⚡",
    descricao:
      "Reúne jovens da comunidade para vivência de fé, encontros, eventos e campanhas, formando novos líderes.",
    encontros: "Semanais — salão paroquial",
  },
  {
    nome: "Pastoral da Saúde",
    emoji: "🩺",
    descricao:
      "Visita enfermos, acompanha famílias e promove ações de saúde e bem-estar, levando conforto e oração.",
    encontros: "Quinzenais",
  },
  {
    nome: "Pastoral Familiar",
    emoji: "👨‍👩‍👧‍👦",
    descricao:
      "Atende casais e famílias com cursos de preparação ao matrimônio, encontros de casais e apoio à vida familiar.",
    encontros: "Mensais",
  },
  {
    nome: "Grupo de Oração (RCC)",
    emoji: "🔥",
    descricao:
      "Encontros de oração, louvor e formação na experiência do Espírito Santo, no espírito da Renovação Carismática Católica.",
    encontros: "Quinzenais",
  },
];

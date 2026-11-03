/**
 * Horários de missas, confissões e programação da semana.
 *
 * ⚠️ PLACEHOLDER: os horários abaixo são ilustrativos. Os horários oficiais
 *    ainda não estavam publicados. Confirme com a secretaria e ajuste aqui —
 *    este é o único lugar que precisa ser editado.
 */

export type Missa = {
  dia: string;
  horarios: string[];
  observacao?: string;
};

export const missas: Missa[] = [
  { dia: "Terça-feira", horarios: ["19h"] },
  { dia: "Quinta-feira", horarios: ["19h30"] },
  { dia: "Sábado", horarios: ["19h"], observacao: "Missa das Famílias (veja avisos)" },
  { dia: "Domingo", horarios: ["8h", "19h"] },
];

export const confissoes: string[] = [
  "Sábado: 9h às 11h",
  "Também sob agendamento na secretaria.",
];

export type ProgramacaoDia = {
  dia: string;
  itens: string[];
};

export const programacaoSemana: ProgramacaoDia[] = [
  {
    dia: "Domingo",
    itens: ["Santa Missa – 8h", "Santa Missa – 19h"],
  },
  {
    dia: "Segunda-feira",
    itens: ["Encontros das pastorais e grupos – consulte a agenda"],
  },
  {
    dia: "Terça-feira",
    itens: ["Santa Missa – 19h"],
  },
  {
    dia: "Quarta-feira",
    itens: ["Encontros de catequese – consulte os horários na secretaria"],
  },
  {
    dia: "Quinta-feira",
    itens: ["Santa Missa – 19h30"],
  },
  {
    dia: "Sexta-feira",
    itens: ["Devotionais e celebrações – consulte a agenda"],
  },
  {
    dia: "Sábado",
    itens: ["Santa Missa – 19h", "Confissões – 9h às 11h"],
  },
];

export const avisoHorarios =
  "Horários sujeitos a alteração em dias santos e durante a semana santa. " +
  "Recomendamos confirmar com a secretaria paroquial ou pelas redes sociais oficiais.";

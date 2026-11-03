/**
 * Comunidades e capelas da paróquia.
 *
 * ⚠️ PLACEHOLDER: só a Matriz é informação confirmada. Confirme as capelas e
 *    comunidades pertencentes à paróquia (nomes, padroeiros, endereços e
 *    horários próprios) com a secretaria e preencha a lista abaixo.
 */
export type Comunidade = {
  nome: string;
  padroeiro: string;
  endereco: string;
  horarios: string[];
};

export const matriz: Comunidade = {
  nome: "Igreja Matriz São Paulo Apóstolo",
  padroeiro: "São Paulo Apóstolo (festa: 25 de janeiro)",
  endereco: "Rua João Araujo Rangel, 82 – Centro, Pariquera-Açu/SP",
  horarios: ["Confira os horários de missas na página Horários"],
};

/**
 * Lista de capelas/comunidades — preencher com dados reais.
 * Deixamos a matriz como único item confirmado; os demais devem ser agregados
 * conforme informação da secretaria.
 */
export const comunidades: Comunidade[] = [
  matriz,
];

export const notaComunidades =
  "As demais capelas e comunidades da Paróquia São Paulo Apóstolo estão sendo catalogadas; " +
  "os nomes, padroeiros e horários de celebração de cada uma serão incluídos aqui em breve. " +
  "Fale com a secretaria paroquial para informações atualizadas.";

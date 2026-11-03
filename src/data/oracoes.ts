/**
 * Orações básicas e oração ao padroeiro.
 * Textos de domínio público (orações tradicionais da Igreja Católica).
 */
export type Oracao = {
  titulo: string;
  paragrafos: string[];
};

export const oracoesBasicas: Oracao[] = [
  {
    titulo: "Sinal da Cruz",
    paragrafos: [
      "Pelo sinal da Santa Cruz, livra-me, ó Deus, dos meus inimigos. Em nome do Pai, do Filho e do Espírito Santo. Amém.",
    ],
  },
  {
    titulo: "Pai-Nosso",
    paragrafos: [
      "Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu.",
      "O pão nosso de cada dia nos dai hoje; perdoai as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
    ],
  },
  {
    titulo: "Ave-Maria",
    paragrafos: [
      "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.",
      "Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.",
    ],
  },
  {
    titulo: "Gloria ao Pai",
    paragrafos: [
      "Gloria ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
    ],
  },
  {
    titulo: "Credo (Símbolo dos Apóstolos)",
    paragrafos: [
      "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ao terceiro dia ressuscitou; subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos.",
      "Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
    ],
  },
  {
    titulo: "Salve-Rainha",
    paragrafos: [
      "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!",
      "A vós bradamos, os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",
    ],
  },
  {
    titulo: "Angelus",
    paragrafos: [
      "V. O Anjo do Senhor anunciou a Maria. — R. E ela concebeu do Espírito Santo. (Ave-Maria)",
      "V. Eis a serva do Senhor. — R. Faça-se em mim a vossa palavra. (Ave-Maria)",
      "V. E o Verbo de Deus se fez carne. — R. E habitou entre nós. (Ave-Maria)",
      "V. Rogai por nós, Santa Mãe de Deus. — R. Para que sejamos dignos das promessas de Cristo.",
      "Oremos: Infundi, Senhor, em nossas almas a vossa graça, para que, os que conhecemos pela anunciação do Anjo a encarnação do vosso Filho, Cheguemos, pelo mérito da sua Paixão e da sua Cruz, à glória da ressurreição. Pelo mesmo Jesus Cristo, nosso Senhor. Amém.",
    ],
  },
];

/** Oração especial ao padroeiro da paróquia */
export const oracaoSaoPaulo: Oracao = {
  titulo: "Oração a São Paulo Apóstolo",
  paragrafos: [
    "Ó São Paulo Apóstolo, farol que iluminou o mundo inteiro com a luz do Evangelho, fonte perene de sabedoria e coragem da Igreja, vinde em nosso socorro!",
    "Vós, que peregrinastes pelo mundo anunciando Jesus crucificado e ressuscitado, intercedi por nossa paróquia de Pariquera-Açu, para que, ouvindo a vossa palavra, cresçamos na fé, na esperança e na caridade.",
    "Ensinai-nos a imitar vosso zelo missionário: que ninguém em nossa comunidade permanece sem ouvir a Boa Nova, e que as famílias sejam formadas no amor de Deus.",
    "Obtende-nos, pela vossa poderosa intercessão, as graças de que mais precisamos nesta vida, e, no fim, a felicidade eterna, onde habitais com Cristo, nosso Senhor.",
    "São Paulo Apóstolo, rogai por nós! Amém.",
  ],
};

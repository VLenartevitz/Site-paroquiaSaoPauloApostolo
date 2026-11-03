/**
 * Dados principais da Paróquia.
 *
 * ✅ Dados reais (verificados publicamente): endereço, telefone, redes sociais,
 *    diocese e pároco.
 * ⚠️ PLACEHOLDER: campos marcados com TODO precisam ser confirmados com a
 *    secretaria paroquial.
 */
export const paroquia = {
  nome: "Paróquia São Paulo Apóstolo",
  lema: "Uma comunidade de fé, esperança e caridade",
  cidade: "Pariquera-Açu",
  estado: "SP",
  diocese: "Diocese de Registro",
  padroeiro: "São Paulo Apóstolo",
  festaPadroeiro: "25 de janeiro (Conversão de São Paulo Apóstolo)",

  // ✅ Dados reais
  endereco: "Rua João Araujo Rangel, 82 – Pariquera-Açu/SP",
  telefone: "(13) 3856-1282",
  telefoneLink: "tel:+551338561282",
  whatsapp: "551338561282",
  paroco: "Pe. Gilberto França",

  // ⚠️ TODO: confirmar e-mail e horário da secretaria com a paróquia
  email: "",
  horarioSecretaria: [
    "Segunda a sexta: 8h às 12h e 13h às 17h (a confirmar)",
  ],

  // ✅ Redes sociais oficiais
  instagram: "https://www.instagram.com/paroquiaspapariquera/",
  facebook: "https://www.facebook.com/saopauloapostolopariquera/",

  // Link para o Google Maps com o endereço da paróquia
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Rua João Araujo Rangel, 82, Pariquera-Açu - SP"),
  mapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Rua João Araujo Rangel, 82, Pariquera-Açu - SP") +
    "&output=embed",

  whatsappUrl:
    "https://wa.me/551338561282?text=" +
    encodeURIComponent("Olá! Vim pelo site da Paróquia São Paulo Apóstolo."),
};

/** Itens do "Fale conosco" exibidos em várias páginas */
export const contatoCards = [
  {
    titulo: "Secretaria Paroquial",
    linhas: [paroquia.endereco, `Telefone: ${paroquia.telefone}`],
  },
  {
    titulo: "Horário de atendimento",
    linhas: paroquia.horarioSecretaria,
  },
  {
    titulo: "Redes sociais",
    linhas: [
      "Instagram: @paroquiaspapariquera",
      "Facebook: Paróquia São Paulo Apóstolo Pariquera-Açu",
    ],
  },
];

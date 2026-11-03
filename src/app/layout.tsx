import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { getParoquia } from "@/lib/repositorio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const paroquia = await getParoquia();
  return {
    title: {
      default: `${paroquia.nome} — ${paroquia.cidade}/${paroquia.estado}`,
      template: `%s — ${paroquia.nome}`,
    },
    description: `Site oficial da ${paroquia.nome}, de ${paroquia.cidade}/${paroquia.estado} (${paroquia.diocese}): horários de missas, sacramentos, pastorais, notícias e avisos.`,
    openGraph: {
      title: `${paroquia.nome} — ${paroquia.cidade}/${paroquia.estado}`,
      description: paroquia.lema,
      type: "website",
      locale: "pt_BR",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paroquia = await getParoquia();

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-800">
        <Header paroquia={paroquia} />
        <main className="flex-1">{children}</main>
        <Footer paroquia={paroquia} />
        <BotaoWhatsApp paroquia={paroquia} />
      </body>
    </html>
  );
}

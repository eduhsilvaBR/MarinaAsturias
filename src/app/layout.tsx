import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const libre = Libre_Franklin({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Marina Astúrias — A melhor marina do Brasil",
  description:
    "Porto Marina Astúrias, no Guarujá: 72 mil m² de área total, capacidade para mais de 500 embarcações, hangares fechados, heliponto e gastronomia à beira do Canal de Santos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${libre.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

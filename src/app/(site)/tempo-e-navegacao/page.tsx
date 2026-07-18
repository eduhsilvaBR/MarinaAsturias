import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Tempo e Navegação — Marina Astúrias",
  description: "Previsão do tempo e tábua de marés para o Canal de Santos.",
};

export default function TempoENavegacaoPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden bg-navy-deep">
        <Image
          src="https://marinasturias.com.br/wp-content/uploads/2021/03/conheca-1.jpg"
          alt="Tempo e Navegação"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">TÁBUA DE MARÉS</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Tempo e Navegação</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Reveal className="mb-8 max-w-2xl text-[15px] leading-relaxed text-cream/70">
          Acompanhe a previsão do tempo e a tábua de marés do Canal de Santos antes de zarpar.
        </Reveal>
        <Reveal className="overflow-hidden rounded-sm border border-cream/10 bg-white">
          <iframe
            src="https://www.climatempo.com.br/tabua-de-mares"
            title="ClimaTempo — Tábua de Marés"
            width="100%"
            height="700"
            style={{ border: 0, display: "block" }}
            loading="lazy"
          />
        </Reveal>
      </section>
    </>
  );
}

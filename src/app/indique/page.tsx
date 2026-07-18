import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Indique — Marina Astúrias",
  description: "Indique a Porto Marina Astúrias para um amigo.",
};

export default function IndiquePage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden bg-navy-deep">
        <Image
          src="https://marinasturias.com.br/wp-content/uploads/2021/03/indique-1.jpg"
          alt="Indique a Marina Astúrias"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">INDIQUE</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Indique nosso site</h1>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20 lg:px-10">
        <Reveal>
          <p className="mb-10 text-[15px] leading-relaxed text-cream/70">
            Indique o nosso site utilizando o formulário abaixo.
          </p>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}

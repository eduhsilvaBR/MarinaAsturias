import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { siteInfo } from "@/content/site";

export const metadata: Metadata = {
  title: "Fale Conosco — Marina Astúrias",
  description: "Entre em contato com a Porto Marina Astúrias.",
};

export default function FaleConoscoPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden bg-navy-deep">
        <Image
          src="https://marinasturias.com.br/wp-content/uploads/2021/03/faleconosco-1.jpg"
          alt="Fale Conosco"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">CONTATO</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Fale Conosco</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-cream/70">
            A Central de Atendimento é um canal direto de comunicação e prestação de serviço da Porto Marina
            Astúrias com seus clientes.
          </p>

          <dl className="mt-10 flex flex-col gap-6 text-sm">
            <div>
              <dt className="text-xs tracking-[0.15em] text-gold">ENDEREÇO</dt>
              <dd className="mt-2 text-cream/75">{siteInfo.address}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.15em] text-gold">TELEFONES</dt>
              <dd className="mt-2 text-cream/75">{siteInfo.phones.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.15em] text-gold">WHATSAPP</dt>
              <dd className="mt-2">
                <a href={siteInfo.whatsappHref} target="_blank" rel="noreferrer" className="text-cream/75 hover:text-gold">
                  {siteInfo.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.15em] text-gold">HORÁRIO</dt>
              <dd className="mt-2 text-cream/75">{siteInfo.hours}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.15em] text-gold">COORDENADAS</dt>
              <dd className="mt-2 text-cream/75">{siteInfo.coords}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}

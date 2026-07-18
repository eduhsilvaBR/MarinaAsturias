import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { eventos } from "@/content/site";

export const metadata: Metadata = {
  title: "Eventos — Marina Astúrias",
  description: "Eventos realizados na Porto Marina Astúrias, no Guarujá.",
};

export default function EventosPage() {
  return (
    <>
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden bg-navy-deep">
        <Image
          src={eventos.hero}
          alt="Eventos na Marina Astúrias"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 25%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">EVENTOS</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Eventos na Marina</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-cream/70">{eventos.intro}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <Reveal className="mb-10">
          <span className="text-xs tracking-[0.3em] text-gold">{eventos.featured.title.toUpperCase()}</span>
          <div className="mt-4 flex flex-col gap-4 sm:max-w-xl">
            {eventos.featured.paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-cream/75">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <GalleryGrid images={eventos.featured.gallery} />

        <Reveal className="mt-14 text-center">
          <p className="text-[15px] text-cream/70">Quer realizar seu evento na Marina Astúrias?</p>
          <Link
            href="/fale-conosco"
            className="mt-6 inline-block border border-gold bg-gold px-8 py-3.5 text-[13px] tracking-[0.15em] text-navy-deep transition-colors hover:bg-transparent hover:text-gold"
          >
            FALE CONOSCO
          </Link>
        </Reveal>
      </section>
    </>
  );
}

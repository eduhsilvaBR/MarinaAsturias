import type { Metadata } from "next";
import Image from "next/image";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { fullGallery } from "@/content/site";

export const metadata: Metadata = {
  title: "Galeria — Marina Astúrias",
  description: "Fotos da Porto Marina Astúrias no Guarujá.",
};

export default function GaleriaPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden bg-navy-deep">
        <Image
          src="https://marinasturias.com.br/wp-content/uploads/2021/03/destaques-1.jpg"
          alt="Galeria Marina Astúrias"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">GALERIA</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Galeria de Imagens</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal className="mb-10 max-w-2xl text-[15px] leading-relaxed text-cream/70">
          Um pouco da estrutura, das embarcações e dos momentos vividos na Porto Marina Astúrias.
        </Reveal>
        <GalleryGrid images={fullGallery} />
      </section>
    </>
  );
}

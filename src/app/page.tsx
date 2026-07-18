import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import Counter from "@/components/Counter";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { homeGallery, siteInfo, testimonials } from "@/content/site";

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center lg:px-10">
        <Reveal>
          <span className="text-xs tracking-[0.3em] text-gold">A MARINA</span>
          <h2 className="mt-5 font-serif text-4xl font-medium text-cream sm:text-5xl">
            Conheça a Marina Astúrias
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-cream/70">{siteInfo.boilerplate}</p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="border-y border-cream/10 bg-navy-deep">
        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-cream/10 px-0 lg:grid-cols-4" stagger={0.12}>
          {siteInfo.stats.map((stat) => (
            <RevealItem key={stat.label} className="bg-navy-deep px-8 py-14 text-center">
              <div className="font-serif text-4xl text-gold sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-xs tracking-[0.15em] text-cream/60">{stat.label.toUpperCase()}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Gastronomia */}
      <section className="mx-auto grid max-w-7xl items-center gap-0 lg:grid-cols-2">
        <Reveal className="relative h-[380px] lg:h-[520px]">
          <Image
            src="https://marinasturias.com.br/wp-content/uploads/2021/04/gastronomia_home.jpg"
            alt="Gastronomia na Marina Astúrias"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.15} className="px-6 py-20 lg:px-16">
          <span className="text-xs tracking-[0.3em] text-gold">GASTRONOMIA</span>
          <h3 className="mt-4 font-serif text-3xl font-medium text-cream sm:text-4xl">
            Piscina, lanchonete e restaurante exclusivo
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/70">
            Dentro da Marina também há ótimas opções em sua área gastronômica. Possui piscina e lanchonete,
            além de um restaurante de espaço exclusivo para marinheiros e funcionários, com destaque para os
            pratos mediterrâneos e a variedade de camarões.
          </p>
          <Link
            href="/gastronomia"
            className="mt-7 inline-block border-b border-gold pb-1 text-xs tracking-[0.15em] text-gold transition-opacity hover:opacity-70"
          >
            SAIBA MAIS →
          </Link>
        </Reveal>
      </section>

      {/* Heliponto */}
      <section className="mx-auto grid max-w-7xl items-center gap-0 lg:grid-cols-2">
        <Reveal className="order-2 px-6 py-20 lg:order-1 lg:px-16">
          <span className="text-xs tracking-[0.3em] text-gold">HELIPONTO</span>
          <h3 className="mt-4 font-serif text-3xl font-medium text-cream sm:text-4xl">
            Pousos e decolagens homologados
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/70">
            A Porto Marina Astúrias possui um heliponto devidamente homologado pelo Departamento de Aviação
            Civil e disponível para pousos e decolagens, inclusive com espaço para estacionamento temporário
            dos helicópteros.
          </p>
          <Link
            href="/heliponto"
            className="mt-7 inline-block border-b border-gold pb-1 text-xs tracking-[0.15em] text-gold transition-opacity hover:opacity-70"
          >
            SAIBA MAIS →
          </Link>
        </Reveal>
        <Reveal delay={0.15} className="order-1 relative h-[380px] lg:order-2 lg:h-[520px]">
          <Image
            src="https://marinasturias.com.br/wp-content/uploads/2021/04/heliponto_home.jpg"
            alt="Heliponto da Marina Astúrias"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </section>

      {/* Gallery teaser */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <Reveal className="mb-12 text-center">
          <span className="text-xs tracking-[0.3em] text-gold">GALERIA</span>
          <h3 className="mt-4 font-serif text-4xl font-medium text-cream">Um pouco da nossa marina</h3>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" stagger={0.05}>
          {homeGallery.map((src, i) => (
            <RevealItem key={src} y={16} className="relative aspect-square overflow-hidden">
              <Link href="/galeria" className="group block h-full w-full">
                <Image
                  src={src}
                  alt={`Marina Astúrias — foto ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy-deep/0 transition-colors duration-500 group-hover:bg-navy-deep/20" />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10 text-center">
          <Link
            href="/galeria"
            className="inline-block border border-gold/70 px-8 py-3.5 text-[13px] tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
          >
            VER GALERIA COMPLETA
          </Link>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="border-t border-cream/10 bg-navy-deep">
        <div className="mx-auto max-w-6xl px-6 py-28 lg:px-10">
          <Reveal className="mb-14 text-center">
            <span className="text-xs tracking-[0.3em] text-gold">NOSSOS CLIENTES</span>
            <h3 className="mt-4 font-serif text-4xl font-medium text-cream">Opiniões</h3>
          </Reveal>
          <RevealGroup className="grid gap-8 sm:grid-cols-3" stagger={0.12}>
            {testimonials.map((t) => (
              <RevealItem key={t.name} className="border border-cream/10 px-8 py-10 text-center">
                <div className="text-xs tracking-[0.15em] text-gold">{t.tag.toUpperCase()}</div>
                <p className="mt-5 font-serif text-xl italic leading-snug text-cream/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 text-xs tracking-[0.15em] text-cream/50">{t.name.toUpperCase()}</div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10">
        <Reveal>
          <h3 className="font-serif text-3xl font-medium text-cream sm:text-4xl">
            Venha conhecer a melhor marina do Brasil
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-cream/70">{siteInfo.address}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <a
              href={siteInfo.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="border border-gold bg-gold px-8 py-3.5 text-[13px] tracking-[0.15em] text-navy-deep transition-colors hover:bg-transparent hover:text-gold"
            >
              WHATSAPP {siteInfo.whatsapp}
            </a>
            <Link
              href="/fale-conosco"
              className="border border-cream/40 px-8 py-3.5 text-[13px] tracking-[0.15em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              FALE CONOSCO
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

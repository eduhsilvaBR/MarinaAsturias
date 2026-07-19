import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { getCoverPhoto, readEvents } from "@/lib/store";

export const metadata: Metadata = {
  title: "Eventos — Marina Astúrias",
  description: "Eventos realizados na Porto Marina Astúrias, no Guarujá.",
};

export const dynamic = "force-dynamic";

export default async function EventosPage() {
  const events = await readEvents();
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  const heroImage = sorted[0] && getCoverPhoto(sorted[0]);

  return (
    <>
      <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden bg-navy-deep">
        {heroImage && (
          <Image
            src={heroImage}
            alt="Eventos na Marina Astúrias"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 25%" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">EVENTOS</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Eventos na Marina</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-cream/70">
            A Marina Astúrias recebe encontros especiais à beira do Canal de Santos, com estrutura de gastronomia,
            vista para os píeres e todo o conforto de um clube náutico.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        {sorted.length === 0 ? (
          <p className="text-center text-cream/60">Nenhum evento publicado no momento.</p>
        ) : (
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {sorted.map((event) => {
              const cover = getCoverPhoto(event);
              return (
              <RevealItem key={event.id}>
                <Link href={`/eventos/${event.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-deep">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={event.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-cream/30">Sem fotos</div>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="font-serif text-xl text-cream">{event.name}</span>
                    <span className="shrink-0 text-xs tracking-[0.1em] text-gold">
                      {new Date(event.date + "T00:00:00").toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </Link>
              </RevealItem>
              );
            })}
          </RevealGroup>
        )}

        <Reveal className="mt-16 text-center">
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

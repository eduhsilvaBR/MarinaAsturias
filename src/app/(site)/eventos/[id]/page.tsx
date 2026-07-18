import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EventDescription from "@/components/EventDescription";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/Reveal";
import { readEvents } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return {};
  return { title: `${event.name} — Marina Astúrias`, description: event.description };
}

export default async function EventoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <>
      <section className="relative flex h-[50vh] min-h-[380px] items-end overflow-hidden bg-navy-deep">
        {event.photos[0] && (
          <Image src={event.photos[0]} alt={event.name} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <Link href="/eventos" className="text-xs tracking-[0.2em] text-gold hover:opacity-70">
            ← EVENTOS
          </Link>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">{event.name}</h1>
          <p className="mt-2 text-sm text-cream/70">{new Date(event.date + "T00:00:00").toLocaleDateString("pt-BR")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        {event.description && (
          <Reveal className="mb-12 max-w-2xl">
            <EventDescription text={event.description} />
          </Reveal>
        )}
        <GalleryGrid images={event.photos} />

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

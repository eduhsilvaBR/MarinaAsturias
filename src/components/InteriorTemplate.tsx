import Image from "next/image";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import type { InteriorPage } from "@/content/site";

export default function InteriorTemplate({ page }: { page: InteriorPage }) {
  return (
    <>
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-navy-deep">
        <Image src={page.hero} alt={page.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          {page.subtitle && <span className="text-xs tracking-[0.3em] text-gold">{page.subtitle.toUpperCase()}</span>}
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">{page.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <Reveal className="flex flex-col gap-5">
          {page.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-cream/75">
              {p}
            </p>
          ))}
        </Reveal>

        {page.list && (
          <RevealGroup className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2" stagger={0.04}>
            {page.list.map((item) => (
              <RevealItem key={item} y={12} className="flex items-start gap-3 text-[14px] text-cream/75">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-gold" />
                <span>{item}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {page.stats && (
          <RevealGroup className="mt-12 grid grid-cols-2 gap-6 border-y border-cream/10 py-10 sm:grid-cols-4" stagger={0.08}>
            {page.stats.map((s) => (
              <RevealItem key={s.label} className="text-center">
                <div className="font-serif text-3xl text-gold">{s.value}</div>
                <div className="mt-2 text-xs tracking-[0.12em] text-cream/55">{s.label.toUpperCase()}</div>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </section>

      {page.gallery && page.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
            {page.gallery.map((src, i) => (
              <RevealItem key={src} y={16} className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={src}
                  alt={`${page.title} — foto ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}
    </>
  );
}

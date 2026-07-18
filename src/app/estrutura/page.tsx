import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { interiorPages, navGroups, siteInfo } from "@/content/site";

export const metadata: Metadata = {
  title: "Estrutura — Marina Astúrias",
  description: "Conheça toda a estrutura da Porto Marina Astúrias.",
};

const estruturaSlugs = navGroups.find((g) => g.label === "Estrutura")?.children ?? [];

export default function EstruturaPage() {
  return (
    <>
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden bg-navy-deep">
        <Image
          src="https://marinasturias.com.br/wp-content/uploads/2021/03/hangares-2.jpg"
          alt="Estrutura Marina Astúrias"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="text-xs tracking-[0.3em] text-gold">ESTRUTURA</span>
          <h1 className="mt-4 font-serif text-4xl font-medium text-cream sm:text-5xl">Toda a estrutura da Marina</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-20 text-center lg:px-10">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-cream/70">{siteInfo.boilerplate}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {estruturaSlugs.map((item) => {
            const page = interiorPages[item.href.replace("/", "")];
            if (!page) return null;
            return (
              <RevealItem key={item.href}>
                <Link href={item.href} className="group relative block h-64 overflow-hidden">
                  <Image
                    src={page.hero}
                    alt={page.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-serif text-xl text-cream">{page.title}</div>
                    <div className="mt-2 h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>
    </>
  );
}

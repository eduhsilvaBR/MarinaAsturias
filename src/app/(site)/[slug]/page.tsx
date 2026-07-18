import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InteriorTemplate from "@/components/InteriorTemplate";
import { interiorPages } from "@/content/site";

export function generateStaticParams() {
  return Object.keys(interiorPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = interiorPages[slug];
  if (!page) return {};
  return {
    title: `${page.title} — Marina Astúrias`,
    description: page.paragraphs[0],
  };
}

export default async function InteriorPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = interiorPages[slug];
  if (!page) notFound();
  return <InteriorTemplate page={page} />;
}

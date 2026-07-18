"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  return (
    <>
      <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" stagger={0.03}>
        {images.map((src, i) => (
          <RevealItem key={src} y={16} className="group relative aspect-square overflow-hidden">
            <button onClick={() => setActive(i)} className="block h-full w-full">
              <Image
                src={src}
                alt={`Marina Astúrias — foto ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/95 px-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Fechar"
              className="absolute right-6 top-6 text-3xl text-cream/70 hover:text-cream"
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <button
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
              }}
              className="absolute left-4 text-4xl text-cream/60 hover:text-gold sm:left-8"
            >
              ‹
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[70vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[active]} alt="" fill sizes="90vw" className="object-contain" />
            </motion.div>
            <button
              aria-label="Próxima"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? null : (i + 1) % images.length));
              }}
              className="absolute right-4 text-4xl text-cream/60 hover:text-gold sm:right-8"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setZoomed(false);
        setActive((i) => (i === null ? null : (i + 1) % images.length));
      }
      if (e.key === "ArrowLeft") {
        setZoomed(false);
        setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
      }
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  function go(delta: 1 | -1) {
    setZoomed(false);
    setActive((i) => (i === null ? null : (i + delta + images.length) % images.length));
  }

  return (
    <>
      <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" stagger={0.03}>
        {images.map((src, i) => (
          <RevealItem key={src} y={16} className="group relative aspect-square overflow-hidden">
            <button onClick={() => setActive(i)} className="relative block h-full w-full">
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
            onClick={() => {
              setActive(null);
              setZoomed(false);
            }}
          >
            <button
              aria-label="Fechar"
              className="absolute right-6 top-6 z-10 text-3xl text-cream/70 hover:text-cream"
              onClick={() => {
                setActive(null);
                setZoomed(false);
              }}
            >
              ×
            </button>
            {!zoomed && (
              <>
                <button
                  aria-label="Anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-4 z-10 text-4xl text-cream/60 hover:text-gold sm:left-8"
                >
                  ‹
                </button>
                <button
                  aria-label="Próxima"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-4 z-10 text-4xl text-cream/60 hover:text-gold sm:right-8"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[88vh] w-full max-w-6xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ scale: zoomed ? 2.2 : 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                drag={zoomed}
                dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
                dragElastic={0.1}
              >
                <Image
                  src={images[active]}
                  alt=""
                  fill
                  sizes="90vw"
                  className={`object-contain ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomed((z) => !z);
                  }}
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {!zoomed && (
              <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-wide text-cream/50">
                Clique na foto para ampliar
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

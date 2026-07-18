"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { heroSlides } from "@/content/site";

const AUTOPLAY_MS = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="relative h-[85vh] max-h-[880px] min-h-[600px] w-full overflow-hidden bg-navy-deep">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: AUTOPLAY_MS / 1000 + 1.2, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.position ?? "center" }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-black/30" />
          <div className="absolute inset-0 bg-navy-deep/25" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-6 mx-auto lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="text-xs tracking-[0.3em] text-gold">{slide.eyebrow.toUpperCase()}</span>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] text-cream text-balance sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <Link
            href="/conheca-a-marina"
            className="border border-gold bg-gold px-8 py-3.5 text-[13px] tracking-[0.15em] text-navy-deep transition-colors hover:bg-transparent hover:text-gold"
          >
            CONHEÇA A MARINA
          </Link>
          <Link
            href="/fale-conosco"
            className="border border-cream/40 px-8 py-3.5 text-[13px] tracking-[0.15em] text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            FALE CONOSCO
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-6 lg:px-10">
        <div className="flex gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="group relative h-1 w-9 overflow-hidden bg-cream/25"
            >
              {i === index && (
                <motion.span
                  key={index}
                  className="absolute inset-0 origin-left bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden text-cream/70 sm:block"
          aria-hidden
        >
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="10" cy="9" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

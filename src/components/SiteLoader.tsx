"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(201,163,92,0.14), transparent 55%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative h-24 w-[76px] overflow-hidden sm:h-28 sm:w-[89px]"
              initial={{ opacity: 0, scale: 0.82, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src="/logo/logo-lockup.png" alt="Marina Astúrias" fill className="object-contain" priority />
              <motion.div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background: "linear-gradient(75deg, transparent, rgba(255,255,255,0.55), transparent)",
                  mixBlendMode: "overlay",
                }}
                initial={{ left: "-40%" }}
                animate={{ left: "110%" }}
                transition={{ duration: 0.85, delay: 0.55, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              className="mt-6 h-px bg-gold"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 56, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="mt-4 text-[11px] tracking-[0.35em] text-cream/60"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              MARINA ASTÚRIAS
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

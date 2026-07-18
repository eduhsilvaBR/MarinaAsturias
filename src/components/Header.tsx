"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navGroups, siteInfo } from "@/content/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-navy/95 backdrop-blur-sm shadow-lg shadow-black/20" : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="font-serif text-xl tracking-[0.2em] text-cream lg:text-2xl">
          MARINA ASTÚRIAS
        </Link>

        <nav className="hidden items-center gap-5 text-[12px] tracking-[0.05em] text-cream/85 xl:gap-6 lg:flex">
          {navGroups.map((item) => (
            <div key={item.label} className="group relative py-2">
              <Link href={item.href} className="whitespace-nowrap transition-colors hover:text-gold">
                {item.label.toUpperCase()}
              </Link>
              {"children" in item && item.children && (
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-md border border-cream/10 bg-navy-deep/98 py-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-xs tracking-wide text-cream/80 transition-colors hover:bg-navy-light hover:text-gold"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <a
          href={siteInfo.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 whitespace-nowrap border border-gold/70 px-5 py-2.5 text-[12px] tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-navy-deep lg:inline-block"
        >
          WHATSAPP
        </a>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-y-auto border-t border-cream/10 bg-navy-deep lg:hidden"
            style={{ maxHeight: "calc(100vh - 76px)" }}
          >
            <div className="flex flex-col px-6 py-4">
              {navGroups.map((item) => (
                <div key={item.label} className="border-b border-cream/10 py-3">
                  <Link href={item.href} onClick={() => setOpen(false)} className="text-sm tracking-wide text-cream">
                    {item.label.toUpperCase()}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="mt-2 flex flex-col gap-2 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="text-xs text-cream/65"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href={siteInfo.whatsappHref} className="mt-5 border border-gold/70 px-5 py-3 text-center text-xs tracking-[0.12em] text-gold">
                WHATSAPP
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

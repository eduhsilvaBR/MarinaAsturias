"use client";

import { motion } from "motion/react";
import { siteInfo } from "@/content/site";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={siteInfo.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white">
        <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.351.617 4.646 1.789 6.666L2.667 29.333l6.83-1.771a13.27 13.27 0 0 0 6.507 1.705h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.562-1.388-6.912-3.907-9.431a13.246 13.246 0 0 0-9.432-3.836Zm0 24.4h-.005a11.06 11.06 0 0 1-5.638-1.544l-.405-.24-4.053 1.051 1.082-3.951-.264-.406a11.05 11.05 0 0 1-1.69-5.977c0-6.114 4.976-11.09 11.098-11.09 2.964 0 5.75 1.156 7.845 3.253a11.02 11.02 0 0 1 3.246 7.845c-.003 6.115-4.979 11.06-11.216 11.06Zm6.088-8.294c-.334-.167-1.97-.972-2.275-1.083-.305-.111-.527-.167-.75.167-.222.333-.86 1.083-1.055 1.305-.194.222-.389.25-.722.084-.334-.167-1.41-.52-2.686-1.658-.993-.886-1.664-1.98-1.859-2.314-.194-.333-.021-.514.146-.68.15-.15.334-.389.5-.583.167-.195.223-.334.334-.556.111-.223.056-.417-.028-.584-.083-.167-.75-1.806-1.027-2.474-.27-.65-.545-.562-.75-.573l-.639-.012a1.226 1.226 0 0 0-.889.417c-.305.333-1.166 1.14-1.166 2.778 0 1.639 1.194 3.222 1.36 3.444.167.223 2.352 3.593 5.698 5.038.796.344 1.417.549 1.901.703.799.254 1.526.218 2.101.132.641-.096 1.97-.806 2.247-1.583.278-.778.278-1.445.194-1.584-.083-.139-.305-.222-.639-.389Z" />
      </svg>
    </motion.a>
  );
}

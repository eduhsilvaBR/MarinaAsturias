"use client";

import { useState, type FormEvent } from "react";
import { siteInfo } from "@/content/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nome = form.get("nome");
    const sobrenome = form.get("sobrenome");
    const email = form.get("email");
    const mensagem = form.get("mensagem");

    const text = `Olá! Meu nome é ${nome} ${sobrenome}.\nE-mail: ${email}\n\n${mensagem}`;
    const url = `${siteInfo.whatsappHref}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-cream/60">
          NOME *
          <input
            required
            name="nome"
            className="border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-cream/60">
          SOBRENOME *
          <input
            required
            name="sobrenome"
            className="border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-cream/60">
        E-MAIL *
        <input
          required
          type="email"
          name="email"
          className="border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold"
        />
      </label>
      <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-cream/60">
        MENSAGEM *
        <textarea
          required
          name="mensagem"
          rows={5}
          className="border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold"
        />
      </label>
      <button
        type="submit"
        className="mt-2 self-start border border-gold bg-gold px-8 py-3.5 text-[13px] tracking-[0.15em] text-navy-deep transition-colors hover:bg-transparent hover:text-gold"
      >
        ENVIAR PELO WHATSAPP
      </button>
      {sent && <p className="text-xs text-cream/50">Abrimos o WhatsApp com sua mensagem pronta para envio.</p>}
    </form>
  );
}

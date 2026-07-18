import Image from "next/image";
import Link from "next/link";
import { navGroups, siteInfo } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-navy-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div>
          <div className="relative h-14 w-[130px]">
            <Image src="/logo/logo-branco.png" alt="Marina Astúrias" fill className="object-contain object-left" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">{siteInfo.boilerplate}</p>
          <div className="mt-6 flex gap-4 text-xs tracking-wide text-cream/60">
            <a href={siteInfo.social.facebook} target="_blank" rel="noreferrer" className="hover:text-gold">
              Facebook
            </a>
            <a href={siteInfo.social.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
              Instagram
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[0.15em] text-gold">NAVEGUE</div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
            {navGroups.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-[0.15em] text-gold">ESTRUTURA</div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
            {navGroups
              .find((g) => g.label === "Estrutura")
              ?.children?.slice(0, 6)
              .map((child) => (
                <li key={child.href}>
                  <Link href={child.href} className="hover:text-gold">
                    {child.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-[0.15em] text-gold">CONTATO</div>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
            <li>{siteInfo.address}</li>
            {siteInfo.phones.map((p) => (
              <li key={p}>{p}</li>
            ))}
            <li>WhatsApp: {siteInfo.whatsapp}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs tracking-wide text-cream/40 lg:px-10">
        © {new Date().getFullYear()} Marina Astúrias — Todos os direitos reservados
      </div>
    </footer>
  );
}

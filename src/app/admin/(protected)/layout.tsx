import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/admin" className="font-semibold tracking-wide">
            Admin · Marina Astúrias
          </Link>
          <Link href="/admin/eventos" className="text-neutral-400 hover:text-white">
            Eventos
          </Link>
          <Link href="/admin/galeria" className="text-neutral-400 hover:text-white">
            Galeria
          </Link>
          <Link href="/" target="_blank" className="text-neutral-400 hover:text-white">
            Ver site ↗
          </Link>
        </nav>
        <LogoutButton />
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

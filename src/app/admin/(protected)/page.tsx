import Link from "next/link";
import { readEvents, readGallery } from "@/lib/store";

export default async function AdminDashboard() {
  const [events, gallery] = await Promise.all([readEvents(), readGallery()]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Painel</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/eventos"
          className="rounded-lg border border-white/10 bg-neutral-900 p-6 transition-colors hover:border-white/25"
        >
          <div className="text-sm text-neutral-400">Eventos</div>
          <div className="mt-2 text-3xl font-semibold">{events.length}</div>
          <div className="mt-1 text-sm text-neutral-500">
            {events.reduce((n, e) => n + e.photos.length, 0)} fotos no total
          </div>
        </Link>
        <Link
          href="/admin/galeria"
          className="rounded-lg border border-white/10 bg-neutral-900 p-6 transition-colors hover:border-white/25"
        >
          <div className="text-sm text-neutral-400">Galeria</div>
          <div className="mt-2 text-3xl font-semibold">{gallery.length}</div>
          <div className="mt-1 text-sm text-neutral-500">fotos</div>
        </Link>
      </div>
    </div>
  );
}

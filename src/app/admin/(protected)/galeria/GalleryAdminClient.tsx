"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import type { GalleryItem } from "@/lib/store";
import { uploadPhotos } from "@/lib/uploadClient";

export default function GalleryAdminClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    try {
      const { urls, formResponse } = await uploadPhotos(Array.from(files), "galeria", "/api/admin/gallery");

      let data: { items?: GalleryItem[]; error?: string };
      let ok: boolean;
      let status: number;

      if (urls) {
        const res = await fetch("/api/admin/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls }),
        });
        data = await res.json().catch(() => ({}));
        ok = res.ok;
        status = res.status;
      } else {
        data = await formResponse!.json().catch(() => ({}));
        ok = formResponse!.ok;
        status = formResponse!.status;
      }

      if (!ok || !data.items) {
        setError(data.error || `Erro ao enviar fotos (${status}).`);
        return;
      }
      setItems(data.items);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha de conexão ao enviar fotos. Tente novamente.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Galeria</h1>
      <p className="mt-1 text-sm text-neutral-400">{items.length} fotos publicadas em /galeria</p>

      <form onSubmit={handleUpload} className="mt-6 rounded-lg border border-white/10 bg-neutral-900 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="text-sm text-neutral-300 file:mr-3 file:rounded file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-neutral-950"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? "Enviando…" : "Enviar fotos"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </form>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {items.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded bg-neutral-800">
            <Image src={item.src} alt="" fill sizes="160px" className="object-cover" />
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="absolute right-1 top-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

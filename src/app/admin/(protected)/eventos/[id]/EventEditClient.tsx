"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import type { EventItem } from "@/lib/store";

const MAX_PHOTOS = 20;

export default function EventEditClient({ event: initialEvent }: { event: EventItem }) {
  const router = useRouter();
  const [event, setEvent] = useState(initialEvent);
  const [name, setName] = useState(initialEvent.name);
  const [date, setDate] = useState(initialEvent.date);
  const [description, setDescription] = useState(initialEvent.description ?? "");
  const [savingInfo, setSavingInfo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSaveInfo(e: FormEvent) {
    e.preventDefault();
    setSavingInfo(true);
    const res = await fetch(`/api/admin/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, description }),
    });
    setSavingInfo(false);
    if (res.ok) {
      const data = await res.json();
      setEvent(data.event);
      router.refresh();
    }
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    const form = new FormData();
    Array.from(files).forEach((f) => form.append("photos", f));

    try {
      const res = await fetch(`/api/admin/events/${event.id}/photos`, { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Erro ao enviar fotos (${res.status}).`);
        return;
      }
      setEvent(data.event);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    } catch {
      setError("Falha de conexão ao enviar fotos. Tente novamente.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeletePhoto(src: string) {
    const res = await fetch(`/api/admin/events/${event.id}/photos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src }),
    });
    if (res.ok) {
      const data = await res.json();
      setEvent(data.event);
      router.refresh();
    }
  }

  const slotsLeft = MAX_PHOTOS - event.photos.length;

  return (
    <div>
      <Link href="/admin/eventos" className="text-sm text-neutral-400 hover:text-white">
        ← Eventos
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{event.name}</h1>

      <form onSubmit={handleSaveInfo} className="mt-6 rounded-lg border border-white/10 bg-neutral-900 p-6">
        <h2 className="text-sm font-medium text-neutral-300">Informações</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-neutral-400">
            Nome do evento
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-white/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-neutral-400">
            Data
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-white/40"
            />
          </label>
        </div>
        <label className="mt-4 flex flex-col gap-1.5 text-xs text-neutral-400">
          Descrição
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="rounded border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-white/40"
          />
        </label>
        <button
          type="submit"
          disabled={savingInfo}
          className="mt-4 rounded bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:opacity-90 disabled:opacity-50"
        >
          {savingInfo ? "Salvando…" : "Salvar informações"}
        </button>
      </form>

      <form onSubmit={handleUpload} className="mt-6 rounded-lg border border-white/10 bg-neutral-900 p-6">
        <h2 className="text-sm font-medium text-neutral-300">
          Fotos ({event.photos.length}/{MAX_PHOTOS})
        </h2>
        {slotsLeft > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
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
            <span className="text-xs text-neutral-500">até {slotsLeft} foto(s) restante(s)</span>
          </div>
        ) : (
          <p className="mt-4 text-sm text-neutral-500">Limite de {MAX_PHOTOS} fotos atingido.</p>
        )}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {event.photos.map((src) => (
            <div key={src} className="group relative aspect-square overflow-hidden rounded bg-neutral-800">
              <Image src={src} alt="" fill sizes="200px" className="object-cover" />
              <button
                type="button"
                onClick={() => handleDeletePhoto(src)}
                className="absolute right-1 top-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

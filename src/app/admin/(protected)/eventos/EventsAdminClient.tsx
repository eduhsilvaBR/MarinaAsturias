"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { EventItem } from "@/lib/store";

export default function EventsAdminClient({ initialEvents }: { initialEvents: EventItem[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, description }),
    });
    setCreating(false);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Erro ao criar evento.");
      return;
    }
    setEvents((prev) => [data.event, ...prev]);
    setName("");
    setDate("");
    setDescription("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este evento e todas as suas fotos?")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      router.refresh();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Eventos</h1>

      <form onSubmit={handleCreate} className="mt-8 rounded-lg border border-white/10 bg-neutral-900 p-6">
        <h2 className="text-sm font-medium text-neutral-300">Novo evento</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-neutral-400">
            Nome do evento
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-white/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-neutral-400">
            Data
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-white/40"
            />
          </label>
        </div>
        <label className="mt-4 flex flex-col gap-1.5 text-xs text-neutral-400">
          Descrição (opcional)
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="rounded border border-white/15 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-white/40"
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={creating}
          className="mt-4 rounded bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:opacity-90 disabled:opacity-50"
        >
          {creating ? "Criando…" : "Criar evento"}
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-3">
        {events.length === 0 && <p className="text-sm text-neutral-500">Nenhum evento ainda.</p>}
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center gap-4 rounded-lg border border-white/10 bg-neutral-900 p-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-800">
              {(ev.coverPhoto || ev.photos[0]) && (
                <Image src={ev.coverPhoto || ev.photos[0]} alt={ev.name} fill sizes="64px" className="object-cover" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">{ev.name}</div>
              <div className="text-sm text-neutral-400">
                {new Date(ev.date + "T00:00:00").toLocaleDateString("pt-BR")} · {ev.photos.length} fotos
              </div>
            </div>
            <Link
              href={`/admin/eventos/${ev.id}`}
              className="rounded border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
            >
              Gerenciar fotos
            </Link>
            <button
              onClick={() => handleDelete(ev.id)}
              className="rounded border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

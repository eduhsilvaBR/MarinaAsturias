import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteUploadedImage, readEvents, writeEvents } from "@/lib/store";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const { name, date, description, coverPhoto, photos } = await request.json().catch(() => ({}));

  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return NextResponse.json({ error: "Evento não encontrado." }, { status: 404 });

  if (typeof name === "string" && name.trim()) event.name = name.trim();
  if (typeof date === "string" && date.trim()) event.date = date.trim();
  if (typeof description === "string") event.description = description.trim();
  if (typeof coverPhoto === "string" && event.photos.includes(coverPhoto)) event.coverPhoto = coverPhoto;
  if (Array.isArray(photos) && photos.length === event.photos.length && photos.every((p) => event.photos.includes(p))) {
    event.photos = photos;
  }

  await writeEvents(events);
  return NextResponse.json({ event });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return NextResponse.json({ error: "Evento não encontrado." }, { status: 404 });

  await Promise.all(event.photos.map((src) => deleteUploadedImage(src)));
  await writeEvents(events.filter((e) => e.id !== id));
  return NextResponse.json({ ok: true });
}

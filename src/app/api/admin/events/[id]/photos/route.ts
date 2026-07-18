import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteUploadedImage, readEvents, saveUploadedImage, writeEvents } from "@/lib/store";

const MAX_PHOTOS = 20;

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return NextResponse.json({ error: "Evento não encontrado." }, { status: 404 });

  const form = await request.formData();
  const files = form.getAll("photos").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "Nenhuma foto enviada." }, { status: 400 });
  }

  const slotsLeft = MAX_PHOTOS - event.photos.length;
  if (slotsLeft <= 0) {
    return NextResponse.json({ error: `Este evento já tem o máximo de ${MAX_PHOTOS} fotos.` }, { status: 400 });
  }

  const toUpload = files.slice(0, slotsLeft);
  const newUrls: string[] = [];
  try {
    for (const file of toUpload) {
      const buffer = Buffer.from(new Uint8Array(await file.arrayBuffer()));
      const url = await saveUploadedImage(buffer, `events/${event.id}`, file.name, file.type);
      newUrls.push(url);
    }
  } catch (err) {
    console.error("upload failed", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Falha ao processar imagem: ${message}` }, { status: 500 });
  }

  event.photos.push(...newUrls);
  await writeEvents(events);
  return NextResponse.json({ event, skipped: files.length - toUpload.length });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const { src } = await request.json().catch(() => ({}));
  if (typeof src !== "string") return NextResponse.json({ error: "src é obrigatório." }, { status: 400 });

  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return NextResponse.json({ error: "Evento não encontrado." }, { status: 404 });

  event.photos = event.photos.filter((p) => p !== src);
  await writeEvents(events);
  await deleteUploadedImage(src);
  return NextResponse.json({ event });
}

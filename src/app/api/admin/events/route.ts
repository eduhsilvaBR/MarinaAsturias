import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readEvents, writeEvents, slugify, type EventItem } from "@/lib/store";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const events = await readEvents();
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { name, date, description } = await request.json().catch(() => ({}));
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Nome do evento é obrigatório." }, { status: 400 });
  }
  if (typeof date !== "string" || !date.trim()) {
    return NextResponse.json({ error: "Data do evento é obrigatória." }, { status: 400 });
  }

  const events = await readEvents();
  const baseId = slugify(name) || "evento";
  let id = baseId;
  let i = 2;
  while (events.some((e) => e.id === id)) {
    id = `${baseId}-${i}`;
    i += 1;
  }

  const newEvent: EventItem = {
    id,
    name: name.trim(),
    date: date.trim(),
    description: typeof description === "string" ? description.trim() : "",
    photos: [],
  };
  events.unshift(newEvent);
  await writeEvents(events);
  return NextResponse.json({ event: newEvent }, { status: 201 });
}

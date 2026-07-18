import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readEvents, readGallery, writeEvents, writeGallery, type EventItem, type GalleryItem } from "@/lib/store";

/**
 * One-time migration: merges the bundled data/*.json seed content into the
 * cloud store (Redis) by id, without touching anything created since
 * (e.g. events/photos added through the admin UI). Safe to call repeatedly.
 */
export async function POST() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const [currentEvents, currentGallery] = await Promise.all([readEvents(), readGallery()]);
  const result: Record<string, string> = {};

  const seedEventsRaw = await fs
    .readFile(path.join(process.cwd(), "data", "events.json"), "utf8")
    .catch(() => "[]");
  const seedEvents = JSON.parse(seedEventsRaw) as EventItem[];
  const missingEvents = seedEvents.filter((seed) => !currentEvents.some((e) => e.id === seed.id));
  if (missingEvents.length > 0) {
    await writeEvents([...missingEvents, ...currentEvents]);
    result.events = `added ${missingEvents.length}, ${currentEvents.length} already present`;
  } else {
    result.events = `nothing to add, ${currentEvents.length} already present`;
  }

  const seedGalleryRaw = await fs
    .readFile(path.join(process.cwd(), "data", "gallery.json"), "utf8")
    .catch(() => "[]");
  const seedGallery = JSON.parse(seedGalleryRaw) as GalleryItem[];
  const missingGallery = seedGallery.filter((seed) => !currentGallery.some((g) => g.id === seed.id));
  if (missingGallery.length > 0) {
    await writeGallery([...missingGallery, ...currentGallery]);
    result.gallery = `added ${missingGallery.length}, ${currentGallery.length} already present`;
  } else {
    result.gallery = `nothing to add, ${currentGallery.length} already present`;
  }

  return NextResponse.json(result);
}

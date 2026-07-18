import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readEvents, readGallery, writeEvents, writeGallery, type EventItem, type GalleryItem } from "@/lib/store";

/**
 * One-time migration: pushes the bundled data/*.json seed content into the
 * cloud store (Redis) when the cloud store is configured but still empty.
 * Safe to call more than once — it never overwrites existing data.
 */
export async function POST() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const [currentEvents, currentGallery] = await Promise.all([readEvents(), readGallery()]);
  const result: Record<string, string> = {};

  if (currentEvents.length === 0) {
    const raw = await fs
      .readFile(path.join(process.cwd(), "data", "events.json"), "utf8")
      .catch(() => "[]");
    const seedEvents = JSON.parse(raw) as EventItem[];
    if (seedEvents.length > 0) {
      await writeEvents(seedEvents);
      result.events = `seeded ${seedEvents.length}`;
    } else {
      result.events = "seed file empty, nothing to do";
    }
  } else {
    result.events = `already has ${currentEvents.length}, skipped`;
  }

  if (currentGallery.length === 0) {
    const raw = await fs
      .readFile(path.join(process.cwd(), "data", "gallery.json"), "utf8")
      .catch(() => "[]");
    const seedGallery = JSON.parse(raw) as GalleryItem[];
    if (seedGallery.length > 0) {
      await writeGallery(seedGallery);
      result.gallery = `seeded ${seedGallery.length}`;
    } else {
      result.gallery = "seed file empty, nothing to do";
    }
  } else {
    result.gallery = `already has ${currentGallery.length}, skipped`;
  }

  return NextResponse.json(result);
}

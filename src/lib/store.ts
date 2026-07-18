import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export type EventItem = {
  id: string;
  name: string;
  date: string;
  description?: string;
  photos: string[];
};

export type GalleryItem = {
  id: string;
  src: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_PATH = path.join(DATA_DIR, "events.json");
const GALLERY_PATH = path.join(DATA_DIR, "gallery.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, data: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function readEvents() {
  return readJson<EventItem[]>(EVENTS_PATH, []);
}

export function writeEvents(events: EventItem[]) {
  return writeJson(EVENTS_PATH, events);
}

export function readGallery() {
  return readJson<GalleryItem[]>(GALLERY_PATH, []);
}

export function writeGallery(items: GalleryItem[]) {
  return writeJson(GALLERY_PATH, items);
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Resizes and saves an uploaded image under public/uploads/<folder>/, returns the public URL path. */
export async function saveUploadedImage(buffer: Buffer, folder: string, hint: string) {
  const dir = path.join(UPLOADS_DIR, folder);
  await fs.mkdir(dir, { recursive: true });
  const filename = `${Date.now()}-${slugify(hint) || "foto"}.jpg`;
  const filePath = path.join(dir, filename);
  await sharp(buffer)
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82 })
    .toFile(filePath);
  return `/uploads/${folder}/${filename}`;
}

/** Deletes an uploaded file, but only if it lives under /uploads/ (never touches seeded/static assets). */
export async function deleteUploadedImage(publicPath: string) {
  if (!publicPath.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", publicPath);
  await fs.rm(filePath, { force: true });
}

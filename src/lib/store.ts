import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { put, del } from "@vercel/blob";
import { Redis } from "@upstash/redis";

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

const EVENTS_KEY = "marina:events";
const GALLERY_KEY = "marina:gallery";

// --- Cloud storage (Vercel Blob + Upstash Redis) is used automatically when
// configured (production on Vercel). Falls back to local disk otherwise, so
// this project still works fully offline in dev without any cloud setup. ---

function getRedis(): Redis | null {
  // The exact env var names depend on how the Upstash/KV integration was
  // connected in Vercel (custom prefixes get prepended to Vercel's own
  // default names), so we check every naming pattern we've actually seen.
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, data: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function readEvents(): Promise<EventItem[]> {
  const redis = getRedis();
  if (redis) return (await redis.get<EventItem[]>(EVENTS_KEY)) ?? [];
  return readJsonFile<EventItem[]>(EVENTS_PATH, []);
}

export async function writeEvents(events: EventItem[]) {
  const redis = getRedis();
  if (redis) return void (await redis.set(EVENTS_KEY, events));
  return writeJsonFile(EVENTS_PATH, events);
}

export async function readGallery(): Promise<GalleryItem[]> {
  const redis = getRedis();
  if (redis) return (await redis.get<GalleryItem[]>(GALLERY_KEY)) ?? [];
  return readJsonFile<GalleryItem[]>(GALLERY_PATH, []);
}

export async function writeGallery(items: GalleryItem[]) {
  const redis = getRedis();
  if (redis) return void (await redis.set(GALLERY_KEY, items));
  return writeJsonFile(GALLERY_PATH, items);
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

/**
 * Stores an uploaded image (Vercel Blob in production, local disk in dev) and
 * returns its public URL. Tries to resize/compress with sharp first (keeps
 * storage small), but sharp's native binary is unreliable in some serverless
 * environments — if it fails or isn't usable, falls back to storing the
 * original file untouched rather than losing the upload. Display-time
 * resizing still happens via next/image regardless.
 */
export async function saveUploadedImage(buffer: Buffer, folder: string, hint: string, mimeType = "image/jpeg") {
  let body: Buffer = buffer;
  let ext = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
  let contentType = mimeType || "application/octet-stream";

  try {
    body = await sharp(buffer)
      .rotate()
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
    ext = "jpg";
    contentType = "image/jpeg";
  } catch (err) {
    console.error("sharp processing failed, storing original file instead", err);
  }

  const filename = `${Date.now()}-${slugify(hint) || "foto"}.${ext}`;

  if (hasBlobStorage()) {
    const blob = await put(`${folder}/${filename}`, body, {
      access: "public",
      contentType,
    });
    return blob.url;
  }

  const dir = path.join(UPLOADS_DIR, folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), body);
  return `/uploads/${folder}/${filename}`;
}

/** Deletes an uploaded file. Only ever touches Blob URLs or local /uploads/ paths — never seeded/static assets. */
export async function deleteUploadedImage(publicPath: string) {
  if (hasBlobStorage() && publicPath.includes(".public.blob.vercel-storage.com")) {
    await del(publicPath).catch(() => {});
    return;
  }
  if (!publicPath.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", publicPath);
  await fs.rm(filePath, { force: true });
}

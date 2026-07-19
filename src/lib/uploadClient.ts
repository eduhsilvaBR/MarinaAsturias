"use client";

import { upload } from "@vercel/blob/client";

let blobEnabledCache: boolean | null = null;

async function isBlobEnabled(): Promise<boolean> {
  if (blobEnabledCache !== null) return blobEnabledCache;
  try {
    const res = await fetch("/api/admin/config");
    const data = await res.json();
    blobEnabledCache = Boolean(data.blobEnabled);
  } catch {
    blobEnabledCache = false;
  }
  return blobEnabledCache;
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/**
 * Uploads files directly from the browser to Blob storage when available
 * (bypasses our serverless function's request body size limit, which many
 * multi-megabyte photos blow past). Falls back to routing through our own
 * server as multipart form data when Blob isn't configured (local dev).
 */
export async function uploadPhotos(
  files: File[],
  folder: string,
  legacyEndpoint: string,
): Promise<{ urls?: string[]; formResponse?: Response }> {
  if (await isBlobEnabled()) {
    const urls = await mapWithConcurrency(files, 3, async (file) => {
      const blob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob-upload",
      });
      return blob.url;
    });
    return { urls };
  }

  const form = new FormData();
  files.forEach((f) => form.append("photos", f));
  const formResponse = await fetch(legacyEndpoint, { method: "POST", body: form });
  return { formResponse };
}

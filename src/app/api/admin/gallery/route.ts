import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readGallery, saveUploadedImage, writeGallery, type GalleryItem } from "@/lib/store";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const items = await readGallery();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await request.formData();
  const files = form.getAll("photos").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "Nenhuma foto enviada." }, { status: 400 });
  }

  const items = await readGallery();
  const newItems: GalleryItem[] = [];
  try {
    for (const file of files) {
      const src = await saveUploadedImage(
        Buffer.from(new Uint8Array(await file.arrayBuffer())),
        "galeria",
        file.name,
        file.type,
      );
      newItems.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, src });
    }
  } catch (err) {
    console.error("upload failed", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Falha ao processar imagem: ${message}` }, { status: 500 });
  }

  const updated = [...newItems, ...items];
  await writeGallery(updated);
  return NextResponse.json({ items: updated });
}

/** Appends URLs of photos already uploaded directly to Blob from the browser (see /api/admin/blob-upload). */
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { urls } = await request.json().catch(() => ({ urls: [] }));
  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "Nenhuma foto enviada." }, { status: 400 });
  }

  const items = await readGallery();
  const newItems: GalleryItem[] = urls
    .filter((u): u is string => typeof u === "string")
    .map((src) => ({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, src }));

  const updated = [...newItems, ...items];
  await writeGallery(updated);
  return NextResponse.json({ items: updated });
}

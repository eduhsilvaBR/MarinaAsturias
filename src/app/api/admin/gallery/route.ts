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
  for (const file of files) {
    const src = await saveUploadedImage(Buffer.from(await file.arrayBuffer()), "galeria", file.name);
    newItems.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, src });
  }

  const updated = [...newItems, ...items];
  await writeGallery(updated);
  return NextResponse.json({ items: updated });
}

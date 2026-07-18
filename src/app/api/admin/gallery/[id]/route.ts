import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteUploadedImage, readGallery, writeGallery } from "@/lib/store";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;

  const items = await readGallery();
  const item = items.find((i) => i.id === id);
  if (!item) return NextResponse.json({ error: "Foto não encontrada." }, { status: 404 });

  await writeGallery(items.filter((i) => i.id !== id));
  await deleteUploadedImage(item.src);
  return NextResponse.json({ ok: true });
}

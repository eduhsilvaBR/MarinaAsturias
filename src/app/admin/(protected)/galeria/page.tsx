import { readGallery } from "@/lib/store";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function AdminGaleriaPage() {
  const items = await readGallery();
  return <GalleryAdminClient initialItems={items} />;
}

import { notFound } from "next/navigation";
import { readEvents } from "@/lib/store";
import EventEditClient from "./EventEditClient";

export default async function AdminEventEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) notFound();
  return <EventEditClient event={event} />;
}

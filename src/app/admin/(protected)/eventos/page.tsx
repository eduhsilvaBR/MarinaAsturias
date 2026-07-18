import { readEvents } from "@/lib/store";
import EventsAdminClient from "./EventsAdminClient";

export default async function AdminEventosPage() {
  const events = await readEvents();
  return <EventsAdminClient initialEvents={events} />;
}

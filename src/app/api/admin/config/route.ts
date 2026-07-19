import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ blobEnabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN) });
}

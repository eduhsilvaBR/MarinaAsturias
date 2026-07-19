import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

/**
 * Issues short-lived tokens for direct browser-to-Blob uploads. This exists
 * because routing many/large photos through our own serverless function as
 * multipart form data hits Vercel's request body size limit (413) well
 * before 20 phone-camera photos fit — direct upload bypasses that entirely.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { saveUpload } from "@/lib/upload";

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const url = await saveUpload(file);
  return NextResponse.json({ url });
}

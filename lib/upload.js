import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Local-disk implementation for development. In production (Vercel), local disk
// isn't persistent/writable at runtime — swap this out for Vercel Blob's `put()`
// (see README) before deploying. The rest of the app only depends on getting a
// public URL back, so that's the only file that needs to change.
export async function saveUpload(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name || "") || "";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, safeName), buffer);

  return `/uploads/${safeName}`;
}

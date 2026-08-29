import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";

export async function POST(request) {
  const { email, password } = await request.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validEmail || !validHash) {
    return NextResponse.json({ error: "Admin account not configured." }, { status: 500 });
  }

  if (email !== validEmail || !(await bcrypt.compare(password || "", validHash))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  session.email = email;
  await session.save();

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  const maxOrder = await prisma.service.aggregate({ _max: { order: true } });
  const service = await prisma.service.create({
    data: { ...data, order: (maxOrder._max.order ?? -1) + 1 },
  });
  return NextResponse.json(service);
}

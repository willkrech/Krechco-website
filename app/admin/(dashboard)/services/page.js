import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminTopbar from "@/components/AdminTopbar";
import ServicesManager from "@/components/ServicesManager";

export default async function AdminServicesPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <AdminTopbar title="Services" />
      <div className="admin-main">
        <ServicesManager initialServices={services} />
      </div>
    </>
  );
}

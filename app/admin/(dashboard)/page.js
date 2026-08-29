import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminTopbar from "@/components/AdminTopbar";
import SettingsForm from "@/components/SettingsForm";

export default async function AdminDashboard() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const settings = await prisma.settings.findUnique({ where: { id: 1 } });

  return (
    <>
      <AdminTopbar title="Home page content" />
      <div className="admin-main">
        <SettingsForm settings={settings} />
      </div>
    </>
  );
}

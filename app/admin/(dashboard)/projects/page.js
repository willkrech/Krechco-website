import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminTopbar from "@/components/AdminTopbar";
import ProjectsList from "@/components/ProjectsList";

export default async function AdminProjectsPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <AdminTopbar
        title="Projects"
        action={
          <a className="btn" href="/admin/projects/new">
            + Add project
          </a>
        }
      />
      <div className="admin-main">
        <ProjectsList projects={projects} />
      </div>
    </>
  );
}

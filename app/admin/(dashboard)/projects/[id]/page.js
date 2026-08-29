import { redirect, notFound } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminTopbar from "@/components/AdminTopbar";
import ProjectForm from "@/components/ProjectForm";

export default async function EditProjectPage({ params }) {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();

  return (
    <>
      <AdminTopbar title={`Edit ${project.clientName}`} />
      <div className="admin-main">
        {project.hasCaseStudy && (
          <p style={{ marginTop: 0 }}>
            <a href={`/projects/${project.slug}`} target="_blank" rel="noreferrer">
              View case study page ↗
            </a>
          </p>
        )}
        <ProjectForm project={project} />
      </div>
    </>
  );
}

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import AdminTopbar from "@/components/AdminTopbar";
import ProjectForm from "@/components/ProjectForm";

export default async function NewProjectPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminTopbar title="Add project" />
      <div className="admin-main">
        <ProjectForm />
      </div>
    </>
  );
}

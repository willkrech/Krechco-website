import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/db";
import AdminTopbar from "@/components/AdminTopbar";
import TestimonialsManager from "@/components/TestimonialsManager";

export default async function AdminTestimonialsPage() {
  if (!(await requireAdmin())) {
    redirect("/admin/login");
  }

  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <AdminTopbar title="Testimonials" />
      <div className="admin-main">
        <TestimonialsManager initialTestimonials={testimonials} />
      </div>
    </>
  );
}

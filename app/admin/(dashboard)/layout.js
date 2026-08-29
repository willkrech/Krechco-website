import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}

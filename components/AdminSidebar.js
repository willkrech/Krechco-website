"use client";

import { useRouter, usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Home / Hero / About" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/services", label: "Services" },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-sidebar">
      <a href="/admin" className="admin-sidebar-brand">
        Krech.Co
      </a>
      <nav>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="admin-sidebar-foot">
        <a href="/" target="_blank" rel="noreferrer">
          View site ↗
        </a>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

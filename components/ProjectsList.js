"use client";

import { useRouter } from "next/navigation";

export default function ProjectsList({ projects }) {
  const router = useRouter();

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete.");
    }
  }

  if (projects.length === 0) {
    return <p>No projects yet. Add your first one.</p>;
  }

  return (
    <div>
      {projects.map((p) => (
        <div className="list-item" key={p.id}>
          <div className="list-item-main">
            {p.thumbnailUrl && <img src={p.thumbnailUrl} alt="" />}
            <div>
              <span className="list-item-title">{p.clientName}</span>
              <span className="list-item-meta">{p.category}</span>
              {!p.visible && <span className="badge hidden">Hidden</span>}
              {p.hasCaseStudy && <span className="badge">Case study</span>}
            </div>
          </div>
          <div className="row">
            <a className="btn secondary" href={`/admin/projects/${p.id}`}>
              Edit
            </a>
            <button className="btn danger" onClick={() => handleDelete(p.id, p.clientName)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

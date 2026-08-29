"use client";

import { useState } from "react";

export default function ServicesManager({ initialServices }) {
  const [items, setItems] = useState(initialServices);
  const [newName, setNewName] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setNewName("");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleRename(id, name) {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    }
  }

  return (
    <div>
      {items.map((s) => (
        <div className="list-item" key={s.id}>
          <input
            type="text"
            defaultValue={s.name}
            onBlur={(e) => {
              if (e.target.value !== s.name) handleRename(s.id, e.target.value);
            }}
            style={{ border: "none", fontWeight: 600, fontSize: 15, flex: 1 }}
          />
          <button className="btn danger" onClick={() => handleDelete(s.id)}>
            Delete
          </button>
        </div>
      ))}

      <div className="admin-card">
        <h2>Add service</h2>
        <form onSubmit={handleAdd} className="row">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Brand Strategy"
            style={{ flex: 1 }}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

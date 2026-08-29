"use client";

import { useState } from "react";

const empty = { quote: "", name: "", title: "" };

export default function TestimonialsManager({ initialTestimonials }) {
  const [items, setItems] = useState(initialTestimonials);
  const [newItem, setNewItem] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(empty);

  async function handleAdd(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setNewItem(empty);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditDraft(item);
  }

  async function saveEdit(id) {
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editDraft),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
      setEditingId(null);
    }
  }

  return (
    <div>
      {items.map((t) =>
        editingId === t.id ? (
          <div className="admin-card" key={t.id}>
            <div className="field">
              <label>Quote</label>
              <textarea value={editDraft.quote} onChange={(e) => setEditDraft({ ...editDraft, quote: e.target.value })} />
            </div>
            <div className="field">
              <label>Name</label>
              <input type="text" value={editDraft.name} onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Title / Company</label>
              <input type="text" value={editDraft.title} onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })} />
            </div>
            <div className="row">
              <button className="btn" onClick={() => saveEdit(t.id)}>Save</button>
              <button className="btn secondary" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="list-item" key={t.id}>
            <div className="list-item-main">
              <div>
                <div className="list-item-title">{t.name}</div>
                <div className="list-item-meta">{t.title}</div>
              </div>
            </div>
            <div className="row">
              <button className="btn secondary" onClick={() => startEdit(t)}>Edit</button>
              <button className="btn danger" onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          </div>
        )
      )}

      <div className="admin-card">
        <h2>Add testimonial</h2>
        <form onSubmit={handleAdd}>
          <div className="field">
            <label>Quote</label>
            <textarea value={newItem.quote} onChange={(e) => setNewItem({ ...newItem, quote: e.target.value })} required />
          </div>
          <div className="field">
            <label>Name</label>
            <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
          </div>
          <div className="field">
            <label>Title / Company</label>
            <input type="text" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
          </div>
          <button className="btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

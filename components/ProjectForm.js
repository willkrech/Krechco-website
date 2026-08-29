"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "@/components/ImageUploadField";

const emptyProject = {
  clientName: "",
  category: "",
  thumbnailUrl: "",
  badgeUrl: "",
  externalUrl: "",
  hasCaseStudy: false,
  caseStudyIntro: "",
  caseStudyContent: "",
  caseStudyTimeframe: "",
  caseStudyRole: "",
  caseStudyScope: "",
  visible: true,
};

export default function ProjectForm({ project }) {
  const router = useRouter();
  const isNew = !project;
  const [form, setForm] = useState(project || emptyProject);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${project.id}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setError("Failed to save.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-msg">{error}</div>}

      <div className="admin-card">
        <h2>Basics</h2>
        <div className="field">
          <label htmlFor="clientName">Client name</label>
          <input
            id="clientName"
            type="text"
            required
            value={form.clientName}
            onChange={(e) => set("clientName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Category / tag</label>
          <input
            id="category"
            type="text"
            placeholder="e.g. Web Design and Development"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          />
        </div>
        <ImageUploadField label="Thumbnail (image or GIF)" value={form.thumbnailUrl} onChange={(url) => set("thumbnailUrl", url)} />
        <ImageUploadField label="Badge (optional, e.g. an award image)" value={form.badgeUrl} onChange={(url) => set("badgeUrl", url)} />
        <div className="checkbox-field field">
          <input
            id="visible"
            type="checkbox"
            checked={form.visible}
            onChange={(e) => set("visible", e.target.checked)}
          />
          <label htmlFor="visible">Visible on homepage</label>
        </div>
      </div>

      <div className="admin-card">
        <h2>Link behavior</h2>
        <div className="field">
          <label htmlFor="externalUrl">Live site URL</label>
          <input
            id="externalUrl"
            type="text"
            placeholder="https://..."
            value={form.externalUrl}
            onChange={(e) => set("externalUrl", e.target.value)}
          />
          <small>Used for the &quot;Visit the Site&quot; link, unless a case study is enabled below.</small>
        </div>
        <div className="checkbox-field field">
          <input
            id="hasCaseStudy"
            type="checkbox"
            checked={form.hasCaseStudy}
            onChange={(e) => set("hasCaseStudy", e.target.checked)}
          />
          <label htmlFor="hasCaseStudy">This project has an internal case study page</label>
        </div>
      </div>

      {form.hasCaseStudy && (
        <div className="admin-card">
          <h2>Case study</h2>
          <div className="field">
            <label htmlFor="caseStudyIntro">Intro / summary</label>
            <textarea
              id="caseStudyIntro"
              value={form.caseStudyIntro}
              onChange={(e) => set("caseStudyIntro", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="caseStudyContent">
              Case study content (Markdown — use ## headings for numbered sections, paragraphs, ![alt](image-url),
              embed a video URL on its own line)
            </label>
            <textarea
              id="caseStudyContent"
              style={{ minHeight: 240, fontFamily: "monospace" }}
              value={form.caseStudyContent}
              onChange={(e) => set("caseStudyContent", e.target.value)}
            />
          </div>
        </div>
      )}

      {form.hasCaseStudy && (
        <div className="admin-card">
          <h2>Details (shown in the case study's info grid)</h2>
          <div className="field">
            <label htmlFor="caseStudyTimeframe">Timeframe</label>
            <input
              id="caseStudyTimeframe"
              type="text"
              placeholder="e.g. 2024–2025"
              value={form.caseStudyTimeframe}
              onChange={(e) => set("caseStudyTimeframe", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="caseStudyRole">Role</label>
            <input
              id="caseStudyRole"
              type="text"
              placeholder="e.g. Brand, Website"
              value={form.caseStudyRole}
              onChange={(e) => set("caseStudyRole", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="caseStudyScope">Scope</label>
            <input
              id="caseStudyScope"
              type="text"
              placeholder="e.g. Web Design and Development"
              value={form.caseStudyScope}
              onChange={(e) => set("caseStudyScope", e.target.value)}
            />
          </div>
        </div>
      )}

      <button className="btn" type="submit" disabled={saving}>
        {saving ? "Saving…" : isNew ? "Create project" : "Save changes"}
      </button>
    </form>
  );
}

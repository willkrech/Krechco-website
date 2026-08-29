"use client";

import { useState } from "react";
import ImageUploadField from "@/components/ImageUploadField";

const TEXT_FIELDS = [
  ["Hero", [
    ["heroHeadline", "Hero headline", "text"],
    ["heroTag1", "Top-left tag (supports <br>)", "text"],
    ["heroTag2", "Top-right tag (supports <br>)", "text"],
    ["heroTag3", "Bottom-right tag (supports <br>)", "text"],
  ]],
  ["About", [
    ["aboutTag", "Section tag", "text"],
    ["aboutHeading", "Heading (supports <em>)", "text"],
    ["aboutText", "Body text (blank line = new paragraph)", "textarea"],
  ]],
  ["Footer", [
    ["footerName", "Name", "text"],
    ["footerRole", "Role", "text"],
    ["footerBlurb", "Blurb", "text"],
    ["footerPhone", "Phone (digits only)", "text"],
    ["footerEmail", "Email", "text"],
    ["footerLinkedin", "LinkedIn URL", "text"],
    ["footerInstagram", "Instagram URL", "text"],
  ]],
];

export default function SettingsForm({ settings }) {
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved." : "Failed to save.");
  }

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className={message === "Saved." ? "success-msg" : "error-msg"}>{message}</div>}

      <div className="admin-card">
        <h2>Hero image</h2>
        <ImageUploadField
          label="Background image"
          value={form.heroImageUrl}
          onChange={(url) => set("heroImageUrl", url)}
        />
      </div>

      <div className="admin-card">
        <h2>About photos</h2>
        <ImageUploadField
          label="Photo 1"
          value={form.aboutImage1Url}
          onChange={(url) => set("aboutImage1Url", url)}
        />
        <ImageUploadField
          label="Photo 2"
          value={form.aboutImage2Url}
          onChange={(url) => set("aboutImage2Url", url)}
        />
      </div>

      <div className="admin-card">
        <h2>Background video</h2>
        <ImageUploadField
          label="Video (mp4)"
          value={form.videoUrl}
          onChange={(url) => set("videoUrl", url)}
          accept="video/*"
        />
        <ImageUploadField
          label="Video (webm, optional)"
          value={form.videoWebmUrl}
          onChange={(url) => set("videoWebmUrl", url)}
          accept="video/*"
        />
        <ImageUploadField
          label="Poster image"
          value={form.videoPosterUrl}
          onChange={(url) => set("videoPosterUrl", url)}
        />
      </div>

      <div className="admin-card">
        <h2>Footer photo</h2>
        <ImageUploadField
          label="Photo"
          value={form.footerPhotoUrl}
          onChange={(url) => set("footerPhotoUrl", url)}
        />
      </div>

      {TEXT_FIELDS.map(([section, fields]) => (
        <div className="admin-card" key={section}>
          <h2>{section}</h2>
          {fields.map(([key, label, type]) => (
            <div className="field" key={key}>
              <label htmlFor={key}>{label}</label>
              {type === "textarea" ? (
                <textarea id={key} value={form[key] || ""} onChange={(e) => set(key, e.target.value)} />
              ) : (
                <input
                  id={key}
                  type="text"
                  value={form[key] || ""}
                  onChange={(e) => set(key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <button className="btn" type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

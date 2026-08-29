"use client";

import { useState } from "react";

export default function ImageUploadField({ label, value, onChange, accept = "image/*", help }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      onChange(data.url);
    } else {
      alert("Upload failed.");
    }
  }

  return (
    <div className="field">
      <label>{label}</label>
      {value && (
        <div>
          {accept.startsWith("video") ? (
            <video src={value} className="thumb-preview" controls style={{ maxWidth: 240 }} />
          ) : (
            <img src={value} alt="" className="thumb-preview" />
          )}
        </div>
      )}
      <input type="file" accept={accept} onChange={handleFile} disabled={uploading} />
      {uploading && <small>Uploading…</small>}
      {help && <small>{help}</small>}
    </div>
  );
}

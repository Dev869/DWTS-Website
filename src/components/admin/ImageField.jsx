import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

export default function ImageField({ value, onChange, placeholder, label }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      onChange(blob.url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <span className="block text-[10px] font-medium uppercase tracking-wide text-[#4B5563]">
          {label}
        </span>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "/path or https://…"}
          className="flex-1 rounded border border-[#E4E7EC] bg-white px-3 py-2 text-sm text-[#1F2328] outline-none transition-colors focus:border-[#049B9F]"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded border border-[#E4E7EC] bg-white px-3 py-2 text-xs font-semibold text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded border border-[#E4E7EC] bg-white px-3 py-2 text-xs font-semibold text-[#4B5563] transition-colors hover:border-red-400 hover:text-red-600"
            title="Clear image"
            aria-label="Clear image"
          >
            ✕
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {value && (
        <div className="overflow-hidden rounded border border-[#E4E7EC] bg-[#F9FAFB]">
          <img
            src={value}
            alt="preview"
            className="h-32 w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}

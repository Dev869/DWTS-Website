import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageField from "../components/admin/ImageField";

const EMPTY_PROJECT = {
  title: "",
  slug: "",
  description: "",
  category: "",
  layout: "product",
  tags: [],
  techStack: [],
};

const LAYOUT_OPTIONS = [
  {
    id: "product",
    label: "Product",
    tagline: "Airy hero, feature grid, alternating problem/approach blocks, dark results band. Best default.",
    emphasis: ["Hero + CTAs", "Features grid", "Results band", "Before/After"],
  },
  {
    id: "showcase",
    label: "Showcase",
    tagline: "Bold intro with device mockup; leans on visuals + feature cards.",
    emphasis: ["Device mockup", "Feature grid", "Gallery"],
  },
  {
    id: "casestudy",
    label: "Case study",
    tagline: "Narrative-heavy: Challenge → Approach → Key decisions with callouts.",
    emphasis: ["Problem / Approach", "Key decisions", "Quote"],
  },
  {
    id: "interactive",
    label: "Interactive",
    tagline: "Process-first layout with how-it-works steps and metrics up front.",
    emphasis: ["Process flow", "Numbered steps", "Metrics"],
  },
];

const LAYOUTS = LAYOUT_OPTIONS.map((l) => l.id);

export default function AdminDashboard({ onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", { credentials: "include", cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(project) {
    if (!confirm(`Delete project "${project.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed");
      }
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    onLogout?.();
  }

  if (editing || creating) {
    return (
      <ProjectEditor
        project={creating ? EMPTY_PROJECT : editing}
        isNew={creating}
        onCancel={() => {
          setEditing(null);
          setCreating(false);
        }}
        onSaved={async (saved) => {
          setEditing(null);
          setCreating(false);
          await loadProjects();
          setToast(
            saved
              ? `Saved "${saved.title}" — image: ${saved.image || "(none)"}`
              : "Saved",
          );
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {toast && (
        <div className="fixed top-4 left-1/2 z-50 max-w-lg -translate-x-1/2 rounded-lg border border-[#049B9F]/40 bg-white px-4 py-3 text-sm text-[#1F2328] shadow-lg">
          <span className="mr-2 text-[#049B9F]">✓</span>
          <span className="break-all">{toast}</span>
        </div>
      )}
      <header className="border-b border-[#E4E7EC] bg-white px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-[#1F2328]">Project Admin</h1>
            <p className="text-xs text-[#4B5563]">Manage portfolio projects.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded border border-[#E4E7EC] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded border border-[#E4E7EC] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:border-red-400 hover:text-red-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#4B5563]">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </h2>
          <button
            onClick={() => setCreating(true)}
            className="rounded bg-[#049B9F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#06B5B9]"
          >
            + New project
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB] text-xs uppercase tracking-wide text-[#4B5563]">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Layout</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[#4B5563]">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[#4B5563]">
                    No projects yet.
                  </td>
                </tr>
              )}
              {!loading &&
                projects.map((p) => (
                  <tr key={p.id} className="border-t border-[#E4E7EC] hover:bg-[#F9FAFB]">
                    <td className="px-4 py-3 font-medium text-[#1F2328]">{p.title}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#4B5563]">{p.slug}</td>
                    <td className="px-4 py-3 text-[#4B5563]">{p.category || "—"}</td>
                    <td className="px-4 py-3 text-[#4B5563]">{p.layout || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setEditing(p)}
                        className="mr-2 rounded border border-[#E4E7EC] px-2.5 py-1 text-xs font-medium text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="rounded border border-[#E4E7EC] px-2.5 py-1 text-xs font-medium text-[#4B5563] transition-colors hover:border-red-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function ProjectEditor({ project, isNew, onCancel, onSaved }) {
  const [draft, setDraft] = useState(() => ({
    title: project.title || "",
    slug: project.slug || "",
    description: project.description || "",
    category: project.category || "",
    layout: project.layout || "showcase",
    headline: project.headline || "",
    image: project.image || "",
    previewImage: project.previewImage || "",
    problemImage: project.problemImage || "",
    approachImage: project.approachImage || "",
    link: project.link || "",
    demoUrl: project.demoUrl || "",
    beta: !!project.beta,
    openSource: !!project.openSource,
    tags: (project.tags || []).join(", "),
    techStack: (project.techStack || []).join(", "),
    problem: project.problem || "",
    approach: project.approach || "",
    quote: project.quote || "",
    quoteAttribution: project.quoteAttribution || "",
    gradient: project.gradient || "",
    results: project.results || [],
    features: project.features || [],
    featureListTitle: project.featureListTitle || "",
    featureList: project.featureList || [],
    processSteps: project.processSteps || [],
    before: project.before || [],
    after: project.after || [],
    gallery: project.gallery || [],
  }));
  const [showRawJson, setShowRawJson] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(patch) {
    setDraft((d) => ({ ...d, ...patch }));
  }

  function toArray(value) {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function pruneObjects(rows, keys) {
    return rows
      .map((row) => {
        const cleaned = {};
        for (const k of keys) {
          if (row[k] != null && String(row[k]).trim() !== "") cleaned[k] = row[k];
        }
        return cleaned;
      })
      .filter((row) => Object.keys(row).length > 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      title: draft.title,
      slug: draft.slug,
      description: draft.description,
      category: draft.category,
      layout: draft.layout,
      headline: draft.headline,
      image: draft.image,
      previewImage: draft.previewImage,
      problemImage: draft.problemImage,
      approachImage: draft.approachImage,
      link: draft.link,
      demoUrl: draft.demoUrl,
      beta: draft.beta,
      openSource: draft.openSource,
      tags: toArray(draft.tags),
      techStack: toArray(draft.techStack),
      problem: draft.problem,
      approach: draft.approach,
      quote: draft.quote,
      quoteAttribution: draft.quoteAttribution,
      gradient: draft.gradient,
      results: pruneObjects(draft.results, ["metric", "label"]),
      features: pruneObjects(draft.features, ["icon", "title", "desc"]),
      featureListTitle: draft.featureListTitle,
      featureList: pruneObjects(draft.featureList, ["title", "desc"]),
      processSteps: pruneObjects(draft.processSteps, ["label", "desc"]),
      gallery: pruneObjects(draft.gallery, ["src", "caption", "frame", "url"]),
      before: draft.before.map((s) => s.trim()).filter(Boolean),
      after: draft.after.map((s) => s.trim()).filter(Boolean),
    };

    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${project.id}`;
    const method = isNew ? "POST" : "PUT";

    console.log("[admin] save →", method, url, payload);

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        /* non-JSON response */
      }
      console.log("[admin] save response", res.status, data || text);
      if (!res.ok) {
        throw new Error(data.error || `Save failed (${res.status})`);
      }
      const savedImage = data.project?.image;
      const sentImage = payload.image;
      if (sentImage && savedImage !== sentImage) {
        console.warn(
          "[admin] saved project.image differs from what was sent",
          { sent: sentImage, saved: savedImage },
        );
      }
      onSaved?.(data.project);
    } catch (err) {
      console.error("[admin] save error", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <header className="border-b border-[#E4E7EC] bg-white px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-[#1F2328]">
              {isNew ? "New project" : `Edit — ${project.title}`}
            </h1>
            <p className="text-xs text-[#4B5563]">
              All fields are editable below. Use the Raw JSON view for bulk paste/backup.
            </p>
          </div>
          <div className="flex gap-2">
            {!isNew && project.slug && (
              <a
                href={`/project/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[#E4E7EC] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
              >
                Preview ↗
              </a>
            )}
            <button
              onClick={onCancel}
              className="rounded border border-[#E4E7EC] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl px-6 py-8 md:px-10">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" required>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              className={inputClass}
              required
            />
          </Field>
          <Field label="Slug" required hint="URL-safe identifier, e.g. my-project">
            <input
              type="text"
              value={draft.slug}
              onChange={(e) => update({ slug: e.target.value })}
              className={inputClass}
              pattern="[a-z0-9\-]+"
              required
            />
          </Field>
          <Field label="Category">
            <input
              type="text"
              value={draft.category}
              onChange={(e) => update({ category: e.target.value })}
              className={inputClass}
            />
          </Field>
          <div />
          <Field
            label="Layout template"
            hint="Choose the page structure. Switching swaps the rendered template — fields stay the same."
            className="md:col-span-2"
          >
            <LayoutPicker
              value={draft.layout}
              onChange={(id) => update({ layout: id })}
            />
          </Field>
          <Field label="Description" className="md:col-span-2">
            <textarea
              value={draft.description}
              onChange={(e) => update({ description: e.target.value })}
              className={`${inputClass} min-h-[80px]`}
            />
          </Field>
          <Field label="Headline" className="md:col-span-2">
            <input
              type="text"
              value={draft.headline}
              onChange={(e) => update({ headline: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field
            label="Card preview image"
            className="md:col-span-2"
            hint="Small thumbnail shown on the home carousel and the Work list. Leave blank to fall back to the hero image."
          >
            <ImageField
              value={draft.previewImage}
              onChange={(v) => update({ previewImage: v })}
              placeholder="/previews/project-card.png or upload"
            />
          </Field>
          <Field
            label="Project hero image"
            className="md:col-span-2"
            hint="Full-width image at the top of the project detail page."
          >
            <ImageField
              value={draft.image}
              onChange={(v) => update({ image: v })}
              placeholder="/previews/project.png or upload"
            />
          </Field>
          <Field label="Gradient classes" hint="e.g. from-amber-200 via-orange-100 to-yellow-50">
            <input
              type="text"
              value={draft.gradient ?? ""}
              onChange={(e) => update({ gradient: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="External link">
            <input
              type="text"
              value={draft.link}
              onChange={(e) => update({ link: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Demo URL">
            <input
              type="text"
              value={draft.demoUrl}
              onChange={(e) => update({ demoUrl: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              type="text"
              value={draft.tags}
              onChange={(e) => update({ tags: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Tech stack (comma-separated)">
            <input
              type="text"
              value={draft.techStack}
              onChange={(e) => update({ techStack: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Beta?">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#1F2328]">
              <input
                type="checkbox"
                checked={draft.beta}
                onChange={(e) => update({ beta: e.target.checked })}
              />
              Mark this project as beta
            </label>
          </Field>
          <Field label="Open source?">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#1F2328]">
              <input
                type="checkbox"
                checked={draft.openSource}
                onChange={(e) => update({ openSource: e.target.checked })}
              />
              Show an Open source badge
            </label>
          </Field>
        </div>

        <Section title="Narrative">
          <Field label="Problem" className="md:col-span-2">
            <textarea
              value={draft.problem}
              onChange={(e) => update({ problem: e.target.value })}
              className={`${inputClass} min-h-[100px]`}
              placeholder="What problem did this project solve?"
            />
          </Field>
          <Field
            label="Problem illustration"
            hint="Shown next to the Problem section on Product layout. Falls back to gallery[0] if empty."
            className="md:col-span-2"
          >
            <ImageField
              value={draft.problemImage}
              onChange={(v) => update({ problemImage: v })}
              placeholder="/path or upload"
            />
          </Field>
          <Field label="Approach" className="md:col-span-2">
            <textarea
              value={draft.approach}
              onChange={(e) => update({ approach: e.target.value })}
              className={`${inputClass} min-h-[100px]`}
              placeholder="How did you solve it?"
            />
          </Field>
          <Field
            label="Approach illustration"
            hint="Shown next to the Approach section on Product layout. Falls back to gallery[1] if empty."
            className="md:col-span-2"
          >
            <ImageField
              value={draft.approachImage}
              onChange={(v) => update({ approachImage: v })}
              placeholder="/path or upload"
            />
          </Field>
        </Section>

        <Section title="Results">
          <RowsEditor
            rows={draft.results}
            onChange={(rows) => update({ results: rows })}
            columns={[
              { key: "metric", label: "Metric", placeholder: "80%", width: "w-32" },
              { key: "label", label: "Label", placeholder: "Time saved" },
            ]}
            addLabel="+ Add result"
            empty={{ metric: "", label: "" }}
          />
        </Section>

        <Section title="Features">
          <RowsEditor
            rows={draft.features}
            onChange={(rows) => update({ features: rows })}
            columns={[
              { key: "icon", label: "Icon", placeholder: "chart", width: "w-28" },
              { key: "title", label: "Title", placeholder: "Auto-Categorization", width: "w-56" },
              { key: "desc", label: "Description", placeholder: "What it does…", textarea: true },
            ]}
            addLabel="+ Add feature"
            empty={{ icon: "", title: "", desc: "" }}
          />
        </Section>

        <Section title="Feature list (dense)">
          <div className="md:col-span-2">
            <p className="mb-4 text-[12px] text-[#1a1a18]/60">
              Compact multi-column list for projects with many features.
              Renders between Features and Quote on the detail page.
            </p>
            <label className="mb-4 block">
              <span className="mb-1 block text-[11px] uppercase tracking-[0.22em] text-[#1a1a18]/55">
                List heading (optional)
              </span>
              <input
                type="text"
                value={draft.featureListTitle}
                onChange={(e) => update({ featureListTitle: e.target.value })}
                placeholder="Everything it does"
                className="w-full rounded-md border border-[#1a1a18]/15 bg-white px-3 py-2 text-[14px]"
              />
            </label>
            <RowsEditor
              rows={draft.featureList}
              onChange={(rows) => update({ featureList: rows })}
              columns={[
                { key: "title", label: "Title", placeholder: "Work order intake", width: "w-64" },
                { key: "desc", label: "Description (optional)", placeholder: "Short one-liner…", textarea: true },
              ]}
              addLabel="+ Add list item"
              empty={{ title: "", desc: "" }}
            />
          </div>
        </Section>

        <Section title="Process steps">
          <RowsEditor
            rows={draft.processSteps}
            onChange={(rows) => update({ processSteps: rows })}
            columns={[
              { key: "label", label: "Step", placeholder: "Detect", width: "w-40" },
              { key: "desc", label: "Description", placeholder: "What happens…", textarea: true },
            ]}
            addLabel="+ Add step"
            empty={{ label: "", desc: "" }}
          />
        </Section>

        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Before (pain points)">
            <StringListEditor
              items={draft.before}
              onChange={(items) => update({ before: items })}
              placeholder="Manual expense tracking…"
              addLabel="+ Add before item"
            />
          </Section>
          <Section title="After (outcomes)">
            <StringListEditor
              items={draft.after}
              onChange={(items) => update({ after: items })}
              placeholder="Fully automated pipeline…"
              addLabel="+ Add after item"
            />
          </Section>
        </div>

        <Section title="Testimonial / quote">
          <Field label="Quote" className="md:col-span-2">
            <textarea
              value={draft.quote}
              onChange={(e) => update({ quote: e.target.value })}
              className={`${inputClass} min-h-[80px]`}
            />
          </Field>
          <Field label="Attribution">
            <input
              type="text"
              value={draft.quoteAttribution}
              onChange={(e) => update({ quoteAttribution: e.target.value })}
              className={inputClass}
              placeholder="Built for Acme Corp"
            />
          </Field>
        </Section>

        <Section title="Gallery">
          <GalleryEditor
            rows={draft.gallery}
            onChange={(rows) => update({ gallery: rows })}
          />
        </Section>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowRawJson((v) => !v)}
            className="text-xs font-medium uppercase tracking-wide text-[#4B5563] transition-colors hover:text-[#049B9F]"
          >
            {showRawJson ? "▾ Hide" : "▸ Show"} raw JSON (read-only)
          </button>
          {showRawJson && (
            <pre className="mt-3 max-h-80 overflow-auto rounded border border-[#E4E7EC] bg-[#F9FAFB] p-3 font-mono text-[11px] text-[#1F2328]">
              {JSON.stringify(draft, null, 2)}
            </pre>
          )}
        </div>

        {error && (
          <div className="sticky bottom-4 z-10 mt-4 rounded border-2 border-red-400 bg-red-50 p-4 text-sm font-semibold text-red-700 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide">Save failed</div>
                <div className="font-normal">{error}</div>
              </div>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-700 hover:text-red-900"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-[#E4E7EC] bg-white px-4 py-2 text-sm font-medium text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-[#049B9F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#06B5B9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : isNew ? "Create project" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded border border-[#E4E7EC] bg-white px-3 py-2 text-sm text-[#1F2328] outline-none transition-colors focus:border-[#049B9F]";

function Field({ label, hint, children, required, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#4B5563]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[#4B5563]">{hint}</span>}
    </label>
  );
}

function LayoutPicker({ value, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {LAYOUT_OPTIONS.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`group relative flex flex-col gap-3 rounded-lg border p-4 text-left transition-all ${
              selected
                ? "border-[#049B9F] bg-[#049B9F]/5 ring-2 ring-[#049B9F]/20"
                : "border-[#E4E7EC] bg-white hover:border-[#049B9F]/40"
            }`}
            aria-pressed={selected}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#1F2328]">{opt.label}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                  selected
                    ? "border-[#049B9F] bg-[#049B9F] text-white"
                    : "border-[#E4E7EC] bg-white text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
            </div>
            <LayoutThumbnail id={opt.id} />
            <p className="text-xs leading-relaxed text-[#4B5563]">{opt.tagline}</p>
            <div className="flex flex-wrap gap-1">
              {opt.emphasis.map((e) => (
                <span
                  key={e}
                  className="rounded border border-[#E4E7EC] bg-[#F9FAFB] px-1.5 py-0.5 text-[10px] font-medium text-[#4B5563]"
                >
                  {e}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function LayoutThumbnail({ id }) {
  const base = "h-16 w-full rounded border border-[#E4E7EC] bg-white p-1.5 flex flex-col gap-1";
  const bar = "rounded bg-[#E4E7EC]";
  const accent = "rounded bg-[#049B9F]/40";
  if (id === "product") {
    return (
      <div className={base}>
        <div className="flex gap-1">
          <div className={`${accent} h-2 w-1/3`} />
          <div className={`${bar} h-2 flex-1`} />
        </div>
        <div className="grid flex-1 grid-cols-4 gap-1">
          <div className={`${bar}`} />
          <div className={`${bar}`} />
          <div className={`${bar}`} />
          <div className={`${bar}`} />
        </div>
      </div>
    );
  }
  if (id === "showcase") {
    return (
      <div className={base}>
        <div className={`${accent} h-3 w-full`} />
        <div className="grid flex-1 grid-cols-3 gap-1">
          <div className={`${bar}`} />
          <div className={`${bar}`} />
          <div className={`${bar}`} />
        </div>
      </div>
    );
  }
  if (id === "casestudy") {
    return (
      <div className={base}>
        <div className={`${accent} h-2 w-2/3`} />
        <div className={`${bar} h-2 w-full`} />
        <div className={`${bar} h-2 w-5/6`} />
        <div className={`${bar} h-2 w-3/4`} />
      </div>
    );
  }
  // interactive
  return (
    <div className={base}>
      <div className="flex flex-1 items-center gap-1">
        <div className={`${accent} h-6 w-6 rounded-full`} />
        <div className={`${bar} h-1 flex-1`} />
        <div className={`${accent} h-6 w-6 rounded-full`} />
        <div className={`${bar} h-1 flex-1`} />
        <div className={`${accent} h-6 w-6 rounded-full`} />
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-8 rounded-lg border border-[#E4E7EC] bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#1F2328]">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function RowsEditor({ rows, onChange, columns, addLabel, empty }) {
  function updateRow(i, patch) {
    const next = rows.map((row, idx) => (idx === i ? { ...row, ...patch } : row));
    onChange(next);
  }
  function removeRow(i) {
    onChange(rows.filter((_, idx) => idx !== i));
  }
  function moveRow(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function addRow() {
    onChange([...rows, { ...empty }]);
  }

  return (
    <div className="md:col-span-2 space-y-3">
      {rows.length === 0 && (
        <p className="rounded border border-dashed border-[#E4E7EC] bg-[#F9FAFB] px-3 py-4 text-center text-xs text-[#4B5563]">
          No entries yet.
        </p>
      )}
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded border border-[#E4E7EC] bg-[#F9FAFB] p-3 md:flex-row md:items-start"
        >
          <div className="flex flex-1 flex-col gap-2 md:flex-row">
            {columns.map((col) => (
              <div key={col.key} className={`flex-1 ${col.width || ""}`}>
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[#4B5563]">
                  {col.label}
                </span>
                {col.textarea ? (
                  <textarea
                    value={row[col.key] || ""}
                    onChange={(e) => updateRow(i, { [col.key]: e.target.value })}
                    placeholder={col.placeholder}
                    className={`${inputClass} min-h-[52px]`}
                  />
                ) : (
                  <input
                    type="text"
                    value={row[col.key] || ""}
                    onChange={(e) => updateRow(i, { [col.key]: e.target.value })}
                    placeholder={col.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-start gap-1 md:flex-col">
            <IconButton title="Move up" onClick={() => moveRow(i, -1)} disabled={i === 0}>
              ↑
            </IconButton>
            <IconButton
              title="Move down"
              onClick={() => moveRow(i, 1)}
              disabled={i === rows.length - 1}
            >
              ↓
            </IconButton>
            <IconButton title="Remove" onClick={() => removeRow(i)} variant="danger">
              ✕
            </IconButton>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="rounded border border-dashed border-[#049B9F] bg-white px-3 py-1.5 text-xs font-semibold text-[#049B9F] transition-colors hover:bg-[#049B9F]/5"
      >
        {addLabel}
      </button>
    </div>
  );
}

function StringListEditor({ items, onChange, placeholder, addLabel }) {
  function updateItem(i, value) {
    onChange(items.map((v, idx) => (idx === i ? value : v)));
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function moveItem(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="md:col-span-2 space-y-2">
      {items.length === 0 && (
        <p className="rounded border border-dashed border-[#E4E7EC] bg-[#F9FAFB] px-3 py-3 text-center text-xs text-[#4B5563]">
          No entries yet.
        </p>
      )}
      {items.map((value, i) => (
        <div key={i} className="flex items-center gap-1">
          <input
            type="text"
            value={value}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={placeholder}
            className={inputClass}
          />
          <IconButton title="Move up" onClick={() => moveItem(i, -1)} disabled={i === 0}>
            ↑
          </IconButton>
          <IconButton
            title="Move down"
            onClick={() => moveItem(i, 1)}
            disabled={i === items.length - 1}
          >
            ↓
          </IconButton>
          <IconButton title="Remove" onClick={() => removeItem(i)} variant="danger">
            ✕
          </IconButton>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="rounded border border-dashed border-[#049B9F] bg-white px-3 py-1.5 text-xs font-semibold text-[#049B9F] transition-colors hover:bg-[#049B9F]/5"
      >
        {addLabel}
      </button>
    </div>
  );
}

function GalleryEditor({ rows, onChange }) {
  function updateRow(i, patch) {
    onChange(rows.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function removeRow(i) {
    onChange(rows.filter((_, idx) => idx !== i));
  }
  function moveRow(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function addRow() {
    onChange([...rows, { src: "", caption: "", frame: "browser", url: "" }]);
  }

  return (
    <div className="md:col-span-2 space-y-3">
      {rows.length === 0 && (
        <p className="rounded border border-dashed border-[#E4E7EC] bg-[#F9FAFB] px-3 py-4 text-center text-xs text-[#4B5563]">
          No images yet.
        </p>
      )}
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 rounded border border-[#E4E7EC] bg-[#F9FAFB] p-3 md:flex-row md:items-start"
        >
          <div className="flex-1 space-y-3">
            <ImageField
              label="Image"
              value={row.src}
              onChange={(v) => updateRow(i, { src: v })}
              placeholder="/path or upload"
            />
            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[#4B5563]">
                  Caption
                </span>
                <input
                  type="text"
                  value={row.caption || ""}
                  onChange={(e) => updateRow(i, { caption: e.target.value })}
                  placeholder="Dashboard overview"
                  className={inputClass}
                />
              </div>
              <div>
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[#4B5563]">
                  Frame
                </span>
                <select
                  value={row.frame || "browser"}
                  onChange={(e) => updateRow(i, { frame: e.target.value })}
                  className={inputClass}
                >
                  <option value="browser">Browser</option>
                  <option value="phone">Phone</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            {row.frame !== "phone" && (row.frame === "browser" || !row.frame) && (
              <div>
                <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[#4B5563]">
                  URL shown in browser bar (optional)
                </span>
                <input
                  type="text"
                  value={row.url || ""}
                  onChange={(e) => updateRow(i, { url: e.target.value })}
                  placeholder="dwtailored.com/app"
                  className={inputClass}
                />
              </div>
            )}
          </div>
          <div className="flex items-start gap-1 md:flex-col">
            <IconButton title="Move up" onClick={() => moveRow(i, -1)} disabled={i === 0}>↑</IconButton>
            <IconButton title="Move down" onClick={() => moveRow(i, 1)} disabled={i === rows.length - 1}>↓</IconButton>
            <IconButton title="Remove" onClick={() => removeRow(i)} variant="danger">✕</IconButton>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="rounded border border-dashed border-[#049B9F] bg-white px-3 py-1.5 text-xs font-semibold text-[#049B9F] transition-colors hover:bg-[#049B9F]/5"
      >
        + Add image
      </button>
    </div>
  );
}

function IconButton({ children, onClick, disabled, title, variant }) {
  const danger = variant === "danger";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`flex h-7 w-7 items-center justify-center rounded border text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        danger
          ? "border-[#E4E7EC] text-[#4B5563] hover:border-red-400 hover:text-red-600"
          : "border-[#E4E7EC] text-[#4B5563] hover:border-[#049B9F] hover:text-[#049B9F]"
      }`}
    >
      {children}
    </button>
  );
}

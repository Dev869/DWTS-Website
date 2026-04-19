import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EMPTY_PROJECT = {
  title: "",
  slug: "",
  description: "",
  category: "",
  layout: "showcase",
  tags: [],
  techStack: [],
};

const LAYOUTS = ["showcase", "casestudy", "interactive"];

export default function AdminDashboard({ onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

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
        onSaved={async () => {
          setEditing(null);
          setCreating(false);
          await loadProjects();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
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
    link: project.link || "",
    demoUrl: project.demoUrl || "",
    beta: !!project.beta,
    tags: (project.tags || []).join(", "),
    techStack: (project.techStack || []).join(", "),
  }));
  const [advancedJson, setAdvancedJson] = useState(() =>
    JSON.stringify(
      {
        problem: project.problem || "",
        approach: project.approach || "",
        results: project.results || [],
        features: project.features || [],
        processSteps: project.processSteps || [],
        before: project.before || [],
        after: project.after || [],
        quote: project.quote || "",
        quoteAttribution: project.quoteAttribution || "",
        gallery: project.gallery || [],
        gradient: project.gradient || "",
      },
      null,
      2,
    ),
  );
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

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    let advanced;
    try {
      advanced = advancedJson.trim() ? JSON.parse(advancedJson) : {};
    } catch (err) {
      setError(`Advanced JSON is invalid: ${err.message}`);
      setSaving(false);
      return;
    }
    const payload = {
      ...advanced,
      title: draft.title,
      slug: draft.slug,
      description: draft.description,
      category: draft.category,
      layout: draft.layout,
      headline: draft.headline,
      image: draft.image,
      link: draft.link,
      demoUrl: draft.demoUrl,
      beta: draft.beta,
      tags: toArray(draft.tags),
      techStack: toArray(draft.techStack),
    };

    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${project.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      onSaved?.();
    } catch (err) {
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
              Top-level fields are direct inputs. Nested content is edited as JSON below.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="rounded border border-[#E4E7EC] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] transition-colors hover:border-[#049B9F] hover:text-[#049B9F]"
          >
            Cancel
          </button>
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
          <Field label="Layout">
            <select
              value={draft.layout}
              onChange={(e) => update({ layout: e.target.value })}
              className={inputClass}
            >
              {LAYOUTS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
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
          <Field label="Preview image URL">
            <input
              type="text"
              value={draft.image}
              onChange={(e) => update({ image: e.target.value })}
              className={inputClass}
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
        </div>

        <div className="mt-8">
          <Field
            label="Advanced (JSON)"
            hint="Nested fields: problem, approach, results, features, processSteps, before, after, quote, quoteAttribution, gallery, gradient."
          >
            <textarea
              value={advancedJson}
              onChange={(e) => setAdvancedJson(e.target.value)}
              className={`${inputClass} min-h-[320px] font-mono text-xs`}
              spellCheck={false}
            />
          </Field>
        </div>

        {error && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
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

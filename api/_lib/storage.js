import { put, list } from "@vercel/blob";
import seedProjects from "../../src/data/projects.js";

const BLOB_KEY = "projects.json";

function sanitizeProject(p) {
  if (!p || typeof p !== "object") return null;
  const required = ["title", "slug"];
  for (const key of required) {
    if (!p[key] || typeof p[key] !== "string") return null;
  }
  return p;
}

async function fetchBlobJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Blob fetch failed: ${res.status}`);
  return res.json();
}

export async function readProjects() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return seedProjects;
  }

  try {
    const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
    const match = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!match) return seedProjects;
    const data = await fetchBlobJson(match.url);
    if (Array.isArray(data)) return data;
  } catch (err) {
    console.error("readProjects: falling back to seed:", err);
  }
  return seedProjects;
}

export async function writeProjects(projects) {
  if (!Array.isArray(projects)) {
    throw new Error("writeProjects: projects must be an array");
  }
  const cleaned = projects.map(sanitizeProject).filter(Boolean);
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN env var is required to write projects.");
  }
  await put(BLOB_KEY, JSON.stringify(cleaned, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
  return cleaned;
}

function nextId(projects) {
  const max = projects.reduce((m, p) => (typeof p.id === "number" && p.id > m ? p.id : m), 0);
  return max + 1;
}

export async function listProjects() {
  return readProjects();
}

export async function getProject(id) {
  const projects = await readProjects();
  return projects.find((p) => String(p.id) === String(id)) || null;
}

export async function createProject(data) {
  const projects = await readProjects();
  const project = { ...data, id: nextId(projects) };
  const sanitized = sanitizeProject(project);
  if (!sanitized) throw new Error("Invalid project payload (title and slug required).");
  if (projects.some((p) => p.slug === sanitized.slug)) {
    throw new Error(`A project with slug "${sanitized.slug}" already exists.`);
  }
  const next = [...projects, sanitized];
  await writeProjects(next);
  return sanitized;
}

export async function updateProject(id, data) {
  const projects = await readProjects();
  const idx = projects.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) return null;
  const merged = { ...projects[idx], ...data, id: projects[idx].id };
  const sanitized = sanitizeProject(merged);
  if (!sanitized) throw new Error("Invalid project payload (title and slug required).");
  if (projects.some((p, i) => i !== idx && p.slug === sanitized.slug)) {
    throw new Error(`Another project already uses slug "${sanitized.slug}".`);
  }
  const next = [...projects];
  next[idx] = sanitized;
  await writeProjects(next);
  return sanitized;
}

export async function deleteProject(id) {
  const projects = await readProjects();
  const next = projects.filter((p) => String(p.id) !== String(id));
  if (next.length === projects.length) return false;
  await writeProjects(next);
  return true;
}

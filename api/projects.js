import { listProjects } from "./_lib/storage.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const projects = await listProjects();
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    res.status(200).json({ projects });
  } catch (err) {
    console.error("GET /api/projects", err);
    res.status(500).json({ error: "Failed to load projects" });
  }
}

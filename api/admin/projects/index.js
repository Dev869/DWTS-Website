import { requireAdmin } from "../../_lib/auth.js";
import { listProjects, createProject } from "../../_lib/storage.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;

  try {
    if (req.method === "GET") {
      const projects = await listProjects();
      res.status(200).json({ projects });
      return;
    }
    if (req.method === "POST") {
      const body = req.body || {};
      const project = await createProject(body);
      res.status(201).json({ project });
      return;
    }
    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("admin/projects", err);
    res.status(400).json({ error: err.message || "Bad request" });
  }
}

import { requireAdmin } from "../../_lib/auth.js";
import { getProject, updateProject, deleteProject } from "../../_lib/storage.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;

  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: "Missing id" });
    return;
  }

  try {
    if (req.method === "GET") {
      const project = await getProject(id);
      if (!project) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.status(200).json({ project });
      return;
    }
    if (req.method === "PUT") {
      const project = await updateProject(id, req.body || {});
      if (!project) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.status(200).json({ project });
      return;
    }
    if (req.method === "DELETE") {
      const ok = await deleteProject(id);
      if (!ok) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.status(204).end();
      return;
    }
    res.setHeader("Allow", "GET, PUT, DELETE");
    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("admin/projects/[id]", err);
    res.status(400).json({ error: err.message || "Bad request" });
  }
}

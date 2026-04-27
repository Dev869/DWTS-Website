import { requireAdmin } from "../_lib/auth.js";
import { readSiteCopy, writeSiteCopy } from "../_lib/copyStorage.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;

  try {
    if (req.method === "GET") {
      const copy = await readSiteCopy();
      res.status(200).json({ copy });
      return;
    }
    if (req.method === "PUT") {
      const body = req.body || {};
      const copy = body.copy && typeof body.copy === "object" ? body.copy : body;
      const saved = await writeSiteCopy(copy);
      res.status(200).json({ copy: saved });
      return;
    }
    res.setHeader("Allow", "GET, PUT");
    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("admin/site-copy", err);
    res.status(400).json({ error: err.message || "Bad request" });
  }
}

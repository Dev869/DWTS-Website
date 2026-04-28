import { readSiteCopy } from "./_lib/copyStorage.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const copy = await readSiteCopy();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ copy });
  } catch (err) {
    console.error("GET /api/site-copy", err);
    res.status(500).json({ error: "Failed to load site copy" });
  }
}

import { serializeSetCookie } from "../_lib/auth.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  res.setHeader("Set-Cookie", serializeSetCookie("", { clear: true }));
  res.status(200).json({ ok: true });
}

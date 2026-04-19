import {
  createSessionCookie,
  serializeSetCookie,
  verifyPassword,
  SESSION_TTL_SEC,
} from "../_lib/auth.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { password } = req.body || {};
    if (!password || typeof password !== "string") {
      res.status(400).json({ error: "Password required" });
      return;
    }
    if (!verifyPassword(password)) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }
    const cookie = createSessionCookie("admin");
    res.setHeader("Set-Cookie", serializeSetCookie(cookie, { maxAgeSec: SESSION_TTL_SEC }));
    res.status(200).json({ ok: true, user: "admin" });
  } catch (err) {
    console.error("POST /api/admin/login", err);
    res.status(500).json({ error: "Server error" });
  }
}

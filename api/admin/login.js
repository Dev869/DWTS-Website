import {
  createSessionCookie,
  serializeSetCookie,
  verifyGoogleCredential,
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
    const { credential } = req.body || {};
    const user = await verifyGoogleCredential(credential);
    const cookie = createSessionCookie(user.email);
    res.setHeader("Set-Cookie", serializeSetCookie(cookie, { maxAgeSec: SESSION_TTL_SEC }));
    res.status(200).json({ ok: true, user });
  } catch (err) {
    if (err.code === "FORBIDDEN") {
      res.status(403).json({ error: err.message });
      return;
    }
    console.error("POST /api/admin/login", err);
    res.status(401).json({ error: err.message || "Login failed" });
  }
}

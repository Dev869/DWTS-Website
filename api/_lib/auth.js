import crypto from "node:crypto";

const COOKIE_NAME = "dwts_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET env var must be set (>= 16 chars).");
  }
  return secret;
}

function b64urlEncode(buf) {
  return Buffer.from(buf).toString("base64url");
}

function b64urlDecode(str) {
  return Buffer.from(str, "base64url").toString();
}

function sign(payload) {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionCookie(user = "admin") {
  const exp = Date.now() + SESSION_TTL_MS;
  const body = `${b64urlEncode(user)}.${b64urlEncode(String(exp))}`;
  const sig = sign(body);
  return `${body}.${sig}`;
}

export function verifySessionCookie(value) {
  if (!value || typeof value !== "string") return null;
  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [userEnc, expEnc, sig] = parts;
  const body = `${userEnc}.${expEnc}`;
  const expected = sign(body);
  const sigBuf = Buffer.from(sig, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  const exp = Number(b64urlDecode(expEnc));
  if (!Number.isFinite(exp) || exp < Date.now()) return null;
  return { user: b64urlDecode(userEnc), exp };
}

export function serializeSetCookie(value, { maxAgeSec, clear = false } = {}) {
  const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
  const attrs = [
    `${COOKIE_NAME}=${clear ? "" : value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (isProd) attrs.push("Secure");
  if (clear) {
    attrs.push("Max-Age=0");
  } else if (maxAgeSec) {
    attrs.push(`Max-Age=${maxAgeSec}`);
  }
  return attrs.join("; ");
}

export function parseCookies(req) {
  const header = req.headers?.cookie || "";
  const out = {};
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (!k) continue;
    out[k] = rest.join("=");
  }
  return out;
}

export function getSessionFromRequest(req) {
  const cookies = parseCookies(req);
  return verifySessionCookie(cookies[COOKIE_NAME]);
}

export function requireAdmin(req, res) {
  const session = getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}

const DEFAULT_ADMIN_EMAIL = "devin@dwtailored.com";

function getAllowedEmails() {
  const raw = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

let cachedOAuthClient;
async function getOAuthClient() {
  if (cachedOAuthClient) return cachedOAuthClient;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID env var is not set.");
  }
  const { OAuth2Client } = await import("google-auth-library");
  cachedOAuthClient = new OAuth2Client(clientId);
  return cachedOAuthClient;
}

export async function verifyGoogleCredential(idToken) {
  if (!idToken || typeof idToken !== "string") {
    throw new Error("Missing Google credential.");
  }
  const client = await getOAuthClient();
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error("Invalid Google credential.");
  if (!payload.email || !payload.email_verified) {
    throw new Error("Email not verified by Google.");
  }
  const email = payload.email.toLowerCase();
  const allowed = getAllowedEmails();
  if (!allowed.includes(email)) {
    const err = new Error("This Google account is not authorized.");
    err.code = "FORBIDDEN";
    throw err;
  }
  return { email, name: payload.name, picture: payload.picture };
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_TTL_SEC = Math.floor(SESSION_TTL_MS / 1000);

import { getSessionFromRequest } from "../_lib/auth.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const session = getSessionFromRequest(req);
  if (!session) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.status(200).json({ authenticated: true, user: session.user, exp: session.exp });
}

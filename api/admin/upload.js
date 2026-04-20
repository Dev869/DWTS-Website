import { handleUpload } from "@vercel/blob/client";
import { requireAdmin } from "../_lib/auth.js";

export const config = { runtime: "nodejs" };

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const session = requireAdmin(req, res);
        if (!session) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ pathname, user: session.user }),
        };
      },
      onUploadCompleted: async () => {
        // No-op: admin polls /api/admin/projects for fresh data.
      },
    });
    if (!res.headersSent) {
      res.status(200).json(jsonResponse);
    }
  } catch (err) {
    console.error("POST /api/admin/upload", err);
    if (!res.headersSent) {
      const code = err.message === "Unauthorized" ? 401 : 400;
      res.status(code).json({ error: err.message || "Upload failed" });
    }
  }
}

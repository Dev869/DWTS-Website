import { requireAdmin } from "../_lib/auth.js";

export const config = { runtime: "nodejs", maxDuration: 60 };

const GEMINI_MODEL = "gemini-2.5-flash";

const FIELD_GUIDE = `
Return ONLY a JSON object matching this schema (no prose, no markdown). Every field is optional — omit any you cannot reasonably infer:

{
  "headline": string,              // punchy one-liner positioning the project
  "description": string,           // 1–2 sentence elevator pitch
  "category": string,              // e.g. "Analytics", "Reporting", "Operations"
  "tags": string[],                // 3–6 concise tags (tech + domain)
  "techStack": string[],           // 3–8 libraries/frameworks
  "problem": string,               // 2–3 sentences on the before-state pain
  "approach": string,              // 2–3 sentences on how the solution works
  "results": [ { "metric": string, "label": string } ],   // 3 items, metric < 6 chars
  "features": [ { "icon": string, "title": string, "desc": string } ], // 4 items, icon is a short keyword like "chart","doc","shield"
  "featureListTitle": string,
  "featureList": [ { "title": string, "desc": string } ], // 8–12 short bullets
  "processSteps": [ { "label": string, "desc": string } ],// 3–5 steps
  "before": string[],              // 3–4 bullets of the before-state
  "after": string[],               // 3–4 bullets of the after-state
  "quote": string,                 // 1-sentence testimonial-style quote
  "quoteAttribution": string,      // short role/org
  "cardText": string,              // 1-sentence hook used on the home card
  "cardKicker": string,            // 2–4 word kicker label
  "gradient": string               // Tailwind bg gradient classes, e.g. "from-amber-200 via-orange-100 to-yellow-50"
}

Style: confident, minimalist, plainspoken. No emoji. No buzzwords. Keep tone consistent with a high-end bespoke-software studio.
`.trim();

function buildPrompt(input) {
  const safe = (v) => (typeof v === "string" ? v.trim() : "");
  const known = {
    title: safe(input.title),
    slug: safe(input.slug),
    category: safe(input.category),
    description: safe(input.description),
    headline: safe(input.headline),
    link: safe(input.link),
    demoUrl: safe(input.demoUrl),
    techStack: Array.isArray(input.techStack) ? input.techStack : [],
    tags: Array.isArray(input.tags) ? input.tags : [],
    problem: safe(input.problem),
    approach: safe(input.approach),
  };
  return [
    "You are filling out a project entry for the DW Tailored Systems portfolio (a high-end bespoke-software studio).",
    "Use what you're given and expand it into a full project record.",
    "Known fields so far:",
    JSON.stringify(known, null, 2),
    "",
    FIELD_GUIDE,
  ].join("\n");
}

function extractJson(text) {
  if (!text) return null;
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fence ? fence[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const session = requireAdmin(req, res);
  if (!session) return;

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    return;
  }

  const input = req.body || {};
  if (!input.title || typeof input.title !== "string") {
    res.status(400).json({ error: "`title` is required to generate content." });
    return;
  }

  const prompt = buildPrompt(input);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("gemini non-OK", upstream.status, detail);
      res.status(502).json({ error: "Gemini request failed", status: upstream.status });
      return;
    }

    const data = await upstream.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("\n") || "";
    const parsed = extractJson(text);
    if (!parsed) {
      res.status(502).json({ error: "Could not parse model output as JSON.", raw: text.slice(0, 2000) });
      return;
    }

    res.status(200).json({ fields: parsed });
  } catch (err) {
    console.error("ai-fill error", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
}

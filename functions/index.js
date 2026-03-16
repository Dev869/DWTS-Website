const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const Anthropic = require("@anthropic-ai/sdk");

admin.initializeApp();

const SYSTEM_PROMPT =
  "You are the DW Architect, an AI concierge for DW Tailored Systems. " +
  "You help potential clients discover their software needs. " +
  "Start by asking 3 discovery questions about their business, goals, and " +
  "technical requirements before proposing a bespoke SaaS architecture.";

const ALLOWED_ORIGINS = [
  "https://dwtailoredsystems.com",
  "https://www.dwtailoredsystems.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  } else {
    res.set("Access-Control-Allow-Origin", ALLOWED_ORIGINS[0]);
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Max-Age", "3600");
}

exports.handleChat = onRequest(
  { region: "us-central1", timeoutSeconds: 60 },
  async (req, res) => {
    setCorsHeaders(req, res);

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { prompt, history } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Request body must include a 'prompt' string." });
      return;
    }

    if (history !== undefined && !Array.isArray(history)) {
      res.status(400).json({ error: "'history' must be an array of {role, content} messages." });
      return;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY environment variable is not set.");
      res.status(500).json({ error: "Server configuration error." });
      return;
    }

    try {
      const anthropic = new Anthropic({ apiKey });

      const messages = [
        ...(history || []).map(({ role, content }) => ({ role, content })),
        { role: "user", content: prompt },
      ];

      const response = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      });

      res.status(200).json({
        id: response.id,
        role: response.role,
        content: response.content,
        model: response.model,
        stop_reason: response.stop_reason,
        usage: response.usage,
      });
    } catch (err) {
      console.error("Anthropic API error:", err);

      if (err.status) {
        res.status(err.status).json({ error: err.message || "Anthropic API error." });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  }
);

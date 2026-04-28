import { put, list } from "@vercel/blob";
import seedCopy from "../../src/data/siteCopy.js";

const BLOB_KEY = "site-copy.json";

async function fetchBlobJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Blob fetch failed: ${res.status}`);
  return res.json();
}

// Merge stored copy on top of seed so newly added keys in code always render
// (admin doesn't need to re-save every page when we add a field).
function mergeWithSeed(stored) {
  if (!stored || typeof stored !== "object") return seedCopy;
  const out = {};
  for (const page of Object.keys(seedCopy)) {
    out[page] = { ...seedCopy[page], ...(stored[page] || {}) };
  }
  return out;
}

export async function readSiteCopy() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return seedCopy;
  }
  try {
    const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
    const match = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!match) return seedCopy;
    const data = await fetchBlobJson(match.url);
    return mergeWithSeed(data);
  } catch (err) {
    console.error("readSiteCopy: falling back to seed:", err);
    return seedCopy;
  }
}

export async function writeSiteCopy(copy) {
  if (!copy || typeof copy !== "object") {
    throw new Error("writeSiteCopy: copy must be an object");
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN env var is required to write site copy.");
  }
  // Only persist keys we know about, but accept new values for them.
  const cleaned = {};
  for (const page of Object.keys(seedCopy)) {
    const incoming = copy[page] || {};
    cleaned[page] = {};
    for (const key of Object.keys(seedCopy[page])) {
      const val = incoming[key];
      cleaned[page][key] = typeof val === "string" ? val : seedCopy[page][key];
    }
  }
  await put(BLOB_KEY, JSON.stringify(cleaned, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
  return cleaned;
}

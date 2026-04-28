import { useEffect, useState } from "react";
import seedCopy from "../data/siteCopy";

// Module-level cache so navigation between pages doesn't re-fetch.
let cached = null;
let inflight = null;

function mergeWithSeed(stored) {
  if (!stored || typeof stored !== "object") return seedCopy;
  const out = {};
  for (const page of Object.keys(seedCopy)) {
    out[page] = { ...seedCopy[page], ...(stored[page] || {}) };
  }
  return out;
}

export function useSiteCopy() {
  const [copy, setCopy] = useState(cached || seedCopy);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return;
    let cancelled = false;
    if (!inflight) {
      inflight = fetch("/api/site-copy", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
        .then((data) => mergeWithSeed(data?.copy))
        .catch(() => seedCopy)
        .then((merged) => {
          cached = merged;
          inflight = null;
          return merged;
        });
    }
    inflight.then((merged) => {
      if (cancelled) return;
      setCopy(merged);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { copy, loading };
}

// Helper: read one page's bag with a guaranteed shape (falls back to seed).
export function usePageCopy(page) {
  const { copy, loading } = useSiteCopy();
  return { c: copy[page] || seedCopy[page] || {}, loading };
}

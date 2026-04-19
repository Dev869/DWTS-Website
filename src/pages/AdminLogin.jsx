import { useEffect, useRef, useState } from "react";

const GIS_SRC = "https://accounts.google.com/gsi/client";

function loadGoogleScript() {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.google?.accounts?.id) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GIS_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google script")));
      return;
    }
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google script"));
    document.head.appendChild(script);
  });
}

export default function AdminLogin({ onSuccess }) {
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const buttonRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      setError("VITE_GOOGLE_CLIENT_ID is not configured.");
      return;
    }
    let cancelled = false;

    async function handleCredential(response) {
      setError("");
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ credential: response.credential }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Login failed");
        }
        onSuccess?.();
      } catch (err) {
        setError(err.message);
      }
    }

    loadGoogleScript()
      .then(() => {
        if (cancelled) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredential,
          ux_mode: "popup",
          auto_select: false,
        });
        if (buttonRef.current) {
          window.google.accounts.id.renderButton(buttonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 280,
          });
        }
        setReady(true);
      })
      .catch((err) => setError(err.message));

    return () => {
      cancelled = true;
    };
  }, [clientId, onSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8] px-6">
      <div className="w-full max-w-sm rounded-lg border border-[#E4E7EC] bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-[#1F2328]">Admin Sign In</h1>
        <p className="mb-6 text-sm text-[#4B5563]">
          Sign in with the authorized Google account to manage projects.
        </p>
        <div ref={buttonRef} className="flex justify-center" />
        {!ready && !error && (
          <p className="mt-4 text-center text-xs text-[#4B5563]">Loading Google Sign-In…</p>
        )}
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

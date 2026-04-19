import { useState } from "react";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-[#E4E7EC] bg-white p-8 shadow-sm"
      >
        <h1 className="mb-1 text-xl font-semibold text-[#1F2328]">Admin Sign In</h1>
        <p className="mb-6 text-sm text-[#4B5563]">Enter the admin password to manage projects.</p>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#4B5563]">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded border border-[#E4E7EC] bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[#049B9F]"
        />
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded bg-[#049B9F] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#06B5B9] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

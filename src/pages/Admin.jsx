import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
  const [status, setStatus] = useState("loading");

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store", credentials: "include" });
      setStatus(res.ok ? "authed" : "anon");
    } catch {
      setStatus("anon");
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8] text-sm text-[#4B5563]">
        Loading…
      </div>
    );
  }

  if (status === "anon") {
    return <AdminLogin onSuccess={() => setStatus("authed")} />;
  }

  return <AdminDashboard onLogout={() => setStatus("anon")} />;
}

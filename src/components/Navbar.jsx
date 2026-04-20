import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = ["Portfolio", "About", "Contact"];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleNavClick(e, link) {
    setOpen(false);
    if (isHome) {
      e.preventDefault();
      document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav className="relative z-40 w-full">
      {/* Top stripe bar */}
      <div className="flex h-2">
        <span className="flex-1 bg-[#049B9F]" />
        <span className="flex-1 bg-[#037B7E]" />
        <span className="flex-1 bg-[#C05A30]" />
        <span className="flex-1 bg-[#D4A843]" />
        <span className="flex-1 bg-[#7A8B4A]" />
        <span className="flex-1 bg-[#049B9F]" />
      </div>

      <div className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <Link to="/" className="flex items-center" aria-label="DW Tailored Systems — Home">
          <img
            src="/logo-transparent-5.png"
            alt="DW Tailored Systems"
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              to={isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, link)}
              className="text-base font-semibold text-[#2C2C2C] transition-colors duration-200 hover:text-[#049B9F] md:text-lg"
            >
              {link}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-[#2C2C2C] transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#2C2C2C] transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#2C2C2C] transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-[#1F2328]/60 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[min(18rem,80vw)] bg-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Navigation"
        >
          <div className="flex h-16 items-center px-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4B5563]">
              Menu
            </span>
          </div>
          <div className="flex flex-col px-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                to={isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, link)}
                className="block rounded px-4 py-3 text-lg font-semibold text-[#1F2328] transition-colors hover:bg-[#F5F6F8] hover:text-[#049B9F]"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

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
            src="/logo.png"
            alt="DW Tailored Systems"
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {["Portfolio", "About", "Contact"].map((link) => (
            <Link
              key={link}
              to={isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-base font-semibold text-[#2C2C2C] transition-colors duration-200 hover:text-[#049B9F] md:text-lg"
            >
              {link}
            </Link>
          ))}
        </div>

        <button className="flex flex-col gap-1.5 md:hidden" aria-label="Menu">
          <span className="h-0.5 w-5 bg-[#2C2C2C]" />
          <span className="h-0.5 w-3.5 bg-[#2C2C2C]" />
          <span className="h-0.5 w-5 bg-[#2C2C2C]" />
        </button>
      </div>
    </nav>
  );
}

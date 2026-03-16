export default function Navbar() {
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
        <a href="#" className="flex items-center gap-3">
          <img src="/logo-dw.png" alt="DW" className="h-12 w-auto object-contain" />
          <span className="font-[Bungee] text-xl tracking-wide text-[#2C2C2C] md:text-2xl">
            Tailored Systems
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {["Portfolio", "Services", "About", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-base font-semibold text-[#2C2C2C] transition-colors duration-200 hover:text-[#049B9F] md:text-lg"
            >
              {link}
            </a>
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

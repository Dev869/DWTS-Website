export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#2C2C2C] px-6 py-8 md:px-12 lg:px-20">
      {/* Top stripe */}
      <div className="-mx-6 -mt-8 mb-6 flex h-1.5 md:-mx-12 lg:-mx-20">
        <span className="flex-1 bg-[#049B9F]" />
        <span className="flex-1 bg-[#037B7E]" />
        <span className="flex-1 bg-[#C05A30]" />
        <span className="flex-1 bg-[#D4A843]" />
        <span className="flex-1 bg-[#7A8B4A]" />
        <span className="flex-1 bg-[#049B9F]" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo-dw.png" alt="DW" loading="lazy" width="28" height="28" className="h-7 w-auto object-contain" />
          <span className="text-sm text-white/50">
            Thanks for stopping by!
          </span>
        </div>

        <div className="flex items-center gap-1 text-[12px] text-white/15">
          <span>◈</span><span>◈</span><span>◈</span>
        </div>

        <div className="flex items-center gap-6">
          {["LinkedIn", "GitHub"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-white/40 transition-colors duration-200 hover:text-[#049B9F]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-white/25">
        &copy;{new Date().getFullYear()} DW Tailored Systems &middot; All rights reserved &middot; Built with ♠
      </p>
    </footer>
  );
}

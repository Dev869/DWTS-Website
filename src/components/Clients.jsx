import { ConfettiBurst, ZigzagDraw } from "./ScrollGraphics";

const clients = [
  "Meridian Logistics",
  "Sable Legal",
  "Clearview Corp",
  "Hollow Creek WM",
  "Vesper Retail",
  "Onyx Group",
];

export default function Clients() {
  return (
    <section className="relative w-full px-6 py-16 md:px-12 lg:px-20">
      <ConfettiBurst className="absolute top-8 right-[8%] hidden lg:block" />
      <ZigzagDraw className="absolute bottom-10 left-[5%] hidden lg:block" />
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#049B9F]/15" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2C2C2C]">
            Trusted By
          </span>
          <span className="h-px flex-1 bg-[#049B9F]/15" />
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {clients.map((name, i) => {
            const colors = ["#049B9F", "#C05A30", "#D4A843", "#7A8B4A", "#037B7E", "#049B9F"];
            const color = colors[i % colors.length];
            return (
              <div
                key={name}
                className="animate-fade-up flex flex-col items-center justify-center border border-[#2C2C2C]/8 bg-[#F5F0E3] px-4 py-6 transition-all duration-200 hover:border-[#049B9F]/30 hover:shadow-md"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                {/* Placeholder mark */}
                <span
                  className="mb-3 font-[Bungee] text-2xl"
                  style={{ color }}
                >
                  {name.split(" ").map(w => w[0]).join("")}
                </span>
                <span className="text-center text-xs font-medium text-[#2C2C2C]">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

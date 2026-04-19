import CountUp from "../ui/CountUp";

export default function ResultsMetrics({ results = [] }) {
  if (results.length === 0) return null;

  return (
    <div className="bg-[#2C2C2C] py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
        {results.map((result, i) => (
          <div key={result.label} className="group text-center">
            <div className="font-[Bungee] text-5xl text-[#06B5B9] transition-transform duration-300 group-hover:scale-110 md:text-6xl">
              <CountUp value={result.metric} duration={1200 + i * 200} />
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-[#F5F6F8]/80">
              {result.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

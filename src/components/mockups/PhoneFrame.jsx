export default function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[36px] border-[10px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl ${className}`}
    >
      <span className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[28px] bg-white">
        {children}
      </div>
    </div>
  );
}

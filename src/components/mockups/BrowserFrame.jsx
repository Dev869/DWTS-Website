export default function BrowserFrame({ url, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-[#2C2C2C]/15 bg-[#1a1a1a] shadow-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-[#2C2C2C] bg-[#1a1a1a] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        {url && (
          <div className="ml-2 flex-1 truncate rounded bg-[#2C2C2C] px-3 py-1 font-mono text-[10px] text-[#F5F6F8]/60">
            {url}
          </div>
        )}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

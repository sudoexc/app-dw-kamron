import { useEffect, useRef } from "react";

type Props = {
  /** Raw JS snippet from PropellerAds (or similar). If empty, renders placeholder card. */
  snippet?: string;
};

const Placeholder = () => (
  <div
    className="w-full h-28 glass-card border-2 border-dashed border-white/15 rounded-3xl grid place-items-center animate-fade-in hover-lift overflow-hidden relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50">
      <span className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider">Sponsored</span>
    </div>
    <div className="text-center">
      <p className="text-sm text-muted-foreground/60 font-semibold">Advertisement Space</p>
      <p className="text-xs text-muted-foreground/40 mt-1 font-medium">Support the app</p>
    </div>
  </div>
);

export default function AdSlot({ snippet }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!snippet || !ref.current) return;
    // Avoid double-injection
    if (ref.current.dataset.loaded === "1") return;

    ref.current.innerHTML = ""; // clear placeholder
    const wrapper = document.createElement("div");
    wrapper.className = "w-full h-full";
    ref.current.appendChild(wrapper);

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.text = snippet;

    // Some providers give src-based scripts; try to detect
    if (/src=/.test(snippet) && !/document\.write/.test(snippet)) {
      // If it's a plain <script src="..."> embed, rebuild it
      const match = snippet.match(/src=["']([^"']+)["']/);
      if (match) {
        const s = document.createElement("script");
        s.async = true;
        s.src = match[1];
        ref.current.appendChild(s);
        ref.current.dataset.loaded = "1";
        return;
      }
    }

    ref.current.appendChild(script);
    ref.current.dataset.loaded = "1";
  }, [snippet]);

  if (!snippet) return <Placeholder />;
  return <div ref={ref} className="w-full h-28 rounded-3xl overflow-hidden" />;
}

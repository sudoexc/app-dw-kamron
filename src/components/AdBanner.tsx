const AdBanner = () => {
  return (
    <div
      id="ad"
      className="w-full h-28 glass-card border-2 border-dashed border-border/30 rounded-3xl flex flex-col items-center justify-center animate-fade-in hover-lift overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50">
        <span className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider">Sponsored</span>
      </div>
      <p className="text-sm text-muted-foreground/60 font-semibold relative z-10">Advertisement Space</p>
      <p className="text-xs text-muted-foreground/40 mt-1 font-medium">Support the app</p>
    </div>
  );
};

export default AdBanner;

import { Loader2, Sparkles } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full blur-3xl opacity-50 animate-pulse-glow" />
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-primary-glow rounded-full -translate-x-1/2" />
        </div>
        <div className="relative glass-card p-8 rounded-3xl border-2 border-primary/20">
          <Loader2 className="w-16 h-16 text-primary animate-spin-slow drop-shadow-2xl" strokeWidth={2.5} />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        <p className="text-base text-foreground font-bold animate-pulse">Processing your video...</p>
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
      </div>
      <p className="mt-3 text-sm text-muted-foreground font-medium">This will only take a moment</p>
    </div>
  );
};

export default Loader;

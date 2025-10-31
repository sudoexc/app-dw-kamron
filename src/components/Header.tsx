import { Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="pt-[65px] sticky top-0 z-50 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-primary glass-header" 
           style={{ background: 'var(--gradient-header)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-black/20" />
      
      <div className="relative flex items-center justify-between px-6 py-5 text-primary-foreground">
        <div className="flex items-center gap-3 flex-1 justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 dark:bg-white/20 rounded-2xl blur-lg animate-pulse-glow" />
            <div className="relative bg-white/25 dark:bg-white/15 p-3 rounded-2xl backdrop-blur-xl border border-white/20">
              <Download className="w-6 h-6 drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight drop-shadow-md">Kamron Media</h1>
        </div>
        <div className="absolute right-6">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

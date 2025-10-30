import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      className="relative p-3 rounded-2xl glass-card hover-lift transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={`relative w-6 h-6 ${isAnimating ? 'animate-theme-icon' : ''}`}>
        <Sun 
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            theme === "dark" 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          } text-amber-500 drop-shadow-lg`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            theme === "dark" 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          } text-violet-400 drop-shadow-lg`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;

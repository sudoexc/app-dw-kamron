import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { isSupportedUrl } from "@/utils/validators";
import { haptic } from "@/lib/telegram";

interface DownloadFormProps {
  onDownload: (url: string) => void;
  isLoading: boolean;
}

const DownloadForm = ({ onDownload, isLoading }: DownloadFormProps) => {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 600);
      if (!isSupportedUrl(url)) { haptic.error(); return; } haptic.impact('light'); onDownload(url.trim());
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-slide-up">
      <div className="relative group">
        <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
          isFocused ? 'bg-primary/5 dark:bg-primary/10 blur-xl' : ''
        }`} />
        <Input
          type="url"
          placeholder="Paste TikTok or Instagram link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
          className={`relative glass-card pr-4 h-16 text-base border-2 transition-all duration-300 rounded-2xl placeholder:text-muted-foreground/60 font-medium ${
            isFocused 
              ? 'border-primary shadow-lg animate-input-focus scale-[1.01]' 
              : 'border-border/50 hover:border-primary/50 shadow-sm'
          }`}
        />
      </div>
      <Button
        type="submit"
        disabled={!url.trim() || isLoading}
        className="relative w-full h-16 text-base font-bold rounded-2xl gradient-shift hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group border border-white/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <Download className={`w-5 h-5 mr-2 transition-transform duration-200 ${isPressed ? 'icon-bounce' : ''}`} />
        <span className="relative">Download Video</span>
      </Button>
    </form>
  );
};

export default DownloadForm;

import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, Share2, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { shareLink } from "@/utils/share";

interface DownloadItem {
  id: string;
  url: string;
  timestamp: number;
}

const DownloadHistory = () => {
  const [history, setHistory] = useState<DownloadItem[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const stored = localStorage.getItem("downloadHistory");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    };

    loadHistory();

    const handleStorage = () => loadHistory();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4 animate-slide-up">
      <h2 className="text-lg font-bold text-foreground px-1">Download History</h2>
      <div className="space-y-3">
        {history.slice(0, 5).map((item, index) => (
          <Card
            key={item.id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="glass-card p-4 hover-lift transition-all duration-300 border border-border/50 rounded-2xl shadow-md hover:shadow-xl hover:border-primary/30 animate-fade-in group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="bg-gradient-to-br from-primary/20 to-primary-glow/20 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-1.5">
                  Video downloaded (demo)
                </p>
                <p className="text-xs text-muted-foreground truncate mb-2 font-medium">
                  {item.url}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={async () => {
                    const r = await shareLink(item.url);
                    if (r === "copied") console.log("Copied!");
                  }}
                  className="opacity-70 hover:opacity-100 transition"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(item.url);
                    console.log("Copied!");
                  }}
                  className="opacity-70 hover:opacity-100 transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors duration-200" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DownloadHistory;

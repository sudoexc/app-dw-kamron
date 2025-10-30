import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DownloadForm from "@/components/DownloadForm";
import Loader from "@/components/Loader";
import DownloadHistory from "@/components/DownloadHistory";
import AdBanner from "@/components/AdBanner";
import AdSlot from "@/components/AdSlot";
import { mockDownload } from "@/utils/mockDownload";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToHistory } = useDownloadHistory();

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
    }
  }, []);

  const handleDownload = async (url: string) => {
    setIsLoading(true);
    
    try {
      await mockDownload(url);
      addToHistory(url);
      toast.success("Video downloaded successfully! (demo)", {
        description: "Check your download history below",
      });
    } catch (error) {
      toast.error("Download failed", {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col transition-all duration-500">
      <Header />
      
      <main className="flex-1 w-full max-w-[480px] mx-auto px-5 py-7 space-y-7 overflow-y-auto">
        <div className="animate-fade-in">
          <DownloadForm onDownload={handleDownload} isLoading={isLoading} />
        </div>
        
        {isLoading ? (
          <div className="animate-fade-in">
            <Loader />
          </div>
        ) : (
          <>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <AdSlot />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <DownloadHistory />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
      };
    };
  }
}

export default Index;

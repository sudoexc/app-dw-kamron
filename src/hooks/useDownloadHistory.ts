import { useState, useCallback } from "react";

interface DownloadItem {
  id: string;
  url: string;
  timestamp: number;
}

export const useDownloadHistory = () => {
  const [, setRefresh] = useState(0);

  const addToHistory = useCallback((url: string) => {
    const newItem: DownloadItem = {
      id: Date.now().toString(),
      url,
      timestamp: Date.now(),
    };

    const stored = localStorage.getItem("downloadHistory");
    const history: DownloadItem[] = stored ? JSON.parse(stored) : [];
    
    const updatedHistory = [newItem, ...history].slice(0, 10); // Keep last 10
    localStorage.setItem("downloadHistory", JSON.stringify(updatedHistory));
    
    // Trigger re-render
    setRefresh(prev => prev + 1);
    
    // Dispatch storage event for other components
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { addToHistory };
};

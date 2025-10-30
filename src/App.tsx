import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddToHomeGuide from "./pages/AddToHomeGuide";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand(); // ✅ делает приложение фуллскрин в Telegram
      console.log("Telegram WebApp expanded");

      const startParam = tg?.initDataUnsafe?.start_param;
      console.log("Start param:", startParam);

      // 🔥 Если запущен с deep-link параметром — открыть инструкцию
      if (startParam === "addToHomeScreen") {
        window.location.href = "/install";
      }

      // ✅ Показываем кнопку снизу
      tg.MainButton.setText("📲 Добавить на экран");
      tg.MainButton.show();

      // При клике — перезапуск того же Mini App, но с deep-link параметром
      tg.MainButton.onClick(() => {
        const botUsername = "videodl_test_bot"; // 🔹 замени на свой username
        const deepLink = `https://t.me/${botUsername}?startapp=addToHomeScreen`;
        tg.openTelegramLink(deepLink); // 👈 ключевой момент — открывает в Telegram, не Safari
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/install" element={<AddToHomeGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

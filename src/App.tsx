import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddToHomeGuide from "./pages/AddToHomeGuide"; // 👈 импорт гайда

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();

      // Проверяем параметр, переданный при старте через deep-link
      const startParam = tg?.initDataUnsafe?.start_param;
      console.log("Telegram start_param:", startParam);

      // 🔥 Если бот запущен с ?startapp=addToHomeScreen — откроем инструкцию
      if (startParam === "addToHomeScreen") {
        window.location.href = "/install";
      }

      // 🔻 Убираем нижнюю кнопку — Telegram уже сам предлагает “Добавить на экран”
      tg.MainButton.hide();
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
              {/* Главная страница */}
              <Route path="/" element={<Index />} />

              {/* Гайд "Добавить на экран" */}
              <Route path="/install" element={<AddToHomeGuide />} />

              {/* Страница 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

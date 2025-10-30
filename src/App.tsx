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
      tg.ready(); // ✅ сообщаем Telegram, что всё готово
      tg.expand(); // 🧩 делает fullscreen (без обрезки контента)
      tg.MainButton.hide(); // 🔻 скрываем нижнюю кнопку — не нужна

      // 🧠 Проверяем параметр, переданный при запуске через deep-link
      const startParam = tg?.initDataUnsafe?.start_param;
      console.log("Telegram start_param:", startParam);

      // 🚀 Если бот запущен с параметром `addToHomeScreen`, открываем инструкцию
      if (startParam === "addToHomeScreen") {
        window.location.href = "/install";
      }
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

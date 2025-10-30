import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// --- Telegram Mini App integration ---
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();

  // Настраиваем кнопку внизу
  tg.MainButton.setText("📲 Добавить на экран");
  tg.MainButton.show();

  // При клике открываем сайт в браузере
  tg.MainButton.onClick(() => {
    tg.openLink("https://app-dw-kamron.vercel.app/");
  });
}

// --- Render React app ---
createRoot(document.getElementById("root")!).render(<App />);

// --- Register Service Worker for PWA ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {});
  });
}

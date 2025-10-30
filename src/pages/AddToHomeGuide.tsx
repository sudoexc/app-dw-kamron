import { useEffect, useState } from "react";

const AddToHomeGuide = () => {
  const [isTgReady, setIsTgReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      setIsTgReady(true);
    }
  }, []);

  if (!isTgReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-lg">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-[#0b0b0b] via-[#111111] to-black text-white">
      <img
        src="/icon-192.png"
        alt="App Icon"
        className="w-24 h-24 mb-4 rounded-3xl shadow-lg border border-white/10 animate-fade-in"
      />

      <h1 className="text-xl font-bold mb-2 animate-slide-up">
        Добавьте <span className="text-blue-400">Video Downloader</span> на экран «Домой»
      </h1>

      <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed animate-fade-in delay-100">
        1. Нажмите <span className="text-blue-400">поделиться ⤴️</span> в нижней панели <br />
        2. Выберите <span className="text-blue-400">«На экран домой»</span>
      </p>

      <button
        onClick={() => {
          const tg = window.Telegram?.WebApp;
          tg?.openLink("https://app-dw-kamron.vercel.app/");
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg animate-slide-up delay-200"
      >
        Открыть в Safari
      </button>
    </div>
  );
};

export default AddToHomeGuide;

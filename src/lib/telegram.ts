export type TgWebApp = {
  ready: () => void;
  expand: () => void;
  HapticFeedback?: {
    impactOccurred: (style: "light"|"medium"|"heavy"|"rigid"|"soft") => void;
    notificationOccurred: (type: "error"|"success"|"warning") => void;
    selectionChanged: () => void;
  };
  themeParams?: Record<string, string>;
  colorScheme?: "light" | "dark";
};

declare global {
  interface Window {
    Telegram?: { WebApp: TgWebApp };
  }
}

const getWebApp = (): TgWebApp | null => {
  try {
    return window?.Telegram?.WebApp ?? null;
  } catch {
    return null;
  }
};

export const initTelegram = () => {
  const wa = getWebApp();
  if (!wa) return;
  try {
    wa.ready();
    wa.expand?.();
  } catch {}
};

export const haptic = {
  impact: (style: "light"|"medium"|"heavy"|"rigid"|"soft" = "light") => {
    const wa = getWebApp();
    wa?.HapticFeedback?.impactOccurred(style);
  },
  success: () => getWebApp()?.HapticFeedback?.notificationOccurred("success"),
  error:   () => getWebApp()?.HapticFeedback?.notificationOccurred("error"),
  select:  () => getWebApp()?.HapticFeedback?.selectionChanged(),
};

export const getTelegramTheme = () => {
  const wa = getWebApp();
  return {
    colorScheme: wa?.colorScheme ?? undefined,
    params: wa?.themeParams ?? {}
  };
};

# Dev Notes / Next Steps

- Replace `mockDownload` with real API by setting `VITE_API_URL` in environment.
- Provide PropellerAds snippet to `AdSlot` component or swap in place of `AdBanner` in `pages/Index.tsx`.
- Telegram SDK initialized via `initTelegram()`; use `haptic` from `lib/telegram` for taps.
- Theme variables live in CSS; theme toggle via existing component + added transitions.
- PWA files already present; SW is registered in `main.tsx`.

export function isSupportedUrl(url: string) {
  try {
    const u = new URL(url.trim());
    return /tiktok\.com|instagram\.com|^https?:\/\/(vm|vt|t)\.tiktok\.com/.test(u.hostname + u.pathname);
  } catch {
    return false;
  }
}

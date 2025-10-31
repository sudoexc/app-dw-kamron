import { mockDownload } from "@/utils/mockDownload";

export type DownloadResponse = {
  title?: string;
  downloadUrl: string;
  thumb?: string;
};

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

export async function downloadVideo(url: string): Promise<DownloadResponse> {
  if (!API_URL) {
    // fallback to mock until real API provided
    return mockDownload(url);
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error("Failed to download");
  return res.json();
}

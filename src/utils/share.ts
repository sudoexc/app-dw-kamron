export async function shareLink(url: string, title = "Video Downloader") {
  try {
    if (navigator.share) {
      await navigator.share({ title, text: "Here is your download link", url });
      return true;
    } else {
      await navigator.clipboard.writeText(url);
      return "copied";
    }
  } catch (e) {
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      return false;
    }
  }
}

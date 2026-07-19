// Requests an appropriately-sized image instead of the full hotlinked source,
// so cards/avatars/thumbnails don't download the same 1600px asset as the hero.
export function optimizeImage(url, width) {
  if (!url) return url;
  try {
    if (!url.includes("images.unsplash.com")) return url;
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    if (!u.searchParams.has("q")) u.searchParams.set("q", "75");
    return u.toString();
  } catch {
    return url;
  }
}

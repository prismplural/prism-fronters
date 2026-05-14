export function getAvatarDisplayUrl(src: string | null | undefined): string {
  if (!src) return ""
  let url: URL
  try { url = new URL(src) } catch { return "" }  // unparseable → empty
  if (url.protocol !== "https:") return ""        // non-https → empty
  return `/avatar?url=${encodeURIComponent(url.toString())}`
}

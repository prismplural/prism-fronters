export function getAvatarDisplayUrl(src: string | null | undefined): string {
  if (!src) return ""
  let url: URL
  try { url = new URL(src) } catch { return src }
  if (url.protocol !== "https:") return src
  return `/avatar?url=${encodeURIComponent(url.toString())}`
}

const proxiedAvatarHosts = new Set(["cdn.bsky.app", "cdn.picrew.me"])

export function getAvatarDisplayUrl(src: string | null | undefined) {
  if (!src) return ""

  try {
    const url = new URL(src)
    if (url.protocol !== "https:") return src
    if (!proxiedAvatarHosts.has(url.hostname)) return src
    return `/avatar?url=${encodeURIComponent(url.toString())}`
  } catch {
    return ""
  }
}

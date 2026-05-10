import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

const allowedHosts = new Set(["cdn.bsky.app", "cdn.picrew.me"])
const maxAvatarBytes = 6 * 1024 * 1024

const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" rx="48" fill="#4d4842"/>
  <circle cx="38" cy="36" r="13" fill="#b498c2" opacity=".7"/>
  <path d="M24 75c4-16 14-24 30-24s26 8 30 24" fill="#b498c2" opacity=".45"/>
</svg>`

function fallbackResponse() {
  return new Response(fallbackSvg, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  })
}

export const GET: RequestHandler = async ({ fetch, url }) => {
  const rawUrl = url.searchParams.get("url")
  if (!rawUrl) error(400, "Missing avatar URL.")

  let avatarUrl: URL
  try {
    avatarUrl = new URL(rawUrl)
  } catch {
    error(400, "Invalid avatar URL.")
  }

  if (avatarUrl.protocol !== "https:" || !allowedHosts.has(avatarUrl.hostname)) {
    error(400, "Unsupported avatar host.")
  }

  try {
    const response = await fetch(avatarUrl, {
      headers: {
        accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8",
      },
    })

    const contentType = response.headers.get("content-type") ?? ""
    const contentLength = Number(response.headers.get("content-length") ?? "0")

    if (
      !response.ok ||
      !contentType.startsWith("image/") ||
      (contentLength && contentLength > maxAvatarBytes)
    ) {
      return fallbackResponse()
    }

    const body = await response.arrayBuffer()
    if (body.byteLength > maxAvatarBytes) return fallbackResponse()

    return new Response(body, {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": contentType,
      },
    })
  } catch {
    return fallbackResponse()
  }
}

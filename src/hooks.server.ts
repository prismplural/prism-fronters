import { dev } from "$app/environment"
import type { Handle } from "@sveltejs/kit"

const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self' https://api.pluralkit.me",
    "font-src 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' https: data:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
}

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  if (!dev) {
    for (const [header, value] of Object.entries(securityHeaders)) {
      response.headers.set(header, value)
    }
  }

  return response
}

import { lookup } from "node:dns/promises"

export function isPrivateAddress(addr: string): boolean {
  if (!addr) return true

  // Normalize IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1) to its IPv4
  const mapped = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i.exec(addr)
  if (mapped) return isPrivateAddress(mapped[1])

  // IPv6
  if (addr.includes(":")) {
    const lower = addr.toLowerCase()
    if (lower === "::1" || lower === "::") return true
    // Link-local fe80::/10 (covers fe80, fe9, fea, feb prefixes)
    if (/^fe[89ab][0-9a-f]?:/.test(lower) || lower.startsWith("fe80:")) return true
    // Unique-local fc00::/7
    if (/^f[cd][0-9a-f]{2}:/.test(lower)) return true
    return false
  }

  // IPv4
  const parts = addr.split(".").map(Number)
  if (parts.length !== 4 || parts.some(p => !Number.isInteger(p) || p < 0 || p > 255)) {
    return true  // unparseable → treat as private (fail-safe)
  }
  const [a, b] = parts
  if (a === 0) return true                          // "this network"
  if (a === 127) return true                        // loopback
  if (a === 10) return true                         // RFC 1918
  if (a === 192 && b === 168) return true           // RFC 1918
  if (a === 172 && b >= 16 && b <= 31) return true  // RFC 1918
  if (a === 169 && b === 254) return true           // link-local (AWS metadata!)
  return false
}

export async function assertPublicHost(hostname: string): Promise<void> {
  // Use { all: true } to inspect every resolved address. A host
  // returning a mix of public + private addresses (DNS rebinding
  // primitive) gets rejected.
  const records = await lookup(hostname, { all: true })
  if (records.length === 0) {
    throw new Error(`No DNS records resolved for ${hostname}`)
  }
  for (const { address } of records) {
    if (isPrivateAddress(address)) {
      throw new Error(`Refusing to fetch private/internal address: ${address}`)
    }
  }
}

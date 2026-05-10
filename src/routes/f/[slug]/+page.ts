import { error } from "@sveltejs/kit"
import type { Member, Switch } from "$lib/types"

const apiHeaders = {
  origin: "https://prismplural.com",
}

async function getPublicMember(fetch, memberId: string) {
  return fetch(`https://api.pluralkit.me/v2/members/${memberId}`, {
    headers: apiHeaders,
  }).then((resp) => (resp.ok ? resp.json() : undefined))
}

export async function load({ fetch, params }) {
  const sid = params.slug.toLowerCase()

  let system: any
  system = await fetch(`https://api.pluralkit.me/v2/systems/${sid}`, {
    headers: apiHeaders,
  }).then((resp) => {
    if (resp.status === 404) error(404, `System with id ${sid} not found.`)
    if (resp.status === 500) error(500, "Internal server error. This is on PluralKit's end.")
    if (resp.status === 429)
      error(500, "PluralKit is rate limiting requests. Please try again shortly.")
    if (resp.ok) return resp.json()
    error(500, "Prism Fronters couldn't read this PluralKit response. Please try again later.")
  })

  let front: any
  front = await fetch(`https://api.pluralkit.me/v2/systems/${sid}/fronters`, {
    headers: apiHeaders,
  }).then((resp) => {
    if (resp.status === 404) error(404, `System with id ${sid} not found.`)
    if (resp.status === 403) error(403, `This front is private.`)
    if (resp.status === 500) error(500, "Internal server error. This is on PluralKit's end.")
    if (resp.status === 429)
      error(500, "PluralKit is rate limiting requests. Please try again shortly.")
    if (resp.status === 204) return { members: [] }
    if (resp.ok) return resp.json()
    error(500, "Prism Fronters couldn't read this PluralKit response. Please try again later.")
  })

  let historyUnavailable = false
  let switches: Switch[] = await fetch(
    `https://api.pluralkit.me/v2/systems/${sid}/switches?limit=10`,
    {
      headers: apiHeaders,
    }
  ).then((resp) => {
    if (resp.status === 403) {
      historyUnavailable = true
      return []
    }
    if (resp.status === 404 || resp.status === 204) return []
    if (resp.status === 429 || resp.status >= 500) {
      historyUnavailable = true
      return []
    }
    if (resp.ok) return resp.json()
    historyUnavailable = true
    return []
  })

  const memberMap: Record<string, Member> = {}
  ;(front.members ?? []).forEach((member: Member) => {
    memberMap[member.id] = member
  })

  const missingMemberIds = Array.from(
    new Set(switches.flatMap((switchEntry) => switchEntry.members).filter((id) => !memberMap[id]))
  ).slice(0, 24)

  await Promise.all(
    missingMemberIds.map(async (memberId) => {
      const member = await getPublicMember(fetch, memberId)
      if (member) memberMap[memberId] = member
    })
  )

  return {
    system: system,
    front: front,
    switches: switches,
    memberMap: memberMap,
    historyUnavailable: historyUnavailable,
  }
}

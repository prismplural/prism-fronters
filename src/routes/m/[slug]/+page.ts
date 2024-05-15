import { selectCard, selectLayout } from "$lib/functions/utils.js"
import { error } from "@sveltejs/kit"

export async function load({ params, fetch, url }) {
  const mid = params.slug.toLowerCase()

  const layout = selectLayout(url.searchParams)
  const card = selectCard(url.searchParams)

  let member: any
  member = await fetch(`https://api.pluralkit.me/v2/members/${mid}`, {
    headers: {
      origin: "https://pluralkit.xyz",
    },
  }).then((resp) => {
    if (resp.status === 404) error(404, `Member with id ${mid} not found.`)
    if (resp.status === 500) error(500, "Internal server error. This is on PluralKit's end.")
    if (resp.status === 429) error(500, "PluralKit is rate limiting us! Please try again.")
    if (resp.ok) return resp.json()
    error(500, "Internal server error. This this site's fault. Please report it to the developers!")
  })

  let system: any
  system = await fetch(`https://api.pluralkit.me/v2/systems/${member.system}`, {
    headers: {
      origin: "https://pluralkit.xyz",
    },
  }).then((resp) => {
    if (resp.status === 404) error(404, `System with id ${params.slug} not found.`)
    if (resp.status === 500) error(500, "Internal server error. This is on PluralKit's end.")
    if (resp.status === 429) error(500, "PluralKit is rate limiting us! Please try again.")
    if (resp.ok) return resp.json()
    error(500, "Internal server error. This this site's fault. Please report it to the developers!")
  })

  return {
    member: member,
    system: system,
    layout: layout,
    card: card,
  }
}

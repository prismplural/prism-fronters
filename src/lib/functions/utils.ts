export function getParams(data: FormData) {
  let layout = data.get("layout-card")
  let showSystem = data.get("system")
  let cards = data.get("layout-list")
  let proxyList = data.get("proxy-avatar-list")
  let proxyCard = data.get("proxy-avatar-card")
  let pronouns = data.get("pronouns")
  let displayName = data.get("displayname")
  let noCategories = data.get("no-categories")

  let params: string[] = []
  if (layout) params.push(`l=${layout}`)
  if (showSystem) params.push(`s=y`)
  if (cards) params.push("c=f")
  if (proxyList) params.push("pl=y")
  if (proxyCard) params.push("pc=y")
  if (pronouns) params.push("prns=n")
  if (displayName) params.push("dn=y")
  if (noCategories) params.push("nc=y")

  return params
}

const layouts = {
  default: ["default", "d", ""],
  pluralkit: ["pluralkit", "pk"],
}

const cards = {
  default: ["default", "small", "s", "d", ""],
  full: ["full", "pluralkit", "pk", "f"],
}

export function selectLayout(params: URLSearchParams) {
  let layout = "default"
  const l = params.get("layout") || params.get("l")
  if (l) {
    Object.entries(layouts).forEach(([key, value]) => {
      if (value.includes(l)) layout = key
    })
  }

  return layout
}

export function selectCard(params: URLSearchParams) {
  let card = "default"
  const l = params.get("card") || params.get("cards") || params.get("c")
  if (l) {
    Object.entries(cards).forEach(([key, value]) => {
      if (value.includes(l)) card = key
    })
  }

  return card
}

export function shortenLayout(layout: string) {
  let short = ""
  Object.entries(layouts).forEach(([key, value]) => {
    if (layout === key) short = value[value.length - 1]
  })
  if (short) short = `l=${short}`
  return short
}

export function shortenCard(card: string) {
  let short = ""
  Object.entries(cards).forEach(([key, value]) => {
    if (card === key) short = value[value.length - 1]
  })
  if (short) short = `c=${short}`
  return short
}

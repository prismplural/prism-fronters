import { defaultCard, Theme } from "$lib/cardtypes"
import type DiscordCardSettings from "$lib/cardtypes"
import type { Member, System, Group } from "$lib/types"

const hexColorRegex = /^#?(?:[0-9a-fA-F]{3}){1,2}$/
const defaultColor = "#dddddd"

export async function createCard(
  params: URLSearchParams,
  data: Member | System | Group,
  groups?: Group[]
) {
  let card: DiscordCardSettings = JSON.parse(JSON.stringify(defaultCard))

  if (params.get("t") && params.get("t") === "light") card.theme = Theme.light

  card.colors = getNitroColors(data, params)

  card.info.status = ""
  card.info.emoji = ""

  card.info.nickname = (data as Member).display_name ?? ""
  card.info.username = data.name ?? data.id

  if ((data as Member).webhook_avatar_url || (data as Member).avatar_url || (data as Group).icon) {
    card.avatar =
      (data as Member).webhook_avatar_url ??
      (data as Member).avatar_url ??
      (data as Group).icon ??
      ""
  }

  if (data.banner && !(params.get("b") && params.get("b") === "hide")) {
    card.banner = data.banner
  }

  if (data.description && !(params.get("c") && params.get("c") === "hide")) {
    let description = data.description
    if (params.get("c") && !Number.isNaN(parseInt(params.get("c") ?? ""))) {
      let splitDesc = description.split("\n", parseInt(params.get("c") ?? ""))
      description = splitDesc.join("\n")
    }

    let status = ""
    if (params.get("s") && !Number.isNaN(parseInt(params.get("s") ?? ""))) {
      let index = parseInt(params.get("s") ?? "")
      let statusLine = description.split("\n", index ?? "")
      status = statusLine[statusLine.length - 1]
    }

    card.info.status = status
    card.info.about = description
  }

  card.info.discriminator = getDiscriminator(data.id)

  if (groups && groups.length > 0) {
    card.roles = createRoles(params, groups)
  }

  if ((data as Member).pronouns && params.get("n")) {
    card.info.notes = (data as Member).pronouns ?? ""
  }

  if (params.get("j")) {
    const { getBirthday, getCreated } = await import("$lib/functions/strings/member")
    if ((data as Member).birthday) {
      card.joindate.server.date = getBirthday(data as Member)
      card.joindate.server.emoji = "🎂"
    }

    if ((data as Member).created) {
      card.joindate.global.date = getCreated(data as Member)
      card.joindate.global.emoji = "📒"
    }
  }

  return card
}

function getNitroColors(data: Member | System | Group, params: URLSearchParams) {
  const nitroEnabled = params.get("d") && params.get("d") === "nitro"

  // primary color (item color by default)
  let primaryColor = data.color ?? defaultColor

  if (params.get("pc") && hexColorRegex.test(params.get("pc") ?? "")) {
    primaryColor = params.get("pc") ?? defaultColor
  }

  let secondaryColor = data.color ?? defaultColor

  if (params.get("sc") && hexColorRegex.test(params.get("sc") ?? "")) {
    secondaryColor = params.get("sc") ?? defaultColor
  }

  let bannerColor = data.color ?? defaultColor

  if (params.get("bc") && hexColorRegex.test(params.get("bc") ?? "")) {
    bannerColor = params.get("bc") ?? defaultColor
  }

  if (!primaryColor.startsWith("#")) primaryColor = "#" + primaryColor
  if (!secondaryColor.startsWith("#")) secondaryColor = "#" + secondaryColor
  if (!bannerColor.startsWith("#")) bannerColor = "#" + bannerColor

  return {
    banner: bannerColor,
    primary: nitroEnabled ? primaryColor : "",
    secondary: nitroEnabled ? secondaryColor : "",
  }
}

function getDiscriminator(id: string) {
  let encode = new TextEncoder()

  const array = encode.encode(id)
  const joined = array.join("")
  return joined.slice(joined.length - 4, joined.length)
}

function createRoles(params: URLSearchParams, groups: Group[]) {
  if (params.get("g")) {
    const option = params.get("g")
    let roles = groups.map((g) => {
      let groupName = g.display_name ?? g.name
      let fullWidth = false
      if (/\r|\n/.exec(groupName)) {
        groupName = groupName.replaceAll(/\r|\n/gm, " ")
        fullWidth = true
      }

      return {
        name: groupName,
        color: g.color ? "#" + g.color : undefined,
        full: fullWidth,
      }
    })

    if (option === "full") {
      return roles
    } else if (option === "hide") {
      return roles.filter((r) => !r.full)
    } else {
      return roles.map((r) => {
        return {
          name: r.name,
          color: r.color,
          full: false,
        }
      })
    }
  } else return []
}

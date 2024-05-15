import twemoji from "@twemoji/api"
import toHtml from "discord-markdown"

const { toHTML } = toHtml

// Converts discord markdown into HTML, and parses twemojis
export function convertToHTML(str: string): string {
  if (str)
    return twemoji.parse(toHTML(str, { embed: true }), {
      base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
    })
  return ""
}

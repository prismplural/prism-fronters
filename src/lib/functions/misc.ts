import { browser } from "$app/environment"
import type { Writable } from "svelte/store"

let theme: string = browser ? localStorage.getItem("pk-fulmn-theme") ?? "dark" : "dark"

export default (store: Writable<string>) => {
  let value = "dark"
  store.subscribe((val) => (value = val))

  if (value == "dark") {
    store.set("light")
  } else if (value == "light") {
    store.set("dark")
  }

  theme = value
  setBodyTheme(document.body as HTMLBodyElement)
}

export function setBodyTheme(body: HTMLBodyElement) {
  body.className = theme + "-mode"
}

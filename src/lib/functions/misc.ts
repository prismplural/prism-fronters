import { browser } from "$app/environment"
import type { Writable } from "svelte/store"
import theme from "$lib/functions/store/theme"

export default (store: Writable<string>) => {
  store.update((value) => (value === "dark" ? "light" : "dark"))
}

export function setBodyTheme(body: HTMLBodyElement) {
  if (!browser) return

  const unsubscribe = theme.subscribe((value) => {
    body.classList.remove("dark-mode", "light-mode")
    body.classList.add(`${value}-mode`)
    body.dataset.theme = value
  })

  return {
    destroy: unsubscribe,
  }
}

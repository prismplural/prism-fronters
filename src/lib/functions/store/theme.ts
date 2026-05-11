import { writable } from "svelte/store"
import { browser } from "$app/environment"

export type ThemePreference = "system" | "dark" | "light"

export const theme = writable<ThemePreference>("system")

theme.subscribe((value) => {
  if (browser) {
    window.localStorage.removeItem("prism-fronters-theme")
    window.localStorage.removeItem("pk-fulmn-theme")
  }
})

export default theme

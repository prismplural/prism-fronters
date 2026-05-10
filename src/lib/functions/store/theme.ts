import { writable } from "svelte/store"
import { browser } from "$app/environment"

let defaultValue = "dark"
const initialValue = browser
  ? (window.localStorage.getItem("prism-fronters-theme") ??
    window.localStorage.getItem("pk-fulmn-theme") ??
    defaultValue)
  : defaultValue

export const theme = writable<string>(initialValue)

theme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("prism-fronters-theme", value)
  }
})

export default theme

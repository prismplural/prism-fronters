import { writable } from "svelte/store"
import { browser } from "$app/environment"

let defaultValue = "dark"
const initialValue = browser
  ? (window.localStorage.getItem("pk-fulmn-theme") ?? defaultValue)
  : defaultValue

export const theme = writable<string>(initialValue)

theme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("pk-fulmn-theme", value)
  }
})

export default theme

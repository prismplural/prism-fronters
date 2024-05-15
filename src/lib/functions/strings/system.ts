import type { System } from "$lib/types"
import moment from "moment"

// Builds the page title for the current fronters page
export function buildFrontPageTitle(system: System) {
  if (system.name) return `Currently fronting in ${system.name}!`
  else return `System with id ${system.id}'s front...`
}

// Builds the page title for the fronters if there's no fronters
export function buildSwitchOutTitle(system: System) {
  if (system.name) return `${system.name} are currently switched out!`
  else return `System with id ${system.id} are currently switched out.`
}

// Builds the opengraph embed title for the current fronters page
export function buildFrontEmbedTitle(system: System) {
  return buildFrontPageTitle(system)
}

export function buildSystemPageTitle(system: System) {
  return buildSystemEmbedTitle(system)
}

export function buildSystemEmbedTitle(system: System) {
  return system.name ? `${system.name} (${system.id})` : `(${system.id})`
}

// Creates the opengraph embed body for a system page
export function buildSystemEmbedDescription(system: System) {
  return `Read some more about ${system.name ? system.name : `system "${system.id}"`}!`
}

export function getPronouns(system: System) {
  return system.pronouns ? system.pronouns : ""
}

// Returns the system's name
export function getName(system: System) {
  return system.name ? system.name : system.id
}

export function getIcon(system: System) {
  return system.avatar_url ? system.avatar_url : ""
}

// Parses a member's creation date
export function getCreated(system: System, footer = false) {
  if (system.created) {
    if (footer) return moment(system.created).format("YYYY-MM-DD HH:mm:ss")

    return moment(system.created, "YYYY-MM-DD").format("MMM D, YYYY")
  }
  return ""
}

// Returns the system's banner
export function getBanner(system: System) {
  return system.banner ? system.banner : ""
}

export function getColor(system: System, fallback = false) {
  if (system.color) return "#" + system.color
  if (fallback === true) return "#ffffff"
  return ""
}

export function getDescription(system: System) {
  return system.description ? system.description : "(No description)"
}

export function buildSystemListTitle(system: System) {
  let name = system.name ?? `(${system.id})`
  return `Members in ${name}`
}

export function buildSystemListDescription(system: System) {
  let name = system.name ?? `(${system.id})`
  return `View a list of all members in ${name}!`
}

import type { System } from '$lib/types'

// Builds the page title for the current fronters page
export function buildFrontPageTitle(system: System) {
    if (system.name) return `Currently fronting in ${system.name}!`
    else return `Currently fronting ${system.id}...`;
}

// Builds the opengraph embed title for the current fronters page
export function buildFrontEmbedTitle(system: System) {
    return buildFrontPageTitle(system);
}
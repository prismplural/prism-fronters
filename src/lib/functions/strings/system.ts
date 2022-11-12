import type { System } from '$lib/types'

// Builds the page title for the current fronters page
export function buildFrontPageTitle(system: System) {
    if (system.name) return `Currently fronting in ${system.name}!`
    else return `Currently fronting in [${system.id}]...`;
}

// Builds the page title for the fronters if there's no fronters
export function buildSwitchOutTitle(system: System) {
    if (system.name) return `${system.name} are currently switched out!`
    else return `System [${system.id}] are currently switched out.`;
}

// Builds the opengraph embed title for the current fronters page
export function buildFrontEmbedTitle(system: System) {
    return buildFrontPageTitle(system);
}
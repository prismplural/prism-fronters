import { error } from '@sveltejs/kit';
import type { Member } from '$lib/types';

export async function load( {fetch, params} ) {
    const sid = params.slug.toLowerCase();

    let system: any;
    system = await fetch(`https://api.pluralkit.me/v2/systems/${sid}`, {
        headers: {
            'origin': 'https://pk.fulmine.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `System with id ${sid} not found.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        if (resp.status === 429) throw error(500, "PluralKit is rate limiting us! Please try again.")
        if (resp.ok) return resp.json();
        throw error(500, "Internal server error. This this site's fault. Please report it to the developers!");
    });

    let members: Member[];
    members = await fetch(`https://api.pluralkit.me/v2/systems/${sid}/members`, {
        headers: {
            'origin': 'https://pk.fulmine.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `System with id ${sid} not found.`);
        if (resp.status === 403) throw error(403, `Member list is currently private.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        if (resp.status === 429) throw error(500, "PluralKit is rate limiting us! Please try again.");
        if (resp.status === 204) return [];
        if (resp.ok) return resp.json();
        throw error(500, "Internal server error. This this site's fault. Please report it to the developers!");
    });

    members = members.sort((a, b) => a.name.localeCompare(b.name));

    return {
        system: system,
        members: members,
    };
}
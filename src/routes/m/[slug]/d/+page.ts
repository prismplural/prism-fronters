import { error } from '@sveltejs/kit';
import type { Group } from '$lib/types';

export async function load( {params, fetch, url} ) {
    const mid = params.slug.toLowerCase();

    let member: any;
    member = await fetch(`https://api.pluralkit.me/v2/members/${mid}`, {
        headers: {
            'origin': 'https://pluralkit.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `Member with id ${mid} not found.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        if (resp.status === 429) throw error(500, "PluralKit is rate limiting us! Please try again.")
        if (resp.ok) return resp.json();
        throw error(500, "Internal server error. This this site's fault. Please report it to the developers!");
    });

    let groups: Group[] = [];
    if (url.searchParams.get("g")) {
        groups = await fetch(`https://api.pluralkit.me/v2/members/${mid}/groups`, {
            headers: {
                'origin': 'https://pluralkit.xyz'
                }
        })
        .then(resp => {
            if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
            if (resp.ok) return resp.json();
            if (resp.status < 500) return [];
            throw error(500, "Internal server error. This this site's fault. Please report it to the developers!");
        });
    
        groups = groups.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
        member: member,
        groups: groups
    };
}
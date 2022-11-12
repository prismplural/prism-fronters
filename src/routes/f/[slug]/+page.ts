import { error } from '@sveltejs/kit';

export async function load( {fetch, params} ) {
    const sid = params.slug;

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

    let front: any;
    front = await fetch(`https://api.pluralkit.me/v2/systems/${sid}/fronters`, {
        headers: {
            'origin': 'https://pk.fulmine.xyz'
            }
    })
    .then(resp => {
        if (resp.status === 404) throw error(404, `System with id ${sid} not found.`);
        if (resp.status === 403) throw error(403, `Front is currently private.`);
        if (resp.status === 500) throw error(500, "Internal server error. This is on PluralKit's end.");
        if (resp.status === 429) throw error(500, "PluralKit is rate limiting us! Please try again.")
        if (resp.ok) return resp.json();
        throw error(500, "Internal server error. This this site's fault. Please report it to the developers!");
    });

    return {
        system: system,
        front: front
    };
}
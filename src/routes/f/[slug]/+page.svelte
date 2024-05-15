<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import theme from "$lib/functions/store/theme";

    import changeTheme from '$lib/functions/misc.js';
    import Front from '$lib/components/cards/Front.svelte';
    import { buildFrontEmbedTitle, buildFrontPageTitle, buildSwitchOutTitle } from '$lib/functions/strings/system';
    import { buildFrontEmbedDescription, getAvatar, getColor } from '$lib/functions/strings/member';
    import type { PageData } from './$types';
    import { shortenCard, shortenLayout } from '$lib/functions/utils';
  import PkSystem from '$lib/components/cards/PkSystem.svelte';
  import PkMember from '$lib/components/cards/PkMember.svelte';

    export let data: PageData;

    const params: string[] = []
    const layout = shortenLayout(data.layout)
    const card = shortenCard(data.card)
    if (layout) params.push(layout)
    if (card) params.push(card)
</script>

<h2>{buildFrontPageTitle(data.system)}</h2>
<span style="margin: 1rem auto 0 auto;">(<a href={`/s/${data.system.id}?${$page.url.searchParams.toString()}`}>Back to system</a>)</span>
{#if data.card === "full"}
<div class="full container">
    {#if data.includeSystem}
        <PkSystem system={data.system}  />
    {/if}
    {#if data.front.members.length > 0}
    {#each data.front.members as member}
        <PkMember {member} />
    {/each}
    {:else}
        <h3>{@html buildSwitchOutTitle(data.system)}</h3>
    {/if}
</div>
{:else}
<div class="front container">
    {#if data.includeSystem}
        <Front member={data.system} system={true}  />
    {/if}
    {#if data.front.members.length > 0}
    {#each data.front.members as member}
        <Front {member} />
    {/each}
    {:else}
        <h3>{@html buildSwitchOutTitle(data.system)}</h3>
    {/if}
</div>
{/if}
{#if data.front.members.length > 0 || data.includeSystem}
<span class="tinytext">(Click a card to view member info)</span>
<button class="button" style="margin: 1rem auto;" on:click={() => changeTheme(theme)}>Theme</button>
{/if}

<svelte:head>
    <title>{buildFrontPageTitle(data.system)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildFrontEmbedTitle(data.system)} />
    <meta property="og:description" content={buildFrontEmbedDescription(data.front.members)} />
    <meta property="og:image" content={data.front.members && data.front.members.length > 0 ? getAvatar(data.front.members[0]) : ""} />
    <meta name="theme-color" content={data.front.members && data.front.members.length > 0 ? getColor(data.front.members[0], true) : ""}>
</svelte:head>
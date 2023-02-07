<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import theme from "$lib/functions/store/theme";

    import changeTheme from '$lib/functions/misc';
    import Front from '$lib/components/cards/Front.svelte';
    import { buildFrontEmbedTitle, buildFrontPageTitle, buildSwitchOutTitle } from '$lib/functions/strings/system';
    import { buildFrontEmbedDescription, getAvatar, getColor } from '$lib/functions/strings/member';

    export let data;

    let includeSystem = false;

    let url = "";
    onMount(() => url = window.location.href);

    if ($page.url.searchParams.get('s') || $page.url.searchParams.get('system') || $page.url.searchParams.get('sys')) {
        includeSystem = true;
    }
</script>

<h2>{buildFrontPageTitle(data.system)}</h2>
<span style="margin: 1rem auto 0 auto;">(<a href={`/s/${data.system.id}`}>Back to system</a>)</span>
<div class="front container">
    {#if includeSystem}
        <Front member={data.system} system={true}/>
    {/if}
    {#if data.front.members.length > 0}
    {#each data.front.members as member}
        <Front {member}/>
    {/each}
    {:else}
        <h3>{@html buildSwitchOutTitle(data.system)}</h3>
    {/if}
</div>
{#if data.front.members.length > 0 || includeSystem}
<span class="tinytext">(Click a card to view member info)</span>
<button class="button" style="margin: 1rem auto 0 auto;" on:click={() => changeTheme(theme)}>Theme</button>
{/if}

<svelte:head>
    <title>{buildFrontPageTitle(data.system)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildFrontEmbedTitle(data.system)} />
    <meta property="og:description" content={buildFrontEmbedDescription(data.front.members)} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={data.front.members && data.front.members.length > 0 ? getAvatar(data.front.members[0]) : ""} />
    <meta name="theme-color" content={data.front.members && data.front.members.length > 0 ? getColor(data.front.members[0], true) : ""}>
</svelte:head>
<script lang="ts">
    import { onMount } from 'svelte';

    import GlobalStyle from '$lib/styles/global.scss';
    import Front from '$lib/components/cards/Front.svelte';
    import { buildFrontEmbedTitle, buildFrontPageTitle } from '$lib/functions/strings/system';
    import { buildSwitchOutText, buildFrontEmbedDescription, getAvatar, getColor } from '$lib/functions/strings/member';

    export let data;

    let url = "";
    onMount(() => url = window.location.href);
</script>

<h2>{buildFrontPageTitle(data.system)}</h2>
<div class="front container">
    {#if data.front.members}
    {#each data.front.members as member}
        <Front {member}/>
    {/each}
    {:else}
        <h3>{@html buildSwitchOutText()}</h3>
    {/if}
</div>
<span class="tinytext">(Click a card to view member info)</span>

<svelte:head>
    <title>{buildFrontPageTitle(data.system)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildFrontEmbedTitle(data.system)} />
    <meta property="og:description" content={buildFrontEmbedDescription(data.front.members)} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={data.front.members && data.front.members.length > 0 ? getAvatar(data.front.members[0]) : ""} />
    <meta name="theme-color" content={data.front.members && data.front.members.length > 0 ? getColor(data.front.members[0], true) : ""}>
</svelte:head>
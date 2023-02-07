<script lang="ts">
    import { onMount } from 'svelte';

    import System from '$lib/components/cards/System.svelte';
    import { buildSystemEmbedTitle, buildSystemPageTitle, buildSystemEmbedDescription, getIcon, getColor } from '$lib/functions/strings/system';

    export let data;

    let url = "";
    onMount(() => url = window.location.href);
</script>

<System system={data.system} front={data.front} />

<svelte:head>
    <title>{buildSystemPageTitle(data.system)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildSystemEmbedTitle(data.system)} />
    <meta property="og:description" content={buildSystemEmbedDescription(data.system)} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={getIcon(data.system)} />
    <meta name="theme-color" content={getColor(data.system, true)}>
</svelte:head>
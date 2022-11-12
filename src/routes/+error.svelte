<script lang="ts">
    import GlobalStyle from '$lib/styles/global.scss';
    import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error && $page.error.message}</p>

<svelte:head>
    <title>Fulmine | Error</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="Fulmine | PluralKit" />
    <meta property="og:description" content="A small website that lets you view some PluralKit data." />
    <meta property="og:url" content="https://pk.fulmine.xyz" />
    <meta property="og:image" content="/favicon.png" />
    <meta name="theme-color" content="#ffffff">
</svelte:head>
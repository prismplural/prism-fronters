<script lang="ts">
    import theme from "$lib/functions/store/theme";
    import changeTheme from '$lib/functions/misc';
</script>

<main class="container info">
    <h1>pluralkit.xyz</h1>
    <section class="content">
        <p>A small website that lets you view some PluralKit data.</p>
        <p>Looking for the official PluralKit documentation? <a href="https://pluralkit.me">pluralkit.me</a> is the place to go!</p>
        <nav class="row">
            <a class="button" href="/s">System</a>
            <a class="button" href="/f">Front</a>
            <a class="button" href="/m">Member</a>
            <a class="button" href="https://codeberg.org/fulmine/pk-fulmine">Source</a>
            <button class="button" on:click={() => changeTheme(theme)}>Theme</button>
        </nav>
    </section>
</main>

<svelte:head>
    <title>Fulmine | PluralKit</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="Fulmine | PluralKit" />
    <meta property="og:description" content="A small website that lets you view some PluralKit data." />
    <meta property="og:url" content="https://pluralkit.xyz" />
    <meta property="og:image" content="/favicon.png" />
    <meta name="theme-color" content="#ffffff">
</svelte:head>

<svelte:body/>
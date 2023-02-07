<script lang="ts">
    import theme from "$lib/functions/store/theme";

    const changeTheme = () => {
		if ($theme == "dark") {
			theme.set("light");
		} else if ($theme == "light") {
			theme.set("dark");
		}
		
		setBodyTheme(document.body as HTMLBodyElement);
	}

	function setBodyTheme(body: HTMLBodyElement) {
		body.className = $theme + "-mode";
	}
</script>

<main class="container info">
    <h1>pk.fulmine.xyz</h1>
    <section class="content">
        <p>A small website that lets you view some PluralKit data.</p>
        <nav class="row">
            <a class="button" href="/f">Front</a>
            <a class="button" href="/m">Member</a>
            <a class="button" href="https://codeberg.org/fulmine/pk-fulmine">Source</a>
            <button class="button" on:click={() => changeTheme()}>Theme</button>
        </nav>
    </section>
</main>

<svelte:head>
    <title>Fulmine | PluralKit</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="Fulmine | PluralKit" />
    <meta property="og:description" content="A small website that lets you view some PluralKit data." />
    <meta property="og:url" content="https://pk.fulmine.xyz" />
    <meta property="og:image" content="/favicon.png" />
    <meta name="theme-color" content="#ffffff">
</svelte:head>

<svelte:body use:setBodyTheme />
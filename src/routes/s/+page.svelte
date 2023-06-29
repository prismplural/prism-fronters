<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<main class="container info">
    <h1>System</h1>
    <section class="content">
        <label for="front-sid">Enter a system id to view that system.</label>
        <form method="POST" use:enhance >
            <div class="row">
                <input required id="front-sid" name="sid" placeholder="system id...">
                <button class="button">View</button>
            </div>
            <div class="row" style="margin-bottom: 0.5rem; margin-top: 0.5rem">
                <label for="s-layout">Layout used:</label>
                <select id="s-layout" name="layout">
                    <option value="">Default</option>
                    <option value="pk">PluralKit embed</option>
                </select>
            </div>
        </form>
        <span>(<a href="/">Back to home</a>)</span>
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
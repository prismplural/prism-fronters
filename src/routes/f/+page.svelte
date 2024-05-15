<script lang="ts">
  import { enhance } from "$app/forms"
  import DisplayOptions from "$lib/components/DisplayOptions.svelte"
</script>

<main class="container info">
  <h1>Front</h1>
  <section class="content">
    <label for="front-sid">Enter a system id to view that system's front.</label>
    <form method="POST" use:enhance>
      <div class="row">
        <input required id="front-sid" name="sid" placeholder="system id..." />
        <button class="button">View</button>
      </div>
      <DisplayOptions />
    </form>
  </section>
  <span>(<a href="/">Back to home</a>)</span>
</main>

<svelte:head>
  <title>Fulmine | PluralKit</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Fulmine | PluralKit" />
  <meta
    property="og:description"
    content="A small website that lets you view some PluralKit data."
  />
  <meta property="og:url" content="https://pluralkit.xyz" />
  <meta property="og:image" content="/favicon.png" />
  <meta name="theme-color" content="#ffffff" />
</svelte:head>

<script lang="ts">
  import { enhance } from "$app/forms"
  import DisplayOptions from "$lib/components/DisplayOptions.svelte"
</script>

<main class="container info">
  <h1>Member</h1>
  <span>Want something more fun? Here's a <a href="./d/m">fake discord profile creator</a>!</span>
  <section class="content">
    <label for="front-sid">Enter a member id to view that member.</label>
    <form method="POST" use:enhance>
      <div class="row">
        <input required id="front-mid" name="mid" placeholder="member id..." />
        <button class="button">View</button>
      </div>
      <DisplayOptions />
    </form>
    <span>(<a href="/">Back to home</a>)</span>
  </section>
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

<script lang="ts">
  import { enhance } from "$app/forms"
  import { tick } from "svelte"
  import InfoBanner from "$lib/components/prism/InfoBanner.svelte"
  import PrismButton from "$lib/components/prism/PrismButton.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"
  // The root page posts to /f — on fail(), SvelteKit redirects back and
  // the form data lands on /f/+page.svelte, not here. This form prop is
  // future-proofing in case a same-page action is added later.
  export let form: { error?: string } | null = null
  let inputEl: HTMLInputElement

  const enhanceWithFocus = () => async ({ update }: { update: () => Promise<void> }) => {
    await update()
    await tick()
    if (form?.error) inputEl?.focus()
  }
</script>

<PrismShell>
  <div class="page-stack">
    <section class="hero-panel">
      <div class="hero-content">
        <p class="page-kicker">Public PluralKit bridge</p>
        <h1 class="page-title">Prism Fronters</h1>
        <p class="page-copy">
          View a public PluralKit system's current front and recent fronting history.
        </p>

        <form class="setup-form" method="POST" action="/f" use:enhance={enhanceWithFocus}>
          <label class="form-label" for="front-sid">
            System ID
            {#if !form?.error}
              <span>Use a public PluralKit system ID. Private fronts stay private.</span>
            {/if}
          </label>
          <div class="form-row">
            <input
              bind:this={inputEl}
              required
              id="front-sid"
              name="sid"
              placeholder="abcde"
              autocomplete="off"
              aria-describedby="front-sid-error"
              aria-invalid={form?.error ? "true" : undefined}
            />
            <PrismButton type="submit">
              <span class="ph-duotone ph-users-three" aria-hidden="true"></span>
              View front
            </PrismButton>
          </div>
          <p id="front-sid-error" class="form-error" role="status" aria-live="polite">
            {form?.error ?? ""}
          </p>
        </form>
      </div>
    </section>

    <InfoBanner title="Powered by public PluralKit data" icon="ph-arrows-clockwise">
      Prism Fronters only reads public PluralKit front and switch history responses.
    </InfoBanner>
  </div>
</PrismShell>

<svelte:head>
  <title>Prism Fronters</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Prism Fronters" />
  <meta
    property="og:description"
    content="A Prism-native public dashboard for PluralKit fronts and recent fronting history."
  />
  <meta property="og:image" content="/favicon.jpg" />
  <meta name="theme-color" content="#B498C2" />
</svelte:head>

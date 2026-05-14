<script lang="ts">
  import { enhance } from "$app/forms"
  import { tick } from "svelte"
  import InfoBanner from "$lib/components/prism/InfoBanner.svelte"
  import PrismButton from "$lib/components/prism/PrismButton.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"
  import type { ActionData } from "./$types"

  export let form: ActionData | null = null
  let inputEl: HTMLInputElement

  const enhanceWithFocus = () => async ({ update }: { update: () => Promise<void> }) => {
    await update()
    await tick()
    if (form?.error) inputEl?.focus()
  }
</script>

<PrismShell pageClass="narrow">
  <div class="page-stack">
    <section class="hero-panel">
      <div class="hero-content">
        <p class="page-kicker">Front lookup</p>
        <h1 class="page-title small">Open a public front</h1>
        <p class="page-copy">
          Enter a PluralKit system ID to show its current front and recent history.
        </p>

        <form class="setup-form" method="POST" use:enhance={enhanceWithFocus}>
          <label class="form-label" for="front-sid">
            System ID
            {#if !form?.error}
              <span>Only public PluralKit front data can be shown.</span>
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
            <PrismButton type="submit">View front</PrismButton>
          </div>
          <p id="front-sid-error" class="form-error" role="status" aria-live="polite">
            {form?.error ?? ""}
          </p>
        </form>
      </div>
    </section>

    <InfoBanner title="No login required" icon="ph-eye-slash">
      This page does not use Discord auth or PluralKit tokens. If a system's front is private, Prism
      Fronters will not display it.
    </InfoBanner>
  </div>
</PrismShell>

<svelte:head>
  <title>Front lookup | Prism Fronters</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Front lookup | Prism Fronters" />
  <meta
    property="og:description"
    content="View a public PluralKit system's current fronters through Prism Fronters."
  />
  <meta property="og:image" content="/favicon.jpg" />
  <meta name="theme-color" content="#B498C2" />
</svelte:head>

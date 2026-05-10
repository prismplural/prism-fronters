<script lang="ts">
  import { enhance } from "$app/forms"
  import InfoBanner from "$lib/components/prism/InfoBanner.svelte"
  import PrismButton from "$lib/components/prism/PrismButton.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"
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

        <form class="setup-form" method="POST" action="/f" use:enhance>
          <label class="form-label" for="front-sid">
            System ID
            <span>Use a public PluralKit system ID. Private fronts stay private.</span>
          </label>
          <div class="form-row">
            <input required id="front-sid" name="sid" placeholder="abcde" autocomplete="off" />
            <PrismButton type="submit">
              <span class="ph-duotone ph-users-three" aria-hidden="true"></span>
              View front
            </PrismButton>
          </div>
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

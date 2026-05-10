<script lang="ts">
  import { page } from "$app/stores"
  import EmptyState from "$lib/components/prism/EmptyState.svelte"
  import PrismButton from "$lib/components/prism/PrismButton.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"
</script>

<PrismShell pageClass="narrow">
  <div class="page-stack">
    <EmptyState
      title={`${$page.status}`}
      icon={$page.status === 403 ? "ph-eye-slash" : "ph-question"}
    >
      {$page.error?.message || "Something went wrong while loading this PluralKit data."}
    </EmptyState>
    <div class="hero-actions">
      <PrismButton href="/" variant="subtle">Home</PrismButton>
    </div>
  </div>
</PrismShell>

<svelte:head>
  <title>Error | Prism Fronters</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Prism Fronters" />
  <meta
    property="og:description"
    content="A Prism-native public dashboard for PluralKit fronters."
  />
  <meta property="og:image" content="/favicon.jpg" />
  <meta name="theme-color" content="#B498C2" />
</svelte:head>

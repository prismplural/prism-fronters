<script lang="ts">
  import { onMount } from "svelte"

  import System from "$lib/components/cards/System.svelte"
  import {
    buildSystemEmbedTitle,
    buildSystemPageTitle,
    buildSystemEmbedDescription,
    getIcon,
    getColor,
  } from "$lib/functions/strings/system"
  import type { PageData } from "./$types"
  import PkSystem from "$lib/components/cards/PkSystem.svelte"
  import { shortenCard, shortenLayout } from "$lib/functions/utils"

  export let data: PageData

  let url = ""
  onMount(() => (url = window.location.href))

  const params: string[] = []
  const layout = shortenLayout(data.layout)
  const card = shortenCard(data.card)
  if (layout) params.push(layout)
  if (card) params.push(card)
</script>

{#if data.layout === "default"}
  <System system={data.system} front={data.front} />
{:else if data.layout === "pluralkit"}
  <PkSystem system={data.system} front={data.front} />
{/if}

<svelte:head>
  <title>{buildSystemPageTitle(data.system)}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content={buildSystemEmbedTitle(data.system)} />
  <meta property="og:description" content={buildSystemEmbedDescription(data.system)} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={getIcon(data.system)} />
  <meta name="theme-color" content={getColor(data.system, true)} />
  <meta name="robots" content="noindex">
</svelte:head>

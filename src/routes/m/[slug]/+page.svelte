<script lang="ts">
  import Member from "$lib/components/cards/Member.svelte"
  import PkMember from "$lib/components/cards/PkMember.svelte"
  import {
    buildMemberPageTitle,
    buildMemberEmbedTitle,
    buildMemberEmbedDescription,
    getAvatar,
    getColor,
  } from "$lib/functions/strings/member"
  import type { PageData } from "./$types"
  import { shortenCard, shortenLayout } from "$lib/functions/utils"

  export let data: PageData

  const params: string[] = []
  const layout = shortenLayout(data.layout)
  const card = shortenCard(data.card)
  if (layout) params.push(layout)
  if (card) params.push(card)
</script>

{#if data.layout === "default"}
  <Member member={data.member} />
{:else}
  <PkMember member={data.member} />
{/if}

<svelte:head>
  <title>{buildMemberPageTitle(data.system, data.member)}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content={buildMemberEmbedTitle(data.system, data.member)} />
  <meta property="og:description" content={buildMemberEmbedDescription(data.member)} />
  <meta property="og:image" content={getAvatar(data.member)} />
  <meta name="theme-color" content={getColor(data.member, true)} />
  <meta name="robots" content="noindex">
</svelte:head>

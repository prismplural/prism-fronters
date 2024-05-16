<script lang="ts">
  import DiscordCard from "$lib/components/cards/DiscordCard.svelte"
  import { page } from "$app/stores"
  import { createCard } from "$lib/functions/discordCard"
  import { buildMemberEmbedDescription, getAvatar, getColor } from "$lib/functions/strings/member"

  export let data: any

  const params = $page.url.searchParams
  const light = params.get("t") && params.get("t") === "light" ? true : false

  async function getCard() {
    return await createCard(params, data.member, data.groups)
  }

  const cardPromise = getCard()
</script>

<div class="center" style={light ? "background-color: #ffffff" : "background-color: #000000"}>
  {#await cardPromise}
    <span style={light ? "color: #666666;" : "color: #dddddd;"}>loading...</span>
  {:then card}
    <DiscordCard {card} />
  {/await}
</div>

<svelte:head>
  <title>{data.member.name}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.member.name} />
  <meta property="og:description" content={buildMemberEmbedDescription(data.member)} />
  <meta property="og:image" content={getAvatar(data.member)} />
  <meta name="theme-color" content={getColor(data.member, true)} />
  <meta name="robots" content="noindex">
</svelte:head>

<style lang="scss">
  .center {
    width: 100vw;
    min-height: 100vh;
    background-color: #999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: initial;
  }
</style>

<script lang="ts">
  import theme from "$lib/functions/store/theme"

  import changeTheme from "$lib/functions/misc"
  import type { Member } from "$lib/types"
  import MemberCard from "$lib/components/cards/Front.svelte"
  import {
    buildSystemListTitle,
    buildSystemListDescription,
    getIcon,
    getColor,
  } from "$lib/functions/strings/system"
  import type { PageData } from "./$types"
  import { shortenCard, shortenLayout } from "$lib/functions/utils"
  import PkSystem from "$lib/components/cards/PkSystem.svelte"
  import PkMember from "$lib/components/cards/PkMember.svelte"
  import { page } from "$app/stores"

  export let data: PageData

  const alphabet = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ]

  function getListFromLetter(list: Member[], letter: string, misc = false) {
    if (misc) {
      return list.filter((m) => {
        let bool = true
        alphabet.forEach((l) =>
          m.name.toLowerCase().startsWith(l.toLowerCase()) ? (bool = false) : ""
        )
        return bool
      })
    }

    return list.filter((m) => m.name.toLowerCase().startsWith(letter.toLowerCase()))
  }

  const params: string[] = []
  const layout = shortenLayout(data.layout)
  const card = shortenCard(data.card)
  if (layout) params.push(layout)
  if (card) params.push(card)
</script>

<h2>{buildSystemListTitle(data.system)}</h2>
<span style="margin: 1rem auto 0 auto;"
  >(<a href={`/s/${data.system.id}?${$page.url.searchParams.toString()}`}>Back to system</a>)</span
>
<button class="button" style="margin: 1rem auto 0 auto;" on:click={() => changeTheme(theme)}
  >Theme</button
>
{#if data.members.length > 0}
  {#if getListFromLetter(data.members, "", true).length > 0 || data.includeSystem}
    <h2>Unsorted.</h2>
    <hr />
    {#if data.card === "full"}
      <div class="full container">
        {#if data.includeSystem}
          <PkSystem system={data.system} />
        {/if}
        {#each getListFromLetter(data.members, "", true) as member}
          <PkMember {member} />
        {/each}
      </div>
    {:else}
      <div class="front container">
        {#if data.includeSystem}
          <MemberCard member={data.system} system={true} />
        {/if}
        {#each getListFromLetter(data.members, "", true) as member}
          <MemberCard {member} />
        {/each}
      </div>
    {/if}
  {/if}
  {#each alphabet as letter}
    {#if getListFromLetter(data.members, letter).length > 0}
      <h2>{letter}.</h2>
      <hr />
      {#if data.card === "full"}
        <div class="full container">
          {#each getListFromLetter(data.members, letter) as member}
            <PkMember {member} />
          {/each}
        </div>
      {:else}
        <div class="front container">
          {#each getListFromLetter(data.members, letter) as member}
            <MemberCard {member} />
          {/each}
        </div>
      {/if}
    {/if}
  {/each}
{:else}
  <h3>This system currently has no members.</h3>
{/if}

<svelte:head>
  <title>{buildSystemListTitle(data.system)}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content={buildSystemListTitle(data.system)} />
  <meta property="og:description" content={buildSystemListDescription(data.system)} />
  <meta property="og:image" content={getIcon(data.system) ?? ""} />
  <meta name="theme-color" content={getColor(data.system, true) ?? ""} />
  <meta name="robots" content="noindex">
</svelte:head>

<style>
  h2 {
    margin-top: 3rem;
  }

  hr {
    border: none;
    height: 2px;
    width: 70%;
    background-color: rgba(160, 160, 160, 0.3);
    margin-bottom: 1rem;
  }
</style>

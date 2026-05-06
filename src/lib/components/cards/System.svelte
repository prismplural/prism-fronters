<script lang="ts">
  import type { System, Front } from "$lib/types"
  import theme from "$lib/functions/store/theme"

  import changeTheme from "$lib/functions/misc"
  import {
    getPronouns,
    getDescription,
    getColor,
    getBanner,
    getName,
    getIcon,
  } from "$lib/functions/strings/system"
  import AwaitHtml from "../AwaitHtml.svelte"
  import parseMarkdown from "$lib/functions/parseMarkdown"
  import { page } from "$app/stores"
  import Link from "../Link.svelte"

  export let system: System
  export let front: Front
</script>

<div class="container member">
  <section class="side">
    <div class="top">
      {#if getIcon(system)}
        <img class="avatar" src={getIcon(system)} alt={`${getName(system)}'s avatar`} />
      {/if}
      <div class="info">
        {#if getName(system)}
          <h3>{getName(system)}</h3>
          <hr />
        {/if}
        {#if getPronouns(system)}
          <span
            ><b>Pronouns:</b>
            <AwaitHtml
              htmlPromise={parseMarkdown(getPronouns(system), { embed: true })}
              useTwemoji={true}
            /></span
          >
        {/if}
        {#if front.members && front.members.length > 0}
          <span
            ><b>Fronting:</b>
            {#each front.members as m, index}
              {#if index > 0}
                ,
              {/if}
              {m.name}
            {/each}
            (<Link href={`/f/${system.id}`}>view</Link>)</span
          >
        {/if}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <button class="button" style="width: auto;" on:click={() => changeTheme(theme)}>Theme</button>
      <span style="align-self: center;">(<Link href={`/s/${system.id}/m`}>Member list</Link>)</span>
    </div>
  </section>
  <div class="content">
    {#if getDescription(system)}
      <main
        class="desc"
        style={getBanner(system) && getColor(system)
          ? `border-left: 4px solid ${getColor(system)}`
          : ""}
      >
        <div>
          <AwaitHtml
            htmlPromise={parseMarkdown(getDescription(system), { embed: true })}
            useTwemoji={true}
          />
        </div>
      </main>
    {/if}
    {#if getBanner(system)}
      <div class="banner">
        <img src={getBanner(system)} alt={`${getName(system)}'s banner`} />
      </div>
    {:else if getColor(system)}
      <div class="banner" style={`background-color: ${getColor(system)}`}></div>
    {/if}
  </div>
</div>

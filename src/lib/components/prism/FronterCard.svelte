<script lang="ts">
  import { page } from "$app/stores"
  import AwaitHtml from "$lib/components/AwaitHtml.svelte"
  import MemberAvatar from "$lib/components/prism/MemberAvatar.svelte"
  import PrismChip from "$lib/components/prism/PrismChip.svelte"
  import {
    getAvatar as getMemberAvatar,
    getColor as getMemberColor,
    getName as getMemberName,
    getPronouns as getMemberPronouns,
  } from "$lib/functions/strings/member"
  import {
    getColor as getSystemColor,
    getIcon as getSystemIcon,
    getName as getSystemName,
    getPronouns as getSystemPronouns,
  } from "$lib/functions/strings/system"
  import type { Member, System } from "$lib/types"

  export let member: Member | System
  export let system = false

  $: item = member as any
  $: useProxyAvatar = $page.url.searchParams.get("pl") ? true : false
  $: color = (system ? getSystemColor(item) : getMemberColor(item)) || "var(--prism-purple)"
  $: avatar = system ? getSystemIcon(item) : getMemberAvatar(item, useProxyAvatar)
  $: rawName = system
    ? getSystemName(item)
    : $page.url.searchParams.get("dn") && item.display_name
      ? item.display_name
      : getMemberName(item)
  $: pronouns = system ? getSystemPronouns(item) : getMemberPronouns(item)
  $: showPronouns = pronouns && (system || !$page.url.searchParams.get("prns"))
</script>

<article class="fronter-card" style={`--card-accent: ${color};`}>
  <div class="fronter-card-top">
    <MemberAvatar src={avatar} name={rawName} {color} size="md" />
    <div class="fronter-card-title">
      <h2>
        <AwaitHtml html={rawName} useTwemoji={true} />
      </h2>
    </div>
  </div>

  {#if showPronouns}
    <div class="card-meta">
      <PrismChip>
        <AwaitHtml html={pronouns} useTwemoji={true} markdown={true} />
      </PrismChip>
    </div>
  {/if}
</article>

<script lang="ts">
  import { getAvatarDisplayUrl } from "$lib/functions/avatar"

  export let src = ""
  export let name = ""
  export let color = ""
  export let size: "sm" | "md" | "lg" = "md"
  export let alt = ""

  let failed = false

  $: initial = Array.from(name.trim())[0]?.toUpperCase() ?? "?"
  $: style = color ? `--avatar-accent: ${color};` : ""
  $: avatarSrc = failed ? "" : getAvatarDisplayUrl(src)
  $: if (src) failed = false
</script>

<div class={`member-avatar ${size}`} {style}>
  {#if avatarSrc}
    <img src={avatarSrc} {alt} on:error={() => (failed = true)} />
  {:else}
    <span aria-hidden="true">{initial}</span>
  {/if}
</div>

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

<div class={`member-avatar ${size}`} {style} aria-hidden={avatarSrc ? undefined : "true"}>
  {#if avatarSrc}
    <img src={avatarSrc} alt={alt || `${name || "Member"} avatar`} on:error={() => (failed = true)} />
  {:else}
    <span>{initial}</span>
  {/if}
</div>

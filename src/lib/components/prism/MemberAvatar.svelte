<script lang="ts">
  export let src = ""
  export let name = ""
  export let color = ""
  export let size: "sm" | "md" | "lg" = "md"
  export let alt = ""

  $: initial = Array.from(name.trim())[0]?.toUpperCase() ?? "?"
  $: style = color ? `--avatar-accent: ${color};` : ""
</script>

<div class={`member-avatar ${size}`} {style} aria-hidden={src ? undefined : "true"}>
  {#if src}
    <img {src} alt={alt || `${name || "Member"} avatar`} />
  {:else}
    <span>{initial}</span>
  {/if}
</div>

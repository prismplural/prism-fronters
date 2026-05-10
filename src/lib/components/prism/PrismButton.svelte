<script lang="ts">
  export let href: string | undefined = undefined
  export let target: string | undefined = undefined
  export let rel: string | undefined = undefined
  export let variant: "filled" | "subtle" | "outline" = "filled"
  export let size: "regular" | "compact" = "regular"
  export let full = false
  export let type: "button" | "submit" | "reset" = "button"
  let className = ""
  export { className as class }

  $: classes = ["prism-button", variant, size, full ? "full" : "", className]
    .filter(Boolean)
    .join(" ")
  $: resolvedRel = rel ?? (target === "_blank" ? "noreferrer" : undefined)
</script>

{#if href}
  <a class={classes} {href} {target} rel={resolvedRel}>
    <slot />
  </a>
{:else}
  <button class={classes} {type} on:click>
    <slot />
  </button>
{/if}

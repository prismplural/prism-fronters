<script lang="ts">
  export let tone: "neutral" | "accent" | "success" | "warning" = "neutral"
  export let color = ""
  let className = ""
  export { className as class }

  $: style = color ? `--chip-accent: ${color};` : ""
</script>

<span class={`prism-chip ${tone} ${className}`} {style}>
  <slot />
</span>

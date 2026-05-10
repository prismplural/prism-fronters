<script lang="ts">
  export let tone: "subtle" | "strong" | "accent" = "subtle"
  let className = ""
  export { className as class }
</script>

<div class={`prism-surface ${tone} ${className}`}>
  <slot />
</div>

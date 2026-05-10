<script lang="ts">
  import twemoji from "@twemoji/api"

  export let htmlPromise: Promise<string> = Promise.resolve("")
  export let useTwemoji: boolean = false

  function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
  }
</script>

{#await htmlPromise}
  (loading...)
{:then html}
  {#if useTwemoji}
    {@html twemoji.parse(escapeHtml(html ?? "")) ?? ""}
  {:else}
    {@html escapeHtml(html ?? "")}
  {/if}
{:catch error}
  (failed to parse: {error?.message ?? String(error)})
{/await}

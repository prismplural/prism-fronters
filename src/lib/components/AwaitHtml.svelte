<script lang="ts">
  import twemoji from "@twemoji/api"

  export let html: string | null | undefined = ""
  export let htmlPromise: Promise<string> | null = null
  export let useTwemoji: boolean = false

  function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
  }

  function renderHtml(value: string | null | undefined) {
    const escaped = escapeHtml(value ?? "")
    return useTwemoji ? (twemoji.parse(escaped) ?? "") : escaped
  }
</script>

{#if htmlPromise}
  {#await htmlPromise}
    (loading...)
  {:then resolvedHtml}
    {@html renderHtml(resolvedHtml)}
  {:catch error}
    (failed to parse: {error?.message ?? String(error)})
  {/await}
{:else}
  {@html renderHtml(html)}
{/if}

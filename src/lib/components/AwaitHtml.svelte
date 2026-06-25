<script lang="ts">
  import { escapeHtml, renderSafeInlineMarkdown } from "$lib/functions/renderSafeInlineMarkdown"
  import twemoji from "@twemoji/api"

  export let html: string | null | undefined = ""
  export let htmlPromise: Promise<string> | null = null
  export let useTwemoji: boolean = false
  export let markdown: boolean = false

  function renderHtml(value: string | null | undefined) {
    const rendered = markdown ? renderSafeInlineMarkdown(value) : escapeHtml(value ?? "")
    return useTwemoji ? (twemoji.parse(rendered) ?? "") : rendered
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

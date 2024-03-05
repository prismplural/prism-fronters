<script lang="ts">
  import twemoji from "@twemoji/api"

    export let htmlPromise: Promise<string> = Promise.resolve("");
    export let useTwemoji: boolean = false
</script>

{#await htmlPromise}
    (loading...)
{:then html}
    {#if useTwemoji}
        {@html twemoji.parse(html) ?? ""}
    {:else}
        {@html html ?? ""}
    {/if}
{:catch error}
    (failed to parse: {error?.message ?? String(error)})
{/await}
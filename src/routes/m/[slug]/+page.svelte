<script lang="ts">
    import { onMount } from 'svelte';

    import Member from '$lib/components/cards/Member.svelte';
    import PkMember from '$lib/components/cards/PkMember.svelte';
    import { buildMemberPageTitle, buildMemberEmbedTitle, buildMemberEmbedDescription, getAvatar, getColor } from '$lib/functions/strings/member';
    import type { PageData } from './$types';

    export let data: PageData;

    let url = "";
    onMount(() => url = window.location.href);
</script>

{#if data.layout === "default"}
    <Member member={data.member} />
{:else}
    <PkMember member={data.member} />
{/if}

<svelte:head>
    <title>{buildMemberPageTitle(data.system, data.member)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildMemberEmbedTitle(data.system, data.member)} />
    <meta property="og:description" content={buildMemberEmbedDescription(data.member)} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={getAvatar(data.member)} />
    <meta name="theme-color" content={getColor(data.member, true)}>
</svelte:head>
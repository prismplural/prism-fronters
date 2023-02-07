<script lang="ts">
    import { onMount } from 'svelte';

    import Member from '$lib/components/cards/Member.svelte';
    import { buildMemberPageTitle, buildMemberEmbedTitle, buildMemberEmbedDescription, getAvatar, getColor } from '$lib/functions/strings/member';

    export let data;

    let url = "";
    onMount(() => url = window.location.href);
</script>

<Member member={data.member} />

<svelte:head>
    <title>{buildMemberPageTitle(data.system, data.member)}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={buildMemberEmbedTitle(data.system, data.member)} />
    <meta property="og:description" content={buildMemberEmbedDescription(data.member)} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={getAvatar(data.member)} />
    <meta name="theme-color" content={getColor(data.member, true)}>
</svelte:head>
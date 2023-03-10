<script lang="ts">
    import DiscordCard from "$lib/components/cards/DiscordCard.svelte";
    import { page } from "$app/stores";
    import { createCard } from "$lib/functions/discordCard";
  import { buildMemberEmbedDescription, buildMemberEmbedTitle, buildMemberPageTitle, getAvatar, getColor } from "$lib/functions/strings/member";

    export let data: any;
    

    const params = $page.url.searchParams;
    const light = params.get("t") && params.get("t") === "light" ? true : false;

    const card = createCard(params, data.member, data.groups);
</script>

<div class="center" style={light ? "background-color: #ffffff" : "background-color: #000000"}>
    <DiscordCard card={card} />
</div>

<style lang="scss">
    .center {
        width: 100vw;
        height: 100vh;
        background-color: #999999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: initial;
    }
</style>

<svelte:head>
    <title>{data.member.name}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={data.member.name} />
    <meta property="og:description" content={buildMemberEmbedDescription(data.member)} />
    <meta property="og:image" content={getAvatar(data.member)} />
    <meta name="theme-color" content={getColor(data.member, true)}>
</svelte:head>
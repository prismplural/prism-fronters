<script lang="ts">
    import type Card from '$lib/cardtypes';
	import { Theme } from '$lib/cardtypes';

    import toHtml from 'discord-markdown';
	import twemoji from 'twemoji';

    export let card: Card;
    
    const { toHTML } = toHtml;

    const themeColors: { [key: string]: Record<string, string> } = {
        dark: {
            background: "hsl(220,6.8%,17.3%)",
            overlay: '#00000099',
            body: '#00000073',
            headerPrimary: "hsla(0,0%,100%, 0.975)",
            headerSecondary: "hsla(0,0%,100%, 0.65)",
            divider: "hsla(0, 0%, 100%, 0.24)",
            faded: "hsla(0, 0%, 100%, 0.1)",
            textNormal: "hsla(0, 0%, 100%, 0.8)",
            bannerDefault: "#d1dae3",
        },
        light: {
            background: "hsl(210,11.1%,92.9%)",
            overlay: '#ffffff99',
            body: '#ffffff73',
            headerPrimary: "hsla(240,0%,0%, 0.975)",
            headerSecondary: "hsla(0,0%,0%, 0.65)",
            divider: "hsla(0, 0%, 30%, 0.24)",
            faded: "hsla(0, 0%, 30%, 0.1)",
            textNormal: "hsla(0, 0%, 0%, 0.8)",
            bannerDefault: "#7d8696",
        }
    }

    $: customColors = {
        primary: card.colors.primary && isColorValid(card.colors.primary) ? card.colors.primary : themeColors[card.theme.toLowerCase()].background,
        secondary: card.colors.secondary && isColorValid(card.colors.secondary) ? card.colors.secondary : card.colors.primary && isColorValid(card.colors.primary) ? card.colors.primary : themeColors[card.theme.toLowerCase()].background,
    }

    function isColorValid(color: string) {
        if (color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) return true;
        else return false;
    }

    $: oppositeTheme = card.theme === Theme.light ? Theme.dark : Theme.light; 
</script>

<div class="embed-body" style={`
    --profile-gradient-primary-color: ${customColors.primary};
    --profile-gradient-secondary-color: ${customColors.secondary};
    --profile-gradient-overlay-color: ${themeColors[card.theme.toLowerCase()].overlay};
    --profile-body-background-color: ${themeColors[card.theme.toLowerCase()].body};
    --profile-banner-image-url: ${card.banner ? `url(${card.banner})` : ""};
    --profile-banner-color: ${card.colors.banner ? card.colors.banner : card.colors.secondary ? card.colors.secondary : card.colors.primary? card.colors.primary : themeColors[card.theme.toLowerCase()].bannerDefault};

    --banner-height: ${card.banner ?  "120px" : card.colors.primary || card.colors.secondary ? "90px" : "60px"};
    --overlay-display: ${card.colors.primary || card.colors.secondary ? "block" : "none"};
    --avatar-position: ${card.banner ? card.colors.primary || card.colors.secondary ? "84px" : "80px" : card.colors.primary || card.colors.secondary ? "54px" : "20px"};
    --banner-margin: ${card.colors.primary || card.colors.secondary ? "4px 4px 0 4px" : "0"};
    --banner-border-radius: ${card.colors.primary || card.colors.secondary ? "4px 4px 0 0" : "7px 7px 0 0"};

    --header-primary: ${themeColors[card.theme.toLowerCase()].headerPrimary};
    --header-secondary: ${themeColors[card.theme.toLowerCase()].headerSecondary};
    --divider-color: ${themeColors[card.theme.toLowerCase()].divider};
    --faded-color: ${themeColors[card.theme.toLowerCase()].faded};
    --text-normal: ${themeColors[card.theme.toLowerCase()].textNormal};
`}>
    <div class="embed-inner">
        <svg class="embed-banner-svg" viewBox={`0 0 ${card.colors.primary || card.colors.secondary ? "332px" : "340px"} ${card.banner ? "120px" : "90px"}`}>
            <mask id="banner-mask">
                <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
                <circle fill="black" cx={58 + (!card.colors.primary && !card.colors.secondary ? + 4 : 0)} cy="{card.banner ? 120 : card.colors.primary || card.colors.secondary ? 90 : 60}" r="46"></circle>
            </mask>
            <foreignObject x="0" y="0" width={card.colors.primary || card.colors.secondary ? "332px" : "340px"} height={card.banner ? "120px" : "90px"} overflow="visible" mask="url(#banner-mask)">
                <div class="embed-banner">
                </div>
            </foreignObject>
        </svg>
        <div class="embed-avatar-wrapper">
            {#if card.avatar}
                <img class="embed-avatar" src={card.avatar} alt="profile avatar" />
            {:else}
                <div class="embed-avatar" style={`background-color: ${card.colors.primary ? card.colors.primary : card.colors.secondary ? card.colors.secondary : card.colors.banner ? card.colors.banner : themeColors[card.theme.toLowerCase()].bannerDefault}`}></div>
            {/if}
        </div>
        <div class="embed-content-container">
            <div class="embed-nickname">
                <span>{card.info.nickname || card.info.username || "Username"}</span>
                {#if !card.info.nickname}
                    <span class="embed-discriminator">#{card.info.discriminator}</span>
                {/if}
                <br/>
                <span class="embed-username">{card.info.nickname && card.info.username + "#" + (card.info.discriminator ? card.info.discriminator : "0001")}</span>
            </div>
                {#if card.info.status}
                    <span class="embed-custom-status">
                        {#if !card.info.emoji_url}
                            {@html twemoji.parse(card.info.emoji)}
                        {:else}
                            <img class="emoji" draggable="false" src={card.info.emoji_url} alt="status emoji">
                        {/if}
                        {card.info.status}
                    </span>
                {:else if card.info.emoji || card.info.emoji_url}
                    <div class="embed-emoji-status">
                        {#if !card.info.emoji_url}
                            {@html twemoji.parse(card.info.emoji)}
                        {:else}
                            <img class="emoji" draggable="false" src={card.info.emoji_url} alt="status emoji">
                        {/if}
                    </div>
                {/if}
            <hr/>
            {#if card.info.about}
                <div class="embed-section">
                    <h2 class="embed-section-title">About me</h2>
                    <div class="embed-about">
                        {@html twemoji.parse(toHTML(card.info.about, { embed: true}))}
                    </div>
                </div>
            {/if}
            {#if card.joindate.global.date || card.joindate.server.date}
            <div class="embed-section">
                <h2 class="embed-section-title">Discord member since</h2>
                <div class="embed-member-since-container">
                    {#if card.joindate.global.date}
                        {#if card.joindate.global.emoji}
                            <span>{@html twemoji.parse(card.joindate.global.emoji)}</span>
                        {/if}
                        <span>{card.joindate.global.date}</span>
                    {/if}
                    {#if card.joindate.global.date && card.joindate.server.date}
                        <span style="color: var(--divider-color)">•</span>
                    {/if}
                    {#if card.joindate.server.date}
                        {#if card.joindate.server.emoji}
                            <span>{@html twemoji.parse(card.joindate.server.emoji)}</span>
                        {/if}
                        <span>{card.joindate.server.date}</span>
                    {/if}
                </div>
            </div>
            {/if}
            {#if card.roles.length > 0}
            <div class="embed-section">
                <h2 class="embed-section-title">Roles</h2>
                <div class="embed-role-container">
                    {#each card.roles as role}
                        <div class={`embed-role ${card.colors.primary ? "embed-role-outline" : "embed-role-full"} ${role.full ? "embed-role-width" : ""}`}>
                            <div class="embed-role-button" style={"background-color: " + role.color}></div>
                            <span class="embed-role-name">{@html twemoji.parse(toHTML(role.name, { embed: true}))}</span>
                        </div>
                    {/each}
                </div>
            </div>
            {/if}
            {#if card.info.notes}
                <div class="embed-section">
                    <h2 class="embed-section-title">Note</h2>
                    <div class="embed-about" style="font-size: 12px;">
                        {@html twemoji.parse(toHTML(card.info.notes, { embed: true }))}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .embed-body {
        background: linear-gradient(var(--profile-gradient-primary-color), var(--profile-gradient-primary-color) 120px,var(--profile-gradient-secondary-color));
        width: 340px;
        // box-shadow: 0 8px 16px hsla(0%,0%,0%,0.24);
        border-radius: 8px;
        position: relative;
        margin: 10px;
        z-index: 5;
        display: flex;
        flex-direction: column;
    }
    
    .embed-inner {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .embed-inner:before {
        display: var(--overlay-display);
        border-radius: 4px;
        left: 4px;
        top: 4px;
        height: calc(100% - 8px);
        width: calc(100% - 8px);
        content: "";
        pointer-events: none;
        background-color: var(--profile-gradient-overlay-color);
        position: absolute;
        z-index: -2;
    }

    .embed-banner-svg {
        min-width: calc(340px - 8px);
        margin: var(--banner-margin);
        height: var(--banner-height);
        z-index: 10;
        border-radius: var(--banner-border-radius);
    }

    .embed-banner {
        width: 100%;
        height: 100%;
        background-color: var(--profile-banner-color);
        background-image: var(--profile-banner-image-url);
        background-size: cover;
        background-position: center;
    }

    .embed-avatar-wrapper {
        position: absolute;
        top: var(--avatar-position);
        left: 22px;
        border-radius: 50%;
        width: 80px;
        height: 80px;
    }

    .embed-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .embed-content-container {
        margin: 50px 16px 16px;
        background-color: var(--profile-body-background-color);
        border-radius: 8px;
        padding: 12px;
        gap: 12px;
        display: flex;
        flex-direction: column;
    }

    .embed-nickname {
        font-size: 20px;
        color: var(--header-primary);
        font-weight: bold;
    }

    .embed-username {
        font-size: 14px;
        color: var(--header-secondary);
        font-weight: normal;
    }

    .embed-discriminator {
        color: var(--header-secondary);
    }

    .embed-custom-status {
        line-height: 18px;
        font-size: 16px;
        color: var(--text-normal);
    }

    hr {
        border: 0;
        background-color: var(--divider-color) !important;
        height: 1px;
        width: 100%;
        margin: 0;
    }

    .embed-section {
        padding-top: 12px;
        color: var(--text-normal);
    }

    .embed-section-title {
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        font-weight: bold;
        margin: 0;
        margin-bottom: 6px;
    }

    .embed-about {
        font-size: 14px;
    }

    .embed-role {
        border-radius: 4px;
        padding: 4px;
        font-size: 12px;
        margin: 0 4px 4px 0;
        display: flex;
    }

    .embed-role-full {
        background-color: var(--faded-color);
    }

    .embed-role-outline {
        border: 1px solid var(--divider-color);
    }

    .embed-role-width {
        width: 100%;
        text-align: center;
    }

    .embed-role-button {
        height: 14px;
        width: 14px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 4px;
    }

    .embed-role-name {
        margin: 0 auto;
    }

    .embed-role-container {
        margin-top: 2px;
        display: flex;
        flex-wrap: wrap;
    }

    .embed-member-since-container {
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        align-items: center;
        font-size: 14px;
    }
</style>
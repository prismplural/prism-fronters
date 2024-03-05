<script lang="ts">
    import type { Member } from '$lib/types';
    import theme from '$lib/functions/store/theme';

    import changeTheme from '$lib/functions/misc';
    import { convertToHTML } from '$lib/functions/strings/common';
    import { getEmojis, getBirthday, getPronouns, getDescription, getColor, getBanner, getName } from '$lib/functions/strings/member';
    import { addUrlParams } from '$lib/functions/utils';

    export let member: Member;
    export let linkParams: string[];
</script>

<div class="container member">
    <section class="side">
        <div class="top">
            {#if member.avatar_url}
            <img class="avatar" src={member.avatar_url} alt={`${member.name}'s avatar`}>
            {/if}
            <div class="info">
                {#if getName(member)}
                <h3>{getName(member)}</h3>
                <hr/>
                {/if}
                {#if getEmojis(member)}
                <span><b>Emojis:</b> {@html convertToHTML(getEmojis(member))}</span>
                {/if}
                {#if getBirthday(member)}
                <span><b>Birthday:</b> {convertToHTML(getBirthday(member))}</span>
                {/if}
                {#if getPronouns(member)}
                    <span><b>Pronouns:</b> {@html convertToHTML(getPronouns(member))}</span>
                {/if}
            </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <button class="button" style="width: auto;" on:click={() => changeTheme(theme)}>Theme</button>
            <span style="align-self: center;">(<a href={`/s/${member.system}${addUrlParams(linkParams)}`}>Back to system</a>)</span>
        </div>
    </section>
    <div class="content">
    {#if getDescription(member)}
    <main class="desc" style={getBanner(member) && getColor(member) ? `border-left: 4px solid ${getColor(member)}` : ""}>
            <div>
                {@html convertToHTML(getDescription(member))} 
            </div>
    </main>
    {/if}
    {#if getBanner(member)}
    <div class="banner">
        <img src={getBanner(member)} alt={`${member.name}'s banner`}/>
    </div>
    {:else if getColor(member)}
    <div class="banner" style={`background-color: ${getColor(member)}`}></div>
    {/if}
    </div>
</div>
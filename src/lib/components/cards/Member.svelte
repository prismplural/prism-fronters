<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Member } from '$lib/types';
    import toHtml from 'discord-markdown';

    import { convertToHTML } from '$lib/functions/strings/common';
    import { getEmojis, getBirthday, getPronouns, getDescription, getColor, getBanner, getName } from '$lib/functions/strings/member';

    const { toHTML } = toHtml;

    export let member: Member;
</script>

<div class="container member">
    <section class="side">
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
        <span style="align-self: center;">(<a href="/">Back to home</a>)</span>
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
<script lang="ts">
    import type { Member } from '$lib/types';
    import theme from '$lib/functions/store/theme';

    import changeTheme from '$lib/functions/misc';
    import { getEmojis, getBirthday, getPronouns, getDescription, getColor, getBanner, getName } from '$lib/functions/strings/member';
    import { addUrlParams } from '$lib/functions/utils';
  import AwaitHtml from '../AwaitHtml.svelte'
  import parseMarkdown from '$lib/functions/parseMarkdown'

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
                <span><b>Emojis:</b> <AwaitHtml htmlPromise={new Promise((res) => res(getEmojis(member)))} useTwemoji={true} /></span>
                {/if}
                {#if getBirthday(member)}
                <span><b>Birthday:</b> <AwaitHtml htmlPromise={new Promise((res) => res(getBirthday(member)))} useTwemoji={true} /></span>
                {/if}
                {#if getPronouns(member)}
                    <span><b>Pronouns:</b> <AwaitHtml htmlPromise={parseMarkdown(getPronouns(member))} useTwemoji={true} /></span>
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
                <AwaitHtml htmlPromise={parseMarkdown(getDescription(member), { embed: true })} useTwemoji={true} />
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
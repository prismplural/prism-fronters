<script lang="ts">
    import type { Member } from '$lib/types';
    import theme from '$lib/functions/store/theme';

    import changeTheme from '$lib/functions/misc';
    import { getEmojis, getBirthday, getPronouns, getDescription, getColor, getBanner, getName, getAvatar } from '$lib/functions/strings/member';
  import AwaitHtml from '../AwaitHtml.svelte'
  import parseMarkdown from '$lib/functions/parseMarkdown'
  import { page } from '$app/stores'

    export let member: Member;

    const useProxyAvatar = $page.url.searchParams.get("pc") ? true : false
</script>

<div class="container member">
    <section class="side">
        <div class="top">
            {#if getAvatar(member, useProxyAvatar)}
            <img class="avatar" src={getAvatar(member, useProxyAvatar)} alt={`${member.name}'s avatar`}>
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
                    <span><b>Pronouns:</b> <AwaitHtml htmlPromise={parseMarkdown(getPronouns(member), { embed: true })} useTwemoji={true} /></span>
                {/if}
            </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <button class="button" style="width: auto;" on:click={() => changeTheme(theme)}>Theme</button>
            <span style="align-self: center;">(<a href={`/s/${member.system}?${$page.url.searchParams.toString()}`}>Back to system</a>)</span>
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
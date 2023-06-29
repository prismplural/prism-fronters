<script lang="ts">
    import type { Member } from '$lib/types';
    import { convertToHTML } from '$lib/functions/strings/common';
    import { getBirthday, getPronouns, getDescription, getColor, getBanner, getAvatar, getProxyTags, getCreated } from '$lib/functions/strings/member';

    export let member: Member;
    export let linkParams: string[];
</script>

<div class="container pk" style={`border-left: 5px solid #${member.color}`}>
    <div class="info">
        <span class="title" style="margin-bottom: 0.5rem;">
            {#if getAvatar(member, true)}
                <img alt="Member icon" class="icon" src={getAvatar(member, true)} />
            {/if}
            {member.name}
        </span>
        <div class="row" style="margin-bottom: 1rem;">
            {#if member.display_name}
                <div class="col">
                    <span class="title">Display Name</span>
                    <span>{@html convertToHTML(member.display_name)}</span>
                </div>
            {/if}
            {#if member.birthday}
                <div class="col">
                    <span class="title">Birthdate</span>
                    <span>{getBirthday(member)}</span>
                </div>
            {/if}
            {#if member.pronouns}
                <div class="col">
                    <span class="title">Pronouns</span>
                    <span>{@html convertToHTML(getPronouns(member))}</span>
                </div>
            {/if}
            {#if member.proxy_tags && member.proxy_tags.length > 0}
                <div class="col">
                    <span class="title">Proxy Tags</span>
                    <span>{@html convertToHTML(getProxyTags(member))}</span>
                </div>
            {/if}
            {#if member.color}
                <div class="col">
                    <span class="title">Color</span>
                    <span>#{member.color}</span>
                </div>
            {/if}
        </div>
        {#if member.description}
            <span class="title">Description</span>
            <div class="description" style="margin-bottom: 0.5rem;">
                {@html convertToHTML(getDescription(member))}
            </div>
        {/if}
    </div>
    {#if getAvatar(member)}
        <div class="avatar-wrapper">
            <img alt="Member avatar" class="avatar" src={getAvatar(member)}/>
        </div>
    {/if}
    {#if member.banner}
        <img class="banner" alt="Member banner" src={getBanner(member)} style="margin-bottom: 0.5rem;" />
    {/if}
    <div class="footer">
        <span>
        {#if member.system}
            System ID: <a href={`/s/${member.system}${linkParams.length > 0 ? `?${linkParams.join("&")}` : ""}`}>{member.system}</a> |
        {/if} Member ID: <a href={`/m/${member.id}/${linkParams.length > 0 ? `?${linkParams.join("&")}` : ""}`}>{member.id}</a> 
        {#if member.created}
            | Created on {getCreated(member, true)}
        {/if}
        </span>
    </div>
</div>
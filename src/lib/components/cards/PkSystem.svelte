<script lang="ts">
    import type { System } from '$lib/types';
    import { convertToHTML } from '$lib/functions/strings/common';
    import { getBanner, getIcon, getDescription, getCreated, getName, getPronouns } from '$lib/functions/strings/system';

    export let system: System;
    export let front: any = undefined;
</script>

<div class="container pk" style={`border-left: 5px solid #${system.color}`}>
    <div class="info">
        {#if system.name}
        <span class="title" style="margin-bottom: 0.5rem;">
            {@html convertToHTML(getName(system))}
        </span>
        {/if}
        {#if front && front.members && front.members.length > 0}
            <span class="title"><span>Fronters (<a href={`/f/${system.id}?l=pk`}>view</a>)</span></span>
            <span style="margin-bottom: 0.5rem;">
                {#each front.members as member, index}
                {member.name}{#if index !== front.members.length - 1},{" "}{/if}
                {/each}
            </span>
        {/if}
        <div class="row" style="margin-bottom: 1rem;">
            {#if system.tag}
                <div class="col">
                    <span class="title">Tag</span>
                    <span>{@html convertToHTML(system.tag)}</span>
                </div>
            {/if}
            {#if system.pronouns}
                <div class="col">
                    <span class="title">Pronouns</span>
                    <span>{@html convertToHTML(getPronouns(system))}</span>
                </div>
            {/if}
            {#if system.color}
                <div class="col">
                    <span class="title">Color</span>
                    <span>#{system.color}</span>
                </div>
            {/if}
            <div class="col">
                <span class="title">Members</span>
                <span>(See <a href={`/s/${system.id}/m?l=pk`} >this page</a>)</span>
            </div>
        </div>
        {#if system.description}
            <span class="title">Description</span>
            <div class="description" style="margin-bottom: 0.5rem;">
                {@html convertToHTML(getDescription(system))}
            </div>
        {/if}
    </div>
    {#if getIcon(system)}
        <div class="avatar-wrapper">
            <img alt="System avatar" class="avatar" src={getIcon(system)}/>
        </div>
    {/if}
    {#if system.banner}
        <img class="banner" alt="Member banner" src={getBanner(system)} style="margin-bottom: 0.5rem;" />
    {/if}
    <div class="footer">
        <span>System ID: {system.id}
        {#if system.created}
            | Created on {getCreated(system, true)}
        {/if}
        </span>
    </div>
</div>
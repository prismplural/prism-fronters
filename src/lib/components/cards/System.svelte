<script lang="ts">
    import type { System, Front } from '$lib/types';
    import theme from '$lib/functions/store/theme';

    import changeTheme from '$lib/functions/misc';
    import { convertToHTML } from '$lib/functions/strings/common';
    import { getPronouns, getDescription, getColor, getBanner, getName, getIcon } from '$lib/functions/strings/system';

    export let system: System;
    export let front: Front;
    export let linkParams: string[];
</script>

<div class="container member">
    <section class="side">
        <div class="top">
            {#if getIcon(system)}
            <img class="avatar" src={getIcon(system)} alt={`${getName(system)}'s avatar`}>
            {/if}
            <div class="info">
                {#if getName(system)}
                <h3>{getName(system)}</h3>
                <hr/>
                {/if}
                {#if getPronouns(system)}
                    <span><b>Pronouns:</b> {@html convertToHTML(getPronouns(system))}</span>
                {/if}
                {#if front.members && front.members.length > 0}
                    <span><b>Fronting:</b>
                    {#each front.members as m, index}
                        {#if index > 0}
                        , 
                        {/if}
                        {m.name}
                    {/each} 
                    (<a href={`/f/${system.id}${linkParams.length > 0 ? `?${linkParams.join("&")}` : ""}`}>view</a>)</span>
                {/if}
            </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <button class="button" style="width: auto;" on:click={() => changeTheme(theme)}>Theme</button>
            <span style="align-self: center;">(<a href={`/s/${system.id}/m${linkParams.length > 0 ? `?${linkParams.join("&")}` : ""}`}>Member list</a>)</span>
        </div>
    </section>
    <div class="content">
    {#if getDescription(system)}
    <main class="desc" style={getBanner(system) && getColor(system) ? `border-left: 4px solid ${getColor(system)}` : ""}>
            <div>
                {@html convertToHTML(getDescription(system))} 
            </div>
    </main>
    {/if}
    {#if getBanner(system)}
    <div class="banner">
        <img src={getBanner(system)} alt={`${getName(system)}'s banner`}/>
    </div>
    {:else if getColor(system)}
    <div class="banner" style={`background-color: ${getColor(system)}`}></div>
    {/if}
    </div>
</div>
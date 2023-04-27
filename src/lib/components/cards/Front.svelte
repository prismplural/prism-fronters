<script lang="ts">
    import type { Member } from "$lib/types";
    import { convertToHTML } from '$lib/functions/strings/common'
    import { getName, getPronouns, getAvatar, getColor } from '$lib/functions/strings/member'

    export let member: Member;
    export let system = false;

    let name = member.name ?? member.id;

</script>
<a class="front link" href={system? `/f/${member.id}` : `/m/${member.id}`} >
    <div class="card front" style={getColor(member) ? `border-bottom: 4px solid ${getColor(member)};` : ""}>
        {#if getAvatar(member)}
        <img class="avatar" style="width: 100%; aspect-ratio: 1 / 1;" src={getAvatar(member, true)} alt={`${name}'s avatar`}>
        {/if}
        <div class="desc">
            <h3 class="name">{@html convertToHTML(name)}</h3>
            {#if getPronouns(member)}
            <span class="pronouns">{@html convertToHTML(getPronouns(member))}</span>
            {/if}
        </div>
    </div>
</a>

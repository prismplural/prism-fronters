<script lang="ts">
  import type { Member } from "$lib/types"
  import { getPronouns, getAvatar, getColor } from "$lib/functions/strings/member"
  import AwaitHtml from "../AwaitHtml.svelte"
  import parseMarkdown from "$lib/functions/parseMarkdown"
  import { page } from "$app/stores"

  export let member: Member
  export let system = false

  let name = member.name ?? member.id
  const useProxyAvatar = $page.url.searchParams.get("pl") ? true : false
</script>

<a
  class="front link"
  href={`${system ? `/s/${member.id}` : `/m/${member.id}`}?${$page.url.searchParams.toString()}`}
>
  <div
    class="card front"
    style={getColor(member) ? `border-bottom: 4px solid ${getColor(member)};` : ""}
  >
    {#if getAvatar(member, useProxyAvatar)}
      <img
        class="avatar"
        style="width: 100%; aspect-ratio: 1 / 1;"
        src={getAvatar(member, useProxyAvatar)}
        alt={`${name}'s avatar`}
      />
    {/if}
    <div class="desc">
      <h3 class="name">
        <AwaitHtml
          htmlPromise={new Promise((res) =>
            res(
              $page.url.searchParams.get("dn") && member.display_name ? member.display_name : name
            )
          )}
          useTwemoji={true}
        />
      </h3>
      {#if getPronouns(member) && !$page.url.searchParams.get("prns")}
        <hr />
        <span class="pronouns"
          ><AwaitHtml
            htmlPromise={parseMarkdown(getPronouns(member), { embed: true })}
            useTwemoji={true}
          /></span
        >
      {/if}
    </div>
  </div>
</a>

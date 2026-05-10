<script lang="ts">
  import { onMount } from "svelte"
  import EmptyState from "$lib/components/prism/EmptyState.svelte"
  import FronterCard from "$lib/components/prism/FronterCard.svelte"
  import MemberAvatar from "$lib/components/prism/MemberAvatar.svelte"
  import PrismChip from "$lib/components/prism/PrismChip.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"
  import {
    buildFrontEmbedDescription,
    getAvatar as getMemberAvatar,
    getColor as getMemberColor,
  } from "$lib/functions/strings/member"
  import {
    buildFrontEmbedTitle,
    buildFrontPageTitle,
    getColor as getSystemColor,
    getIcon,
    getName,
  } from "$lib/functions/strings/system"
  import type { PageData } from "./$types"

  export let data: PageData

  let useLocalTimes = false
  let now: number | null = null

  onMount(() => {
    useLocalTimes = true
    now = Date.now()

    const timer = window.setInterval(() => {
      now = Date.now()
    }, 60000)

    return () => window.clearInterval(timer)
  })

  function formatSwitchTime(timestamp: string) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
    if (!useLocalTimes) options.timeZone = "UTC"

    return new Intl.DateTimeFormat("en-US", options).format(new Date(timestamp))
  }

  function formatDuration(start: string, end: string | number | null) {
    if (end === null) return "Ongoing"

    const startTime = new Date(start).getTime()
    const endTime = typeof end === "number" ? end : new Date(end).getTime()

    if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) return "Unknown"
    const elapsed = endTime - startTime
    if (elapsed <= 0) return "Unknown"

    const totalMinutes = Math.floor(elapsed / 60000)
    const minutes = totalMinutes % 60
    const totalHours = Math.floor(totalMinutes / 60)
    const hours = totalHours % 24
    const days = Math.floor(totalHours / 24)

    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  function memberLabel(memberId: string) {
    const member = data.memberMap[memberId]
    return member ? member.display_name || member.name : memberId
  }

  function switchLabel(memberIds: string[]) {
    if (memberIds.length === 0) return "No fronters"
    return memberIds.map(memberLabel).join(", ")
  }

  $: members = data.front.members ?? []
  $: systemName = getName(data.system)
  $: systemColor = getSystemColor(data.system) || "var(--prism-purple)"
  $: countLabel =
    members.length === 0
      ? "No public fronters"
      : members.length === 1
        ? "1 member fronting"
        : `${members.length} members fronting`
  $: recentSwitches = [...data.switches].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
</script>

<PrismShell>
  <div class="page-stack">
    <section class="hero-panel">
      <div class="status-header">
        <MemberAvatar src={getIcon(data.system)} name={systemName} color={systemColor} size="lg" />
        <div class="status-header-main">
          <p class="page-kicker">System</p>
          <h1>{systemName}</h1>
          <div class="status-meta">
            <PrismChip tone="accent" color={systemColor}>{countLabel}</PrismChip>
            <PrismChip>System {data.system.id}</PrismChip>
            <PrismChip tone="success">PluralKit sync</PrismChip>
            <a class="prism-button subtle compact" href={`/f/${data.system.id}`}>Refresh</a>
          </div>
        </div>
      </div>
    </section>

    {#if members.length > 0}
      <div class="fronter-grid">
        {#each members as member}
          <FronterCard {member} />
        {/each}
      </div>
    {:else}
      <EmptyState title="No public fronters right now" icon="ph-moon-stars">
        This system may have no active front, or its current front may not be public.
      </EmptyState>
    {/if}

    <section class="history-panel">
      <div class="history-heading">
        <div>
          <p class="section-kicker">Recent history</p>
          <h2>Recent fronting history</h2>
        </div>
        <PrismChip>{recentSwitches.length} switches</PrismChip>
      </div>

      {#if recentSwitches.length > 0}
        <div class="history-list">
          {#each recentSwitches as switchEntry, index}
            {@const sessionStart = switchEntry.timestamp}
            {@const sessionEnd = index > 0 ? recentSwitches[index - 1].timestamp : null}
            <article class="history-row">
              <div class="history-members">
                <div class="history-member-copy">
                  <strong>{switchLabel(switchEntry.members)}</strong>
                  <div class="history-inline-meta">
                    <time datetime={sessionStart}>{formatSwitchTime(sessionStart)}</time>
                    <span>{sessionEnd ? formatSwitchTime(sessionEnd) : "Ongoing"}</span>
                    <span>{formatDuration(sessionStart, sessionEnd ?? now)}</span>
                  </div>
                </div>
                <div class="avatar-stack" aria-label="Fronters for this switch">
                  {#each switchEntry.members.slice(0, 5) as memberId}
                    {@const member = data.memberMap[memberId]}
                    <MemberAvatar
                      src={member ? getMemberAvatar(member) : ""}
                      name={memberLabel(memberId)}
                      color={member
                        ? getMemberColor(member) || "var(--prism-purple)"
                        : "var(--prism-purple)"}
                      size="sm"
                    />
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      {:else if data.historyUnavailable}
        <EmptyState title="History is not public" icon="ph-eye-slash">
          Recent switch history is not available from PluralKit for this system.
        </EmptyState>
      {:else}
        <EmptyState title="No recent history" icon="ph-moon-stars">
          PluralKit did not return any recent switches for this system.
        </EmptyState>
      {/if}
    </section>
  </div>
</PrismShell>

<svelte:head>
  <title>{buildFrontPageTitle(data.system)} | Prism Fronters</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content={buildFrontEmbedTitle(data.system)} />
  <meta property="og:description" content={buildFrontEmbedDescription(members)} />
  <meta property="og:image" content={members.length > 0 ? getMemberAvatar(members[0]) : ""} />
  <meta
    name="theme-color"
    content={members.length > 0 ? getMemberColor(members[0], true) : "#B498C2"}
  />
  <meta name="robots" content="noindex" />
</svelte:head>

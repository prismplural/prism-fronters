<script lang="ts">
  import InfoBanner from "$lib/components/prism/InfoBanner.svelte"
  import PrismButton from "$lib/components/prism/PrismButton.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"

  const steps = [
    {
      kicker: "Prism",
      title: "Connect PluralKit",
      icon: "ph-key",
      commands: [],
      items: [
        "Open the Prism app, not Prism Fronters, and go to Settings > Import & Export > PluralKit.",
        'DM the PluralKit bot on Discord with "pk;token".',
        "Paste the token into Prism's PluralKit Token field, then choose Connect. Prism Fronters itself never asks for this token.",
      ],
    },
    {
      kicker: "Sync",
      title: "Send front changes to PluralKit",
      icon: "ph-arrows-clockwise",
      commands: [],
      items: [
        "In Sync Direction, choose Push if Prism should write to PluralKit, or Both if you also want Prism to pull recent PluralKit changes.",
        "Use Live Fronts Only if you only want current and new front changes synced.",
        "Run Sync Recent Changes once, then enable auto-sync if you want Prism to keep sending changes while it is open.",
      ],
    },
    {
      kicker: "Privacy",
      title: "Make current front visible",
      icon: "ph-lock-key",
      commands: ["pk;system privacy", "pk;system privacy fronter public"],
      items: [
        "Run these commands in a Discord DM with PluralKit, or in a bot channel where you are comfortable seeing the response.",
        "The first command shows your current privacy settings. The second makes current fronter visible through PluralKit's public API.",
        "This is the only privacy setting Prism Fronters needs to show the current front. If current fronter is private, the dashboard cannot load that front.",
        'PluralKit also supports "pk;system privacy all public", but that exposes unrelated system fields too. Prism Fronters does not need it.',
      ],
    },
    {
      kicker: "Recommended",
      title: "Enable recent history",
      icon: "ph-alarm",
      commands: ["pk;system privacy fronthistory public"],
      items: [
        "Run this if you want the Recent fronting history section to show switch rows.",
        "You can skip it if you only want the current front visible.",
        "When front history is private, Prism Fronters still loads the current front and shows a private-history empty state.",
      ],
    },
    {
      kicker: "Optional",
      title: "Fix missing member details",
      icon: "ph-users-three",
      commands: [
        "pk;member <member> privacy",
        "pk;member <member> privacy name public",
        "pk;member <member> privacy pronouns public",
        "pk;member <member> privacy avatar public",
      ],
      items: [
        "Skip this unless a member's name, pronouns, or avatar looks missing on the dashboard.",
        "PluralKit privacy commands for member details apply to one member at a time. Use the member's name or short ID in place of <member>.",
        "You can leave member details private; Prism Fronters can still show fronting state and history timing.",
      ],
    },
    {
      kicker: "Dashboard",
      title: "Copy your system ID",
      icon: "ph-book-open-text",
      commands: ["pk;system id"],
      items: [
        "Run the command in Discord or copy the ID from your PluralKit system page.",
        "Use the short 5 or 6 character system ID.",
        "Paste that ID into Prism Fronters, then share the resulting /f link.",
      ],
    },
  ]

  const checks = [
    "If the dashboard says the front is private, check PluralKit front privacy.",
    "If history is empty, check switch history privacy and run a Prism sync.",
    "If members look out of date, rerun member mapping in Prism before syncing again.",
  ]
</script>

<PrismShell pageClass="narrow">
  <div class="page-stack">
    <section class="hero-panel">
      <div class="hero-content">
        <p class="page-kicker">Setup tutorial</p>
        <h1 class="page-title small">Use Prism fronts in Prism Fronters</h1>
        <p class="page-copy">
          Prism syncs your fronting data to PluralKit. Prism Fronters reads the public PluralKit
          front and switch history for the system ID you enter.
        </p>
        <div class="hero-actions">
          <PrismButton href="/" variant="subtle" size="compact">
            <span class="ph-duotone ph-house" aria-hidden="true"></span>
            Back to lookup
          </PrismButton>
        </div>
      </div>
    </section>

    <section class="tutorial-list" aria-label="Setup steps">
      {#each steps as step, index}
        <article class="tutorial-step prism-surface">
          <div class="tutorial-step-heading">
            <span class="tutorial-step-number" aria-hidden="true">{index + 1}</span>
            <span class="tutorial-step-icon" aria-hidden="true">
              <span class={`ph-duotone ${step.icon}`}></span>
            </span>
            <div>
              <p class="section-kicker">{step.kicker}</p>
              <h2>{step.title}</h2>
            </div>
          </div>

          <ul class="tutorial-points">
            {#each step.items as item}
              <li>{item}</li>
            {/each}
          </ul>

          {#if step.commands.length}
            <pre class="tutorial-command-block"><code>{step.commands.join("\n")}</code></pre>
          {/if}
        </article>
      {/each}
    </section>

    <InfoBanner title="Privacy boundary" icon="ph-shield-check">
      Prism Fronters never asks for a PluralKit token. It can only display data that PluralKit
      already exposes publicly for the system ID. See PluralKit's
      <a href="https://pluralkit.me/guide/#privacy" target="_blank" rel="noreferrer">
        privacy guide
      </a>
      for the full list of privacy subjects.
    </InfoBanner>

    <section class="prism-surface tutorial-checklist">
      <p class="section-kicker">Quick checks</p>
      <h2>Troubleshooting</h2>
      <ul class="tutorial-points">
        {#each checks as check}
          <li>{check}</li>
        {/each}
      </ul>
    </section>
  </div>
</PrismShell>

<svelte:head>
  <title>Setup Tutorial | Prism Fronters</title>
  <meta
    name="description"
    content="Set up PluralKit sync in Prism and find the system ID to use with Prism Fronters."
  />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Setup Tutorial | Prism Fronters" />
  <meta
    property="og:description"
    content="Set up PluralKit sync in Prism and find the system ID to use with Prism Fronters."
  />
  <meta property="og:image" content="/favicon.jpg" />
  <meta name="theme-color" content="#B498C2" />
</svelte:head>

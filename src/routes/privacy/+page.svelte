<script lang="ts">
  import InfoBanner from "$lib/components/prism/InfoBanner.svelte"
  import PrismButton from "$lib/components/prism/PrismButton.svelte"
  import PrismShell from "$lib/components/prism/PrismShell.svelte"
</script>

<PrismShell pageClass="narrow">
  <div class="page-stack">
    <section class="hero-panel">
      <div class="hero-content">
        <p class="page-kicker">Privacy</p>
        <h1 class="page-title small">Privacy Policy</h1>
        <p class="page-copy">
          Prism Fronters is a public PluralKit dashboard. It does not have accounts, Discord login,
          analytics, ads, or PluralKit token storage.
        </p>
        <div class="hero-actions">
          <PrismButton href="/" variant="subtle" size="compact">
            <span class="ph-duotone ph-house" aria-hidden="true"></span>
            Back to lookup
          </PrismButton>
        </div>
      </div>
    </section>

    <section class="policy-section prism-surface">
      <p class="section-kicker">Last updated</p>
      <h2>May 10, 2026</h2>
      <p>
        This page explains what Prism Fronters processes when someone views a public front page.
      </p>
    </section>

    <section class="policy-section prism-surface">
      <p class="section-kicker">Data We Process</p>
      <h2>PluralKit dashboard lookups</h2>
      <p>
        When you enter a PluralKit system ID or open a <code>/f</code> dashboard URL, Prism Fronters requests
        public PluralKit API responses for that system, current fronters, recent switches, and member
        records needed to render those rows.
      </p>
      <p>
        Those requests include the PluralKit system ID and, when history is public, member IDs in
        API request URLs. Prism Fronters does not ask for or store PluralKit API tokens.
      </p>
      <p>
        For some third-party avatar URLs, Prism Fronters may request the image server-side and serve
        it from this site. If the remote avatar host blocks or removes the image, Prism Fronters
        serves a generic avatar fallback instead.
      </p>
    </section>

    <section class="policy-section prism-surface">
      <p class="section-kicker">Storage</p>
      <h2>What we keep</h2>
      <p>
        Prism Fronters does not intentionally save PluralKit API responses in an application
        database. The service may process ordinary web server metadata needed to serve and protect
        the site, such as IP address, request path, user agent, and timestamp.
      </p>
      <p>
        Your theme preference is stored in your browser's localStorage under the
        <code>prism-fronters-theme</code> key. It is not sent to Prism Fronters as an account setting.
      </p>
    </section>

    <section class="policy-section prism-surface">
      <p class="section-kicker">Sharing</p>
      <h2>PluralKit and public data</h2>
      <p>
        Prism Fronters displays public PluralKit data returned by PluralKit. PluralKit receives API
        requests needed to render dashboard pages. Prism Fronters does not sell personal
        information, run ads, or add third-party analytics.
      </p>
      <p>
        To change what appears here, update your PluralKit privacy settings. Once PluralKit stops
        returning a field publicly, Prism Fronters cannot display it.
      </p>
    </section>

    <InfoBanner title="Privacy controls live in PluralKit" icon="ph-shield-check">
      Prism Fronters mirrors public PluralKit API responses. Use PluralKit's
      <a href="https://pluralkit.me/guide/#privacy" target="_blank" rel="noreferrer">
        privacy settings
      </a>
      to control whether current front, front history, and member details are public.
    </InfoBanner>

    <section class="policy-section prism-surface">
      <p class="section-kicker">Contact</p>
      <h2>Questions or removal concerns</h2>
      <p>
        For stale display or site behavior issues, use the Prism Fronters GitHub repository. For
        PluralKit source data, change the relevant PluralKit privacy setting or remove the data in
        PluralKit.
      </p>
      <div class="hero-actions">
        <PrismButton
          href="https://github.com/prismplural/prism-fronters"
          target="_blank"
          variant="subtle"
          size="compact"
        >
          <span class="ph-duotone ph-code" aria-hidden="true"></span>
          Source on GitHub
        </PrismButton>
      </div>
    </section>
  </div>
</PrismShell>

<svelte:head>
  <title>Privacy Policy | Prism Fronters</title>
  <meta
    name="description"
    content="Privacy Policy for Prism Fronters, a public PluralKit dashboard."
  />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Privacy Policy | Prism Fronters" />
  <meta
    property="og:description"
    content="Privacy Policy for Prism Fronters, a public PluralKit dashboard."
  />
  <meta property="og:image" content="/favicon.jpg" />
  <meta name="theme-color" content="#B498C2" />
</svelte:head>

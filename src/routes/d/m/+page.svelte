<script lang="ts">
  let mid = "iyhda"

  let gotoUrl = `../m/${mid}/d`
  let visibleUrl = `https://pluralkit.xyz/m/${mid}/d`

  // options time
  let theme = "dark"
  let groupshow = "y"
  let showNote = false
  let showJoin = false
  let showGroups = false
  let hideBanner = false
  let hideDesc = false
  let descCutoff = null
  let useNitro = false
  let primaryColor: string | null = null
  let secondaryColor: string | null = null
  let bannerColor: string | null = null

  $: if (
    theme ||
    groupshow ||
    showNote ||
    showJoin ||
    showGroups ||
    hideBanner ||
    hideDesc ||
    descCutoff ||
    useNitro ||
    primaryColor ||
    secondaryColor ||
    bannerColor
  ) {
    generateUrl(mid)
  }

  function updateMid(value) {
    mid = value ? value : "iyhda"
    generateUrl(mid)
  }

  async function generateUrl(mid: string) {
    let querystring = ""
    let params: string[] = []

    if (theme !== "dark") params.push("t=" + theme)
    if (showGroups === true) params.push("g=" + groupshow)
    if (showNote === true) params.push("n=show")
    if (showJoin === true) params.push("j=show")
    if (hideBanner === true) params.push("b=hide")
    if (hideDesc === true) params.push("c=hide")
    else if (descCutoff) params.push("c=" + descCutoff)
    if (useNitro === true) params.push("d=nitro")
    if (primaryColor)
      params.push(
        primaryColor.startsWith("#")
          ? `pc=${primaryColor.slice(1, primaryColor.length)}`
          : `pc=${primaryColor}`
      )
    if (secondaryColor)
      params.push(
        secondaryColor.startsWith("#")
          ? `sc=${secondaryColor.slice(1, secondaryColor.length)}`
          : `sc=${secondaryColor}`
      )
    if (bannerColor)
      params.push(
        bannerColor.startsWith("#")
          ? `bc=${bannerColor.slice(1, bannerColor.length)}`
          : `bc=${bannerColor}`
      )

    if (params.length > 0) {
      querystring += "?"
      querystring += params.shift()
      if (params.length > 0) {
        querystring += "&"
        querystring += params.join("&")
      }
    }

    gotoUrl = `../m/${mid}/d${querystring}`
    visibleUrl = `https://pluralkit.xyz/m/${mid}/d${querystring}`

    params = []
    querystring = ""
  }
</script>

<main class="container info">
  <h1>Fake Discord Member Profile</h1>
  <span>(Javascript required)</span>
  <section class="content">
    <div class="row">
      <input style="flex: 1;" readonly value={visibleUrl} />
      <a class="button" href={gotoUrl} target="_blank" rel="noreferrer">View</a>
    </div>
    <label for="d-mid">Enter a member id to generate a fake Discord profile for that member.</label>
    <div class="row" style="margin-bottom: 1rem;">
      <input
        required
        id="d-mid"
        name="mid"
        placeholder="member id..."
        on:input={(event) => updateMid(event.target?.value)}
      />
    </div>
    <div class="row" style="margin-bottom: 0.5rem;">
      <label for="d-theme">Card theme</label>
      <select id="d-theme" name="theme" bind:value={theme}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
    <hr style="width: 100%;" />
    <h2>Show optional sections</h2>
    <div class="row" style="align-items: center;">
      <label for="d-prns">Show note (pronouns)</label>
      <input type="checkbox" id="d-prns" name="prns" bind:checked={showNote} />
    </div>
    <div class="row" style="align-items: center;">
      <label for="d-join">Show join date (birthday/created)</label>
      <input type="checkbox" id="d-join" name="join" bind:checked={showJoin} />
    </div>
    <div class="row" style="align-items: center; margin-bottom: 1rem;">
      <label for="d-group">Show roles (groups)</label>
      <input type="checkbox" id="d-group" name="group" bind:checked={showGroups} />
    </div>
    <hr style="width: 100%;" />
    <h2>Hide certain sections</h2>
    <div class="row" style="align-items: center;">
      <label for="d-desc">Hide about me (description)</label>
      <input type="checkbox" id="d-desc" name="desc" bind:checked={hideDesc} />
    </div>
    <div class="row" style="align-items: center; margin-bottom: 1rem;">
      <label for="d-banner">Hide banner</label>
      <input type="checkbox" id="d-banner" name="banner" bind:checked={hideBanner} />
    </div>
    <hr style="width: 100%;" />
    <h2>Misc options</h2>
    <div class="row" style="align-items: center;">
      <label for="d-nitro">Use Nitro gradient</label>
      <input type="checkbox" id="d-nitro" name="nitro" bind:checked={useNitro} />
    </div>
    <details style="width:100%; margin:1rem;">
      <summary>Show color options</summary>
      <div class="row" style="margin: 0.5rem;">
        <input id="d-pc" name="pc" placeholder="primary hex color..." bind:value={primaryColor} />
        <input
          id="d-sc"
          name="sc"
          placeholder="secondary hex color..."
          bind:value={secondaryColor}
        />
        <input id="d-bc" name="bc" placeholder="banner hex color..." bind:value={bannerColor} />
      </div>
    </details>
    <br />
    <div class="row" style="margin: 1rem;">
      <label for="d-cut">Cut description off after [x] lines</label>
      <input
        id="d-cut"
        name="cut"
        type="number"
        on:input={() => generateUrl(mid)}
        bind:value={descCutoff}
      />
    </div>
    <div class="row" style="margin-bottom: 0.5rem;">
      <label for="d-groupshow">Show groups with newlines in the name as...</label>
      <select id="d-groupshow" name="groupshow" bind:value={groupshow}>
        <option value="y">Inline / normal</option>
        <option value="hide">Hide / don't show</option>
        <option value="full">Full width (dividers)</option>
      </select>
    </div>
    <br />
    <hr style="width: 100%;" />
    <span>(<a href="/">Back to home</a>)</span>
  </section>
</main>

<svelte:head>
  <title>Home | pluralkit.xyz</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Fulmine | PluralKit" />
  <meta
    property="og:description"
    content="A small website that lets you view some PluralKit data."
  />
  <meta property="og:url" content="https://pluralkit.xyz" />
  <meta property="og:image" content="/favicon.png" />
  <meta name="theme-color" content="#ffffff" />
</svelte:head>

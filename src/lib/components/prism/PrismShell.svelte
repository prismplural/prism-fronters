<script lang="ts">
  import { page } from "$app/stores"
  export let pageClass = ""
  $: pathname = $page.url.pathname
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>

<div class="prism-shell">
  <header class="prism-topbar">
    <a class="prism-wordmark" href="/" aria-label="Prism Fronters home">
      Prism <span>Fronters</span>
    </a>

    <a
      class="prism-topbar-link"
      href="/tutorial"
      aria-current={pathname === "/tutorial" ? "page" : undefined}
    >
      <span class="ph-duotone ph-book-open-text" aria-hidden="true"></span>
      Setup tutorial
    </a>
  </header>

  <main id="main-content" class={`prism-page ${pageClass}`}>
    <slot />
  </main>

  <footer class="prism-footer">
    <nav aria-label="Footer links">
      <a href="https://prismplural.com" target="_blank" rel="noreferrer">Learn about Prism</a>
      <a href="/privacy" aria-current={pathname === "/privacy" ? "page" : undefined}>Privacy</a>
      <a href="https://github.com/prismplural/prism-fronters" target="_blank" rel="noreferrer">
        Source on GitHub
      </a>
    </nav>
  </footer>
</div>

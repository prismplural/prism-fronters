<script lang="ts">
  export let pageClass = ""
</script>

<div class="prism-shell">
  <header class="prism-topbar">
    <a class="prism-wordmark" href="/" aria-label="Prism Fronters home">
      Prism <span>Fronters</span>
    </a>

    <a class="prism-topbar-link" href="/tutorial">
      <span class="ph-duotone ph-book-open-text" aria-hidden="true"></span>
      Setup tutorial
    </a>
  </header>

  <main class={`prism-page ${pageClass}`}>
    <slot />
  </main>

  <footer class="prism-footer">
    <nav aria-label="Footer links">
      <a href="https://prismplural.com" target="_blank" rel="noreferrer">Learn about Prism</a>
      <a href="/privacy">Privacy</a>
      <a href="https://github.com/prismplural/prism-fronters" target="_blank" rel="noreferrer">
        Source on GitHub
      </a>
    </nav>
  </footer>
</div>

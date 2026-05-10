<script lang="ts">
  export let pageClass = ""
</script>

<div class="prism-shell">
  <header class="prism-topbar">
    <a class="prism-wordmark" href="/" aria-label="Prism Fronters home">
      Prism <span>Fronters</span>
    </a>
  </header>

  <main class={`prism-page ${pageClass}`}>
    <slot />
  </main>

  <footer class="prism-footer">
    <a href="https://github.com/prismplural/prism-fronters" target="_blank" rel="noreferrer">
      Source on GitHub
    </a>
  </footer>
</div>

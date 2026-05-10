<script lang="ts">
  export let title: string
  export let icon = "ph-moon-stars"
</script>

<section class="empty-state">
  <span class="empty-state-icon" aria-hidden="true">
    <span class={`ph-duotone ${icon}`}></span>
  </span>
  <h2>{title}</h2>
  <p><slot /></p>
</section>

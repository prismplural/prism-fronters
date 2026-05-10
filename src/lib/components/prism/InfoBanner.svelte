<script lang="ts">
  export let title: string
  export let icon = "ph-info"
</script>

<aside class="info-banner">
  <span class="info-banner-icon" aria-hidden="true">
    <span class={`ph-duotone ${icon}`}></span>
  </span>
  <div>
    <h2>{title}</h2>
    <p><slot /></p>
  </div>
</aside>

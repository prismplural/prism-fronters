<script lang="ts">
  import { page } from "$app/stores"

  export let href: string
  let className: string = ""
  export { className as class }
</script>

<a class={className} href={`${href}?${$page.url.searchParams.toString()}`}><slot /></a>

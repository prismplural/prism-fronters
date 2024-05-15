<script lang="ts">
  import NProgress from "nprogress"
  import { setBodyTheme } from "$lib/functions/misc"
  import { navigating } from "$app/stores"
  import "$lib/styles/global.scss"
  import "$lib/styles/github-dark.scss"
  import "$lib/styles/github.scss"

  // NProgress css
  import "nprogress/nprogress.css"

  NProgress.configure({
    // Full list: https://github.com/rstacruz/nprogress#configuration
    minimum: 0.16,
  })

  $: {
    if ($navigating) {
      NProgress.start()
    }
    if (!$navigating) {
      NProgress.done()
    }
  }
</script>

<slot />

<svelte:body use:setBodyTheme />

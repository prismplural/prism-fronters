<script lang="ts">
  import { onMount } from "svelte"
  import NProgress from "nprogress"
  import { setBodyTheme } from "$lib/functions/misc"
  import { navigating } from "$app/stores"
  import "$lib/styles/global.scss"
  import "$lib/styles/github-dark.scss"
  import "$lib/styles/github.scss"
  import "nprogress/nprogress.css"

  let reduceMotion = false

  function applyReduceMotion(match: boolean) {
    reduceMotion = match
    if (match) {
      // Both belt and suspenders: visually disabled by CSS in
      // global.scss (display: none), but also stop trickle so
      // we don't burn CPU on something we're not showing.
      NProgress.configure({ minimum: 0.16, trickle: false, speed: 0 })
    } else {
      NProgress.configure({ minimum: 0.16, trickle: true, speed: 200 })
    }
  }

  onMount(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    applyReduceMotion(mql.matches)
    const onChange = (e: MediaQueryListEvent) => applyReduceMotion(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  })

  $: {
    if ($navigating && !reduceMotion) NProgress.start()
    if (!$navigating) NProgress.done()
  }
</script>

<slot />

<svelte:body use:setBodyTheme />

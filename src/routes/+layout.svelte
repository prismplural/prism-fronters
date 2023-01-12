<script lang="ts">
    import NProgress from 'nprogress';
	import theme from '$lib/functions/store/theme';
	import { navigating } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	const changeTheme = () => {
		if ($theme == "dark") {
			theme.set("light");
		} else if ($theme == "light") {
			theme.set("dark");
		}
		
		setBodyTheme(document.body as HTMLBodyElement);
	}

	function setBodyTheme(body: HTMLBodyElement) {
		body.className = $theme + "-mode";
	}
</script>

<slot/>

<div class="bottom-sticky">
	<button class="button" on:click={() => changeTheme()}>Theme</button>
</div>

<style>
	.bottom-sticky {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 1rem;
	}
</style>

<svelte:body use:setBodyTheme/>
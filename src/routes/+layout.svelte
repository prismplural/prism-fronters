<script lang="ts">
    import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import GlobalStyle from '$lib/styles/global.scss';
	import { setBodyTheme } from '$lib/functions/misc';

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
</script>

<slot/>
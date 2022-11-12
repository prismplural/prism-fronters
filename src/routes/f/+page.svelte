<script lang="ts">
    import { enhance } from '$app/forms';
    import GlobalStyle from '$lib/styles/global.scss';
</script>

<main class="container info">
    <h1>Front</h1>
    <section class="content">
        <label for="front-sid">Enter a system id to view that system's front.</label>
        <form method="POST" use:enhance >
            <div class="row">
                <input required id="front-sid" name="sid" placeholder="system id...">
                <button class="button">View</button>
            </div>
        </form>
    </section>
    <span>(<a href="/">Back to home</a>)</span>
</main>
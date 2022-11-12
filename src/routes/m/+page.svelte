<script lang="ts">
    import { enhance } from '$app/forms';
    import GlobalStyle from '$lib/styles/global.scss';
</script>

<main class="container info">
    <h1>Member</h1>
    <section class="content">
        <label for="front-sid">Enter a member id to view that member.</label>
        <form method="POST" use:enhance >
            <div class="row">
                <input required id="front-mid" name="mid" placeholder="member id...">
                <button class="button">View</button>
            </div>
        </form>
        <span>(<a href="/">Back to home</a>)</span>
    </section>
</main>
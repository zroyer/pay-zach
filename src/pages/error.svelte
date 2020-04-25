<script>
    import { url } from "@sveltech/routify";
</script>

<main>
    <h3>Uh oh, something went wrong...</h3>
    <a href={$url('/index')}>Try again?</a>
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h3 {
		margin-block-start: 0;
	}
</style>
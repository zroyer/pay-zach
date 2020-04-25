<script>
    import { url } from "@sveltech/routify";
</script>

<main>
    <a href={$url('/index')}><h2>Thanks!</h2></a>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    color: #333;
  }
</style>
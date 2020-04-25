<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Form from './routes/Form.svelte';
  import Thanks from './routes/Thanks.svelte';
  import Error from './routes/Error.svelte';

  export let url = '';
</script>

<Router url='{url}'>
  <div>
    <Route path='thanks' component='{Thanks}' />
    <Route path='error' component='{Error}' />
    <Route path='/'><Form /></Route>
  </div>
</Router>

<style>
	:global(body) {
    padding: 0;
  }
	:global(main) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  :global(a) {
    color: #333 !important;
  }
  :global(h2) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
<script>
    import { createEventDispatcher } from "svelte";

    export let displayMode="kiosk";

    const dispatch = createEventDispatcher();

    const reset = () => dispatch("reset");
</script>

<div class="container {displayMode}">
    <a href="." on:click|preventDefault={reset} class="reset">start over</a>
</div>

<style>
    div.container {
        text-align: center;
    }

    a.reset {
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;
        margin: 0 3rem;
        color: #999;
        text-decoration: none;
    }

    div.container.kiosk a.reset {
        font-size: 1.5rem;
    }
</style>

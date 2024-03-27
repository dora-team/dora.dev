<script>
    export let displayMode; // provided by caller

    function startOver() {
        window.location.href = `//${location.host}${location.pathname}?displayMode=${displayMode}`;
    }
</script>

<a href="." on:click|preventDefault={startOver}>start over</a>

<style>
    a, a:visited {
        color:#777;
        display:block;
        text-align: center;
        font-size:1.25rem;
    }
</style>

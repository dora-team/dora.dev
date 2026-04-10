<script lang="ts">
    let fullscreen = $state(false);

    const fullscreen_icon = $derived(fullscreen ? 'fullscreen_exit' : 'fullscreen');

    function toggleFullScreen() {
        if (!fullscreen && !document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreen = true;
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreen = false;
        }
    }
</script>

{#if typeof document !== 'undefined' && document.fullscreenEnabled}
<button
    class="google-material-icons"
    id="fullscreen_container"
    onclick={toggleFullScreen}
    aria-label={fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
>
    {fullscreen_icon}
</button>
{/if}

<style>
    #fullscreen_container {
        display: block;
        padding: 1rem;
        position: fixed;
        top: .5rem;
        right: .5rem;
        z-index: 1000;
        background: none;
        border: none;
        font-family: inherit;
    }

    .google-material-icons {
        color: #999;
        cursor: pointer;
    }
</style>

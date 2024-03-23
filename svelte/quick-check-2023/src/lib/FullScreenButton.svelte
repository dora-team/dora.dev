<script>
    let fullscreen = false;

    let fullscreen_modes = {
        false: "fullscreen_exit",
        true: "fullscreen",
    };

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

{#if document.fullscreenEnabled}
<span
    class="google-material-icons"
    id="fullscreen_container"
    on:click={() => {
        toggleFullScreen();
    }}>{fullscreen_modes[!fullscreen]}</span
>
{/if}

<style>
    #fullscreen_container {
        display: block;
        padding: 1rem;
        position: fixed;
        top: .5rem;
        right: .5rem;
        z-index: 1000;
    }

    .google-material-icons {
        color: #999;
        cursor: pointer;
    }
</style>

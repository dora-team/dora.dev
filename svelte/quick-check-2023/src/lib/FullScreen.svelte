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
            fullscreen=false;
        }
    }
</script>

<span
    class="google-material-icons"
    id="fullscreen_container"
    on:click={() => {
        toggleFullScreen();
    }}>{fullscreen_modes[!fullscreen]}</span
>

{fullscreen_modes[fullscreen]}

<style>
    #fullscreen_container {
        display: block;
        padding: 1rem;
        position: absolute;
        top: 0;
        right: 1rem;
    }

    .google-material-icons {
        color: #999;
        cursor: pointer;
    }
</style>

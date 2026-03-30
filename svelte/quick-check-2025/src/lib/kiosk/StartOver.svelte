<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { onDestroy } from "svelte";

    export let displayMode = "kiosk";

    const TIMER_DURATION_IN_SEC = 90;
    const TIMER_HIDDEN_FOR_SEC = 60;

    let seconds_remaining = TIMER_DURATION_IN_SEC;

    const dispatch = createEventDispatcher();

    let countDownTimer;

    const reset = () => {
        seconds_remaining = TIMER_DURATION_IN_SEC;
        dispatch("reset");
    };

    function countDown() {
        if (seconds_remaining === 1) {
            reset();
        } else {
            seconds_remaining--;
            countDownTimer = setTimeout(countDown, 1000);
        }
    }

    onMount(() => {
        console.log("hi");
        countDown();
    });
    onDestroy(() => {
        clearTimeout(countDownTimer);
    })
</script>

<div class="container {displayMode}">
    <a href="." on:click|preventDefault={reset} class="reset">start over</a>
    <div class="auto-reset"> 
        {#if seconds_remaining <= TIMER_DURATION_IN_SEC - TIMER_HIDDEN_FOR_SEC}
            starting over in {seconds_remaining}s
        {/if}
    </div>
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

    div.auto-reset {
        font-size: 1rem;
        color: #999;
    }

    div.container.kiosk a.reset {
        font-size: 1.5rem;
    }
</style>

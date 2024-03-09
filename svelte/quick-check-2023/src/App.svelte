<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import MetricsQuestions from "./lib/MetricsQuestions.svelte";
    import YourPerformance from "./lib/YourPerformance.svelte";
    import HelpMePrioritize from "./lib/HelpMePrioritize.svelte";
    import GoFurther from "./lib/GoFurther.svelte";
    import { sendAnalyticsEvent } from "./lib/utils.js";

    let metrics = {
        leadtime: -1,
        deployfreq: -1,
        changefailure: -1,
        failurerecovery: -1,
    };
    let step = "input";
    let industry = "all";
    let current_capability = -1;
    let displayMode = "kiosk"; // TODO: return default to "embedded"

    onMount(() => {
        // quick check may be running on a kiosk or tablet, as specified in a meta tag from the calling page
        if (document.getElementsByName("displayMode").length) {
            displayMode = document.getElementsByName("displayMode")[0].content;
        }

        const searchParams = new URLSearchParams(window.location.search);
        for (const metric of [
            "leadtime",
            "deployfreq",
            "changefailure",
            "failurerecovery",
        ]) {
            if (searchParams.has(metric)) {
                metrics[metric] = searchParams.get(metric);
            }
        }

        if (searchParams.has("industry")) {
            industry = searchParams.get("industry");
        }

        if (searchParams.has("step")) {
            step = searchParams.get("step");
            if (step == "priorities") {
                // initialize at the last capability; then that module's onMount will advance to show the scores
                current_capability = 2;
            }
        }

        sendAnalyticsEvent("quick_check_start");

        // TODO: add error handling w/r/t URL params (e.g. if step == "results" but metrics values not present, bounce to input)
    });
</script>

{#if displayMode === "kiosk"}
    <main>
        TODO: implement Kiosk mode
    </main>
{:else}
<main>
    {#if step === "input"}
        <MetricsQuestions bind:metrics bind:step />
    {:else if step === "results" || step === "priorities"}
        <YourPerformance {metrics} bind:industry />
        <HelpMePrioritize bind:current_capability />
    {/if}
    <div class="faq">
        <a href="/faq/#whats-new-in-the-2023-quick-check">Quick Check FAQ</a>
    </div>
    {#if step !== "input"}
        <GoFurther />
    {/if}
</main>
{/if}

<style>
    :global(:root) {
        --dora-blue: #005d8d;
        --performance-spectrum: linear-gradient(
            90deg,
            #e62f23 0%,
            #7a23e6 50%,
            #1785e6 100%
        );
        --std-background: rgba(81, 196, 255, 0.2);
        --metric-background: #999;
        --metric-border: white;
        --user-score-bg: white;
        --border-color-medium: #ccc;
        --border-color-light: #eee;
    }

    /* override page-level styles for padding b/c it causes graphs to be mispositioned */
    :global(body main) {
        padding-left: 0;
        padding-right: 0;
    }

    .faq {
        text-align: center;
        padding-top: 1.5rem;
        font-size: 85%;
    }
</style>

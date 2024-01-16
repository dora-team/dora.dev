<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import MetricsQuestions from "./lib/MetricsQuestions.svelte";
    import Debug from "./lib/Debug.svelte";
    import YourPerformance from "./lib/YourPerformance.svelte";
    import HelpMePrioritize from "./lib/HelpMePrioritize.svelte";

    let metrics = {
        leadtime: -1,
        deployfreq: -1,
        changefailure: -1,
        failurerecovery: -1,
    };
    let step = 1;
    let industry = "all";

    onMount(() => {
        const searchParams = new URLSearchParams(window.location.search);
        ["leadtime", "deployfreq", "changefailure", "failurerecovery"].forEach(
            (metric) => {
                if (searchParams.has(metric)) {
                    metrics[metric] = searchParams.get(metric);
                }
            },
        );

        if (searchParams.has("industry")) {
            industry = searchParams.get("industry");
        }

        if (
            metrics.leadtime > -1 &&
            metrics.deployfreq > -1 &&
            metrics.changefailure > -1 &&
            metrics.failurerecovery > -1
        ) {
            step = 2;
        }
    });
</script>

<main>
    <Debug {step} {metrics} {industry} />

    {#if step === 1}
        <MetricsQuestions bind:metrics bind:step />
    {:else if step === 2}
        <YourPerformance {metrics} bind:industry />
        <HelpMePrioritize />
    {/if}
</main>

<style>
    :global(:root){
       --dora-blue: #005D8D;
       --std-background: rgba(81,196,255,.2);
    }
</style>
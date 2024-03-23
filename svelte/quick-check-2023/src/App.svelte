<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import MetricsQuestion from "./lib/MetricsQuestion.svelte";
    import YourPerformance from "./lib/YourPerformance.svelte";
    import HelpMePrioritize from "./lib/HelpMePrioritize.svelte";
    import GoFurther from "./lib/GoFurther.svelte";
    import { sendAnalyticsEvent } from "./lib/utils.js";
    import FullScreenButton from "./lib/FullScreenButton.svelte";

    let metrics = {
        leadtime: -1,
        deployfreq: -1,
        changefailure: -1,
        failurerecovery: -1,
    };

    let step = "input";
    let industry = "all";
    let current_capability = -1;
    let metric_names = Object.keys(metrics);
    let current_metric = 0; // in kiosk mode, metrics questions are presented one at a time
    let displayMode = "embedded";

    function saveURLParams() {
        if (typeof window !== "undefined") {
            const url = new URL(window.location);
            metric_names.forEach((metric) =>
                url.searchParams.set(metric, metrics[metric]),
            );
            url.searchParams.set("v", "2023");
            window.history.pushState({}, "", url);
        }
    }

    onMount(() => {
        // quick check may be running on a kiosk or tablet, as specified in a meta tag from the calling page
        if (
            document.getElementsByName("displayMode").length &&
            document.getElementsByName("displayMode")[0].content
        ) {
            displayMode = document.getElementsByName("displayMode")[0].content;
            console.log(`displayMode: ${displayMode} provided via <meta> tag`);
        }

        const searchParams = new URLSearchParams(window.location.search);

        // if the metric values are passed on the URL, save them to local vars and advance to results
        if (metric_names.every((metric) => searchParams.has(metric))) {
            metric_names.forEach((metric) => {
                metrics[metric] = searchParams.get(metric);
            });
            step = "results";
        }

        // if the capability alues are passed on the URL, advance to priorities
        // !!!This is a hack using hard-coded values. TODO: make more elegant
        if (
            ["ci", "arch", "culture"].every((param) => searchParams.has(param))
        ) {
            current_capability = 2;
        }

        if (searchParams.has("industry")) {
            industry = searchParams.get("industry");
        }

        sendAnalyticsEvent("quick_check_start");

        // TODO: add error handling w/r/t URL params (e.g. if step == "results" but metrics values not present, bounce to input)
    });

    $: if (current_metric > 3) {
        step = "results";
    }
</script>

<!-- Vite provides environment variables; if running in dev, show some debug -->
{#if typeof import.meta.env.MODE !== "undefined" && import.meta.env.MODE === "development"}
    DisplayMode: {displayMode}<br />
    <label
        ><input
            type="radio"
            name="displayMode"
            value={"embedded"}
            bind:group={displayMode}
        />
        embedded<br /></label
    >
    <label
        ><input
            type="radio"
            name="displayMode"
            bind:group={displayMode}
            value={"kiosk"}
        />
        kiosk<br /></label
    >
{/if}

<!--- END debug -->

{#if displayMode === "kiosk"}
    <FullScreenButton />
{/if}

<div class="quickcheck" class:displayMode>
    {#if displayMode === "kiosk"}
        <div class="kioskMetricsQuestions">
            <aside>
                Take the
                <h1>DORA Quick Check</h1>
            </aside>
            {#if step === "input"}
                {#key current_metric}
                    <MetricsQuestion
                        bind:metrics
                        bind:current_metric
                        metric_name={metric_names[current_metric]}
                        metric_position={current_metric}
                        {displayMode}
                    />
                {/key}
            {:else if step === "results"}
                <div>
                    <YourPerformance {metrics} bind:industry />
                </div>
            {/if}
        </div>
    {:else}
        {#if step === "input"}
            {#each metric_names as metric, idx}
                <MetricsQuestion
                    bind:metrics
                    metric_name={metric}
                    metric_position={idx}
                />
            {/each}
            <section class="submit">
                <button
                    disabled={!metric_names.every(
                        (metric) => metrics[metric] != -1,
                    )}
                    on:click={() => {
                        saveURLParams();
                        step = "results";
                    }}>View Results</button
                >
            </section>
        {:else if step === "results" || step === "priorities"}
            <YourPerformance {metrics} bind:industry />
            <HelpMePrioritize bind:current_capability />
        {/if}
        <div class="faq">
            <a href="/faq/#whats-new-in-the-2023-quick-check">Quick Check FAQ</a
            >
        </div>
        {#if step !== "input"}
            <GoFurther />
        {/if}
    {/if}
</div>

<style lang="scss">
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
    :global(body div.quickcheck) {
        padding-left: 0;
        padding-right: 0;
        position: relative;
    }

    .faq {
        text-align: center;
        padding-top: 1.5rem;
        font-size: 85%;
    }

    section.submit {
        text-align: center;
    }

    .kioskMetricsQuestions {
        display: flex;
        flex-direction: row;

        aside {
            margin: 0rem 2rem;
            border-right: 1px solid #ccd;
            padding-right: 2rem;
        }

        h1 {
            font-size: 7.5rem;
        }
    }

    aside {
        width: 30%;
    }
</style>

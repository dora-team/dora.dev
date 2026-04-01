<script lang="ts">
    import { onMount, tick } from "svelte";
    import MetricsQuestion from "./lib/MetricsQuestion.svelte";
    import YourPerformance from "./lib/YourPerformance.svelte";
    import HelpMePrioritize from "./lib/HelpMePrioritize.svelte";
    import GoFurther from "./lib/GoFurther.svelte";
    import { sendAnalyticsEvent } from "./lib/utils";
    import FullScreenButton from "./lib/kiosk/FullScreenButton.svelte";
    import NextSteps from "./lib/kiosk/NextSteps.svelte";
    import StartOver from "./lib/kiosk/StartOver.svelte";
    import type { Metrics, Step, DisplayMode } from "./lib/types";

    let metrics: Metrics = {
        leadtime: -1,
        deployfreq: -1,
        changefailure: -1,
        failurerecovery: -1,
        rework: -1,
    };

    let step: Step = "input";
    let industry = "all";
    let version = "2025";
    let current_capability = -1;
    let metric_names = Object.keys(metrics).filter(k => k !== 'rework' || true) as (keyof Metrics)[];
    let current_metric = 0; // for kiosk mode
    let displayMode: DisplayMode = "embedded";

    // Adjust metric_names based on version
    $: active_metric_names =
        version === "2025"
            ? (metric_names as string[])
            : (metric_names as string[]).filter((m) => m !== "rework");

    function saveURLParams() {
        if (typeof window !== "undefined" && displayMode === "embedded") {
            const url = new URL(window.location.href);
            active_metric_names.forEach((metric) => {
                if (metrics[metric] !== -1) {
                    url.searchParams.set(metric, metrics[metric].toString());
                } else {
                    url.searchParams.delete(metric);
                }
            });
            url.searchParams.set("v", version);
            window.history.pushState({}, "", url.toString());
        }
    }

    onMount(async () => {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has("v")) {
            version = searchParams.get("v")!;
        }

        // Wait for reactive declaration of active_metric_names to catch up with version change
        // TODO: is this required?
        await tick();

        if (searchParams.has("displayMode")) {
            displayMode = searchParams.get("displayMode") as DisplayMode;
        } else {
            const displayModeMeta = document.getElementsByName("displayMode")[0] as HTMLMetaElement;
            if (displayModeMeta && displayModeMeta.content) {
                displayMode = displayModeMeta.content as DisplayMode;
            }
        }

        // Populate any metrics present in the URL
        metric_names.forEach((metric) => {
            if (searchParams.has(metric as string)) {
                metrics[metric as string] = searchParams.get(metric as string)!;
            }
        });

        // Advance to results ONLY if all active metrics are present
        if (active_metric_names.every((metric) => searchParams.has(metric))) {
            step = "results";
        }

        if (
            ["ci", "arch", "culture"].every((param) => searchParams.has(param))
        ) {
            current_capability = 2;
        }

        if (searchParams.has("industry")) {
            industry = searchParams.get("industry")!;
        }

        sendAnalyticsEvent("quick_check_start");
    });

    function nextMetric() {
        if (displayMode === "kiosk") {
            if (current_metric < active_metric_names.length - 1) {
                current_metric++;
            } else {
                showResults();
            }
        }
    }

    function showResults() {
        saveURLParams();
        step = "results";
    }

    function reset() {
        metric_names.forEach((metric) => {
            metrics[metric as string] = -1;
        });
        step = "input";
        industry = "all";
        current_capability = -1;
        current_metric = 0;
        saveURLParams();
    }
</script>

<!-- Vite provides environment variables; if running in dev, show some debug -->
{#if typeof import.meta.env.MODE !== "undefined" && import.meta.env.MODE === "development"}
    <div
        class="debug"
        style="position:fixed; top:0; right:0; background:rgba(0,0,0,0.8); color:white; padding:1rem; z-index:10000; font-size:10px;"
    >
        DisplayMode: {displayMode}<br />
        Step: {step}<br />
        Version: {version}<br />
        <button
            on:click={() => {
                version = version === "2025" ? "2024" : "2025";
                current_metric = 0;
            }}>Toggle Version</button
        >
    </div>
{/if}

{#if displayMode === "kiosk"}
    <FullScreenButton />
{/if}

<div class="quickcheck {displayMode}">
    {#if step === "input"}
        {#if displayMode === "kiosk"}
            <div class="kioskMetricsQuestions">
                <aside class="kioskAside">
                    Take the
                    <h1>DORA Quick Check</h1>
                    {#if current_metric > 0}
                        <StartOver on:reset={reset} {displayMode} />
                    {/if}
                </aside>
                <div class="questionWrapper">
                    <MetricsQuestion
                        bind:metrics
                        metric_name={active_metric_names[current_metric]}
                        metric_position={current_metric}
                        total_metrics={active_metric_names.length}
                        {displayMode}
                        on:nextMetric={nextMetric}
                    />
                </div>
            </div>
        {:else}
            <div class="embeddedMetricsQuestions">
                {#each active_metric_names as metric, idx}
                    <MetricsQuestion
                        bind:metrics
                        metric_name={metric}
                        metric_position={idx}
                        total_metrics={active_metric_names.length}
                        {displayMode}
                    />
                {/each}
                <section class="submit">
                    <button
                        disabled={!active_metric_names.every(
                            (metric) => metrics[metric] != -1,
                        )}
                        on:click={showResults}>View Results</button
                    >
                </section>
            </div>
        {/if}
    {:else if step === "results" || step === "priorities"}
        <div class="resultsContainer">
            {#if version === "2024"}
                <div class="version-prompt">
                    You are viewing results using 2024 benchmark data.
                    <button
                        on:click={() => {
                            version = "2025";
                            metrics.rework = -1;
                            step = "input";
                        }}
                    >
                        Answer the new Deployment rework rate question to see
                        2025 benchmarks
                    </button>
                </div>
            {/if}
            <YourPerformance {metrics} bind:industry {displayMode} {version} />
            <HelpMePrioritize bind:current_capability />
            {#if displayMode === "kiosk"}
                <NextSteps {displayMode} on:reset={reset} />
            {/if}
        </div>
    {/if}

    <div class="faq">
        <a href="/faq/#dora-quick-check">Quick Check FAQ</a>
    </div>
    {#if step !== "input"}
        <GoFurther />
    {/if}
</div>

<style lang="scss">
    :global(body div.quickcheck) {
        padding-left: 0;
        padding-right: 0;
        position: relative;
    }

    .version-prompt {
        background-color: #fff3cd;
        border: 1px solid #ffeeba;
        color: #856404;
        padding: 1rem;
        margin-bottom: 2rem;
        border-radius: 0.5rem;
        text-align: center;
        button {
            margin-left: 1rem;
            background-color: #856404;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
        }
    }

    .kioskMetricsQuestions {
        display: flex;
        flex-direction: row;
        min-height: 400px;
    }

    .questionWrapper {
        flex-grow: 1;
    }

    .submit {
        text-align: center;
        margin: 2rem 0;
        button {
            padding: 1rem 3rem;
            font-size: 1.25rem;
            background-color: var(--dora-blue);
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            &:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
        }
    }

    .faq {
        text-align: center;
        padding-top: 1.5rem;
        font-size: 85%;
    }

    .kioskAside {
        margin: 0rem 2rem;
        border-right: 1px solid #ccd;
        padding-right: 2rem;
        width: 30%;
        font-size: 2rem;
        h1 {
            font-size: 7.5rem;
        }
    }

    @media (max-width: 800px) {
        .kioskMetricsQuestions {
            flex-direction: column;
        }
        .kioskAside {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #ccd;
            margin-bottom: 1rem;
        }
    }
</style>

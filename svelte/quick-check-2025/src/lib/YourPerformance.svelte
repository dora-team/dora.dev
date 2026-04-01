<script lang="ts">
    import { onMount } from "svelte";
    import PerformanceGraph from "./PerformanceGraph.svelte";
    import { DataService, type BenchmarkData, type IndustryMetrics } from "./data-service";
    import { sendAnalyticsEvent } from "./utils";
    import type { Metrics, DisplayMode } from "./types";
    // @ts-ignore
    import metrics_question_responses_raw from "./data/metrics_question_responses.json";

    const metrics_question_responses = metrics_question_responses_raw as Record<string, Record<string, string>>;

    export let metrics: Metrics;
    export let industry: string;
    export let displayMode: DisplayMode;
    export let version = "2025";

    let metrics_recoded = {
        leadtime: 0,
        deployfreq: 0,
        changefailure: 0,
        failurerecovery: 0,
        rework: 0
    };
    let performance_average = "0.0";
    let industry_metrics_data: BenchmarkData = {};
    let organization_size_metrics: BenchmarkData = {};
    let industry_metrics: BenchmarkData = {}; 
    let comparisonType: "industry" | "size" = "industry"; 
    let currentIndustry = industry;
    let loading = true;

    async function loadData() {
        loading = true;
        industry_metrics_data = await DataService.getIndustryMetrics(version);
        organization_size_metrics = await DataService.getOrgSizeMetrics(version);
        
        const urlParams = new URLSearchParams(window.location.search);
        const comp = urlParams.get("comp");
        if (comp === "size") {
            industry_metrics = organization_size_metrics;
            comparisonType = "size";
        } else {
            industry_metrics = industry_metrics_data;
            comparisonType = "industry";
        }
        loading = false;
    }

    const calculate_recoded_metrics = () => {
        metrics_recoded.leadtime = DataService.calculateRecodedMetric(parseInt(metrics.leadtime.toString()), 'categorical');
        metrics_recoded.deployfreq = DataService.calculateRecodedMetric(parseInt(metrics.deployfreq.toString()), 'categorical');
        metrics_recoded.failurerecovery = DataService.calculateRecodedMetric(parseInt(metrics.failurerecovery.toString()), 'categorical');
        metrics_recoded.changefailure = DataService.calculateRecodedMetric(parseInt(metrics.changefailure.toString()), 'percentage');
        
        if (version === "2025") {
            metrics_recoded.rework = DataService.calculateRecodedMetric(parseInt(metrics.rework.toString()), 'percentage');
        }
    };

    const setIndustryInURL = (industryName: string) => {
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.set("industry", industryName);
            window.history.replaceState({}, "", url.toString());
        }
    };

    onMount(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        sendAnalyticsEvent("quick_check_results");
        loadData();
    });

    $: {
        if (metrics && version) {
            calculate_recoded_metrics();
        }
    }

    $: {
        const active_scores = [
            metrics_recoded.leadtime,
            metrics_recoded.deployfreq,
            metrics_recoded.changefailure,
            metrics_recoded.failurerecovery
        ];
        if (version === "2025") {
            active_scores.push(metrics_recoded.rework);
        }
        performance_average = (active_scores.reduce((a, b) => a + b, 0) / active_scores.length).toFixed(1);
    }

    $: {
        if (!loading && !industry_metrics[industry]) {
            currentIndustry = "all";
            industry = "all";
            setIndustryInURL(currentIndustry);
        } else {
            currentIndustry = industry;
        }
    }

    const defaultIndustryMetrics: IndustryMetrics = {
        name: "All industries",
        performance_average: {mean: 0, std: 0},
        leadtime: {mean: 0, std: 0},
        deployfreq: {mean: 0, std: 0},
        changefailure: {mean: 0, std: 0},
        failurerecovery: {mean: 0, std: 0},
        rework: {mean: 0, std: 0}
    };

    $: selected_industry_metrics = industry_metrics[currentIndustry] || defaultIndustryMetrics;
    $: setIndustryInURL(currentIndustry);
    $: comparisonText = comparisonType === "industry" ? "Compare to industry benchmark:" : "Compare to organization size benchmark:";
    $: baselineText = !loading && industry_metrics[industry] ? (comparisonType === "industry" ? `${version} Industry baseline (${industry_metrics[industry]["name"]}):` : `${version} Organization size benchmark (${industry_metrics[currentIndustry]["name"]}):`) : "";
</script>

{#if loading}
    <div class="loading">Loading benchmark data...</div>
{:else}
<div class="heading">
    <h1 id="results">Your software delivery performance</h1>
    <div class="comparison-selector">
        {comparisonText}
        <select bind:value={industry}>
            {#each Object.entries(industry_metrics) as [industryKey, industry_data]}
                <option value={industryKey}>{industry_data["name"]}</option>
            {/each}
        </select>
    </div>
</div>
<div class="YourPerformance {displayMode}">
    <section class="performance-graphs">
        <aside>
            <b>Your performance</b>
            <span
                class="performance-average"
                style:background-position={`${parseFloat(performance_average) * 10}%`}
                >{performance_average}</span
            >
        </aside>
        <div class="graph">
            <PerformanceGraph
                user_score={parseFloat(performance_average)}
                industry_score={selected_industry_metrics.performance_average?.mean || 0}
                std={selected_industry_metrics.performance_average?.std || 0}
                tickmarks={[0, 2, 4, 6, 8, 10]}
                featured
                showBenchmarks={!!selected_industry_metrics.performance_average}
                {displayMode}
            />
        </div>
        
        <!-- Lead Time -->
        <aside>
            <b>Lead time for changes</b>
            <span class="metric_description"
                >{metrics_question_responses.leadtime[metrics.leadtime]}</span
            >
        </aside>
        <div class="graph">
            <PerformanceGraph
                user_score={metrics_recoded.leadtime}
                industry_score={selected_industry_metrics.leadtime.mean}
                std={selected_industry_metrics.leadtime.std}
                tickmarks={[">6mo", "1-6mo", "1w-1mo", "1d-1w", "<1d", "<1h"]}
                {displayMode}
            />
        </div>

        <!-- Deploy Freq -->
        <aside>
            <b>Deployment frequency</b>
            <span class="metric_description"
                >{metrics_question_responses.deployfreq[metrics.deployfreq]}</span
            >
        </aside>
        <div class="graph">
            <PerformanceGraph
                user_score={metrics_recoded.deployfreq}
                industry_score={selected_industry_metrics.deployfreq.mean}
                std={selected_industry_metrics.deployfreq.std}
                tickmarks={["<6mo", "1-6mo", "1w-1mo", "1d-1w", "1h-1d", "on demand"]}
                {displayMode}
            />
        </div>

        <!-- Failure Recovery -->
        <aside>
            <b>Failed deployment recovery time</b>
            <span class="metric_description"
                >{metrics_question_responses.failurerecovery[metrics.failurerecovery]}</span
            >
        </aside>
        <div class="graph">
            <PerformanceGraph
                user_score={metrics_recoded.failurerecovery}
                industry_score={selected_industry_metrics.failurerecovery.mean}
                std={selected_industry_metrics.failurerecovery.std}
                tickmarks={[">6mo", "1-6mo", "1w-1mo", "1d-1w", "<1d", "<1h"]}
                {displayMode}
            />
        </div>

        <!-- Change Fail Rate -->
        <aside>
            <b>Change fail rate</b>
            <span class="metric_description"
                >{metrics.changefailure}% of changes fail</span
            >
        </aside>
        <div class="graph">
            <PerformanceGraph
                user_score={+metrics_recoded.changefailure.toFixed(1)}
                industry_score={selected_industry_metrics.changefailure.mean}
                std={selected_industry_metrics.changefailure.std}
                tickmarks={["100%", "80%", "60%", "40%", "20%", "0%"]}
                {displayMode}
            />
        </div>

        {#if version === "2025"}
        <!-- Rework Rate -->
        <aside>
            <b>Rework rate</b>
            <span class="metric_description"
                >{metrics.rework}% of changes were unplanned</span
            >
        </aside>
        <div class="graph">
            <PerformanceGraph
                user_score={+metrics_recoded.rework.toFixed(1)}
                industry_score={(selected_industry_metrics.rework as any).mean}
                std={(selected_industry_metrics.rework as any).std}
                tickmarks={["100%", "80%", "60%", "40%", "20%", "0%"]}
                {displayMode}
            />
        </div>
        {/if}
    </section>
    
    <section class="legend">
        <div class="legend-header">
            <span>{baselineText}</span>
        </div>
        <div class="legend-items">
            <div class="legend-item"><span class="industry">&nbsp;</span> Average</div>
            <div class="legend-item"><span class="std">&nbsp;</span> Standard deviation</div>
            <div class="legend-item"><span class="your">&nbsp;</span> Your performance</div>
        </div>
    </section>
</div>
{/if}

<style lang="scss">
    .heading {
        text-align: center;
        margin-bottom: 2rem;
    }

    .loading {
        text-align: center;
        padding: 5rem;
        font-size: 1.5rem;
    }

    .YourPerformance {
        display: flex;
        flex-direction: column;

        .performance-graphs {
            display: grid;
            align-items: center;
            grid-template-columns: fit-content(20rem) auto;
            gap: 2rem 2rem;
            margin-top: 2rem;
            padding: 0 1.25em;

            aside {
                text-align: left;
                font-size: 0.85rem;
                color: #666;

                b {
                    display: block;
                    font-size: 1.1rem;
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }

                .performance-average {
                    display: inline-block;
                    background: var(--performance-spectrum);
                    background-size: 1000% 100%;
                    color: white;
                    font-size: 3rem;
                    padding: 0.5rem 2rem;
                    border-radius: 1rem;
                    margin-top: 0.5rem;
                }
            }
        }

        .legend {
            margin-top: 4rem;
            padding: 2rem;
            background-color: #f9f9f9;
            border-radius: 1rem;
            text-align: center;

            .legend-header {
                font-weight: bold;
                margin-bottom: 1rem;
            }

            .legend-items {
                display: flex;
                justify-content: center;
                gap: 2rem;
                font-size: 0.85rem;
            }

            .legend-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            span {
                display: inline-block;
                height: 1rem;
                &.your { width: 4px; background-color: var(--dora-blue); border-radius: 2px; }
                &.industry { width: 1px; background-color: #333; }
                &.std { width: 32px; background-color: var(--std-background); border-radius: 0.25rem; }
            }
        }
    }

    @media (max-width: 800px) {
        .YourPerformance {
            .performance-graphs {
                grid-template-columns: 1fr;
                gap: 3rem;
                aside { text-align: center; }
            }
            .legend-items {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
        }
    }
</style>

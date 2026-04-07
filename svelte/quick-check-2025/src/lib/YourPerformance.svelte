<script lang="ts">
    import { onMount } from "svelte";
    import PerformanceGraph from "./PerformanceGraph.svelte";
    import {
        DataService,
        type BenchmarkData,
        type IndustryMetrics,
    } from "./data-service";
    import { sendAnalyticsEvent } from "./utils";
    import type { Metrics, DisplayMode } from "./types";
    // @ts-ignore
    import metrics_question_responses_raw from "./data/metrics_question_responses.json";

    const metrics_question_responses = metrics_question_responses_raw as Record<
        string,
        Record<string, string>
    >;

    let {
        metrics,
        industry = $bindable(),
        displayMode,
        version = "2025",
    }: {
        metrics: Metrics;
        industry: string;
        displayMode: DisplayMode;
        version?: string;
    } = $props();

    let industry_metrics_data: BenchmarkData = $state({});
    let organization_size_metrics: BenchmarkData = $state({});
    let industry_metrics: BenchmarkData = $state({});
    let comparisonType: "industry" | "size" = $state("industry");
    let loading = $state(true);

    async function loadData() {
        loading = true;
        industry_metrics_data = await DataService.getIndustryMetrics(version);
        organization_size_metrics =
            await DataService.getOrgSizeMetrics(version);

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

    const metrics_recoded = $derived.by(() => {
        const recoded = {
            leadtime: DataService.calculateRecodedMetric(
                parseInt(metrics.leadtime.toString(), 10),
                "categorical",
            ),
            deployfreq: DataService.calculateRecodedMetric(
                parseInt(metrics.deployfreq.toString(), 10),
                "categorical",
            ),
            failurerecovery: DataService.calculateRecodedMetric(
                parseInt(metrics.failurerecovery.toString(), 10),
                "categorical",
            ),
            changefailure: DataService.calculateRecodedMetric(
                parseInt(metrics.changefailure.toString(), 10),
                "percentage",
            ),
            rework: 0,
        };

        if (version === "2025") {
            recoded.rework = DataService.calculateRecodedMetric(
                parseInt(metrics.rework.toString(), 10),
                "percentage",
            );
        }
        return recoded;
    });

    const performance_average = $derived.by(() => {
        const active_scores = [
            metrics_recoded.leadtime,
            metrics_recoded.deployfreq,
            metrics_recoded.changefailure,
            metrics_recoded.failurerecovery,
        ];
        if (version === "2025") {
            active_scores.push(metrics_recoded.rework);
        }
        return (
            active_scores.reduce((a, b) => a + b, 0) / active_scores.length
        ).toFixed(1);
    });

    const throughput_average = $derived(
        (
            (metrics_recoded.leadtime +
                metrics_recoded.deployfreq +
                metrics_recoded.failurerecovery) /
            3
        ).toFixed(1),
    );

    const instability_average = $derived.by(() => {
        const instability_stability_scores = [metrics_recoded.changefailure];
        if (version === "2025") {
            instability_stability_scores.push(metrics_recoded.rework);
        }
        const stability_avg =
            instability_stability_scores.reduce((a, b) => a + b, 0) /
            instability_stability_scores.length;
        return (10 - stability_avg).toFixed(1);
    });

    const currentIndustry = $derived.by(() => {
        if (!loading && !industry_metrics[industry]) {
            return "all";
        }
        return industry;
    });

    const defaultIndustryMetrics: IndustryMetrics = {
        name: "All industries",
        performance_average: { mean: 0, std: 0 },
        leadtime: { mean: 0, std: 0 },
        deployfreq: { mean: 0, std: 0 },
        changefailure: { mean: 0, std: 0 },
        failurerecovery: { mean: 0, std: 0 },
        rework: { mean: 0, std: 0 },
    };

    const selected_industry_metrics = $derived(
        industry_metrics[currentIndustry] || defaultIndustryMetrics,
    );

    const comparisonText = $derived(
        comparisonType === "industry"
            ? "Compare to industry benchmark:"
            : "Compare to organization size benchmark:",
    );

    const baselineText = $derived(
        !loading && industry_metrics[industry]
            ? comparisonType === "industry"
                ? `${version} Industry baseline (${industry_metrics[industry]["name"]}):`
                : `${version} Organization size benchmark (${industry_metrics[currentIndustry]["name"]}):`
            : "",
    );

    const setIndustryInURL = (industryName: string) => {
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.set("industry", industryName);
            window.history.replaceState({}, "", url.toString());
        }
    };

    $effect(() => {
        if (!loading && currentIndustry === "all" && industry !== "all") {
            industry = "all";
        }
        setIndustryInURL(currentIndustry);
    });

    onMount(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        sendAnalyticsEvent("quick_check_results");
        loadData();
    });
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
            <!-- Overall -->
            <div class="level overall-level">
                <aside>
                    <b class="level-label">Overall Performance</b>
                    <span
                        class="performance-average"
                        style:background-position={`${parseFloat(performance_average) * 10}%`}
                        >{performance_average}</span
                    >
                </aside>
                <div class="graph">
                    <PerformanceGraph
                        user_score={parseFloat(performance_average)}
                        industry_score={selected_industry_metrics
                            .performance_average?.mean || 0}
                        std={selected_industry_metrics.performance_average
                            ?.std || 0}
                        tickmarks={[0, 2, 4, 6, 8, 10]}
                        featured
                        showBenchmarks={!!selected_industry_metrics.performance_average}
                        {displayMode}
                    />
                </div>
            </div>

            <!-- Throughput Group -->
            <div class="level-group">
                <h3 class="group-header">
                    Software delivery throughput ({throughput_average})
                </h3>

                <div class="level throughput-level">
                    <aside>
                        <b>Lead time for changes</b>
                        <span class="metric_description"
                            >{metrics_question_responses.leadtime[
                                metrics.leadtime
                            ]}</span
                        >
                    </aside>
                    <div class="graph">
                        <PerformanceGraph
                            user_score={metrics_recoded.leadtime}
                            industry_score={selected_industry_metrics.leadtime
                                .mean}
                            std={selected_industry_metrics.leadtime.std}
                            tickmarks={[
                                ">6mo",
                                "1-6mo",
                                "1w-1mo",
                                "1d-1w",
                                "<1d",
                                "<1h",
                            ]}
                            {displayMode}
                        />
                    </div>
                </div>

                <div class="level throughput-level">
                    <aside>
                        <b>Deployment frequency</b>
                        <span class="metric_description"
                            >{metrics_question_responses.deployfreq[
                                metrics.deployfreq
                            ]}</span
                        >
                    </aside>
                    <div class="graph">
                        <PerformanceGraph
                            user_score={metrics_recoded.deployfreq}
                            industry_score={selected_industry_metrics.deployfreq
                                .mean}
                            std={selected_industry_metrics.deployfreq.std}
                            tickmarks={[
                                "<6mo",
                                "1-6mo",
                                "1w-1mo",
                                "1d-1w",
                                "1h-1d",
                                "on demand",
                            ]}
                            {displayMode}
                        />
                    </div>
                </div>

                <div class="level throughput-level">
                    <aside>
                        <b>Failed deployment recovery time</b>
                        <span class="metric_description"
                            >{metrics_question_responses.failurerecovery[
                                metrics.failurerecovery
                            ]}</span
                        >
                    </aside>
                    <div class="graph">
                        <PerformanceGraph
                            user_score={metrics_recoded.failurerecovery}
                            industry_score={selected_industry_metrics
                                .failurerecovery.mean}
                            std={selected_industry_metrics.failurerecovery.std}
                            tickmarks={[
                                ">6mo",
                                "1-6mo",
                                "1w-1mo",
                                "1d-1w",
                                "<1d",
                                "<1h",
                            ]}
                            {displayMode}
                        />
                    </div>
                </div>
            </div>

            <!-- Instability Group -->
            <div class="level-group">
                <h3 class="group-header">
                    Software delivery instability ({instability_average})
                </h3>

                <div class="level instability-level">
                    <aside>
                        <b>Change fail rate</b>
                        <span class="metric_description"
                            >{metrics.changefailure}% of changes fail</span
                        >
                    </aside>
                    <div class="graph">
                        <PerformanceGraph
                            user_score={+(
                                10 - metrics_recoded.changefailure
                            ).toFixed(1)}
                            industry_score={selected_industry_metrics.changefailure.mean}
                            std={selected_industry_metrics.changefailure.std}
                            tickmarks={[
                                "0%",
                                "20%",
                                "40%",
                                "60%",
                                "80%",
                                "100%",
                            ]}
                            {displayMode}
                        />
                    </div>
                </div>

                {#if version === "2025"}
                    <div class="level instability-level">
                        <aside>
                            <b>Rework rate</b>
                            <span class="metric_description"
                                >{metrics.rework}% of changes were unplanned</span
                            >
                        </aside>
                        <div class="graph">
                            <PerformanceGraph
                                user_score={+(
                                    10 - metrics_recoded.rework
                                ).toFixed(1)}
                                industry_score={selected_industry_metrics.rework?.mean || 0}
                                std={selected_industry_metrics.rework?.std || 0}                                tickmarks={[
                                    "0%",
                                    "20%",
                                    "40%",
                                    "60%",
                                    "80%",
                                    "100%",
                                ]}
                                {displayMode}
                            />
                        </div>
                    </div>
                {/if}
            </div>
        </section>

        <section class="legend">
            <div class="legend-header">
                <span>{baselineText}</span>
            </div>
            <div class="legend-items">
                <div class="legend-item">
                    <span class="industry">&nbsp;</span> Average
                </div>
                <div class="legend-item">
                    <span class="std">&nbsp;</span> Standard deviation
                </div>
                <div class="legend-item">
                    <span class="your">&nbsp;</span> Your performance
                </div>
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
            display: flex;
            flex-direction: column;
            gap: 0;
            margin-top: 2rem;
            padding: 0 1.25em;

            .level-group {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                padding: 2rem 0;
                border-top: 1px solid #eee;
            }

            .level {
                display: grid;
                grid-template-columns: 18rem 1fr;
                align-items: center;
                gap: 2rem;
            }

            .group-header {
                margin: 0 0 1rem 0;
                font-size: 1.25rem;
                color: var(--dora-blue);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-weight: 600;
            }

            aside {
                text-align: left;
                font-size: 0.85rem;
                color: #666;
                padding-right: 2rem;
                box-sizing: border-box;

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

            .metric_description {
                font-size: 0.8rem;
                color: #777;
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
                &.your {
                    width: 4px;
                    background-color: var(--dora-blue);
                    border-radius: 2px;
                }
                &.industry {
                    width: 1px;
                    background-color: #333;
                }
                &.std {
                    width: 32px;
                    background-color: var(--std-background);
                    border-radius: 0.25rem;
                }
            }
        }
    }

    @media (max-width: 800px) {
        .YourPerformance {
            .performance-graphs {
                .level {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    aside {
                        text-align: center;
                        padding-right: 0;
                    }
                }
            }
            .legend-items {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }
        }
    }
</style>

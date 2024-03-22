<script>
    export let metrics;
    export let metric_name = "METRIC",
        metric_position = 1,
        current_metric = 0,
        displayMode = "embedded";
    import metrics_question_responses from "./data/metrics_question_responses.json";
    import metrics_images from "./data/metrics_images.json";
    const metrics_details = {
        leadtime: {
            friendly_name: "Lead time",
            description:
                "For the primary application or service you work on, what is your lead time for changes (that is, how long does it take to go from code committed to code successfully running in production)?",
        },
        deployfreq: {
            friendly_name: "Deploy frequency",
            description:
                "For the primary application or service you work on, how often does your organization deploy code to production or release it to end users?",
        },
        changefailure: {
            friendly_name: "Change fail percentage",
            description:
                "For the primary application or service you work on, what percentage of changes to production or released to users result in degraded service (for example, lead to service impairment or service outage) and subsequently require remediation (for example, require a hotfix, rollback, fix forward or patch)?",
        },
        failurerecovery: {
            friendly_name: "Failed deployment recovery time",
            description:
                "For the primary application or service you work on, how long does it generally take to restore service after a change to production or release to users results in degraded service (for example, lead to service impairment or service outage) and subsequently require remediation (for example, require a hotfix, rollback, fix forward, or patch)?",
        },
    };

    let metric_friendly_name = metrics_details[metric_name]["friendly_name"];
</script>

<!-- TODO: images on this page are inlined from "metrics_image.json" ... we should be able to use Vite to inline them automatically from static image files, which will make the source cleaner -->
<div>
    <section class="question {displayMode}">
        <aside>
            <h5>
                Question {metric_position + 1} of 4<span class="friendly_name"
                    >: {metric_friendly_name}</span
                >
            </h5>
            <h2>{metric_friendly_name}</h2>
            <img alt={metric_friendly_name} src={metrics_images[metric_name]} />
        </aside>
        <fieldset>
            <legend>
                <p class="description">
                    {metrics_details[metric_name].description}
                </p>
            </legend>
            {#if metric_name === "changefailure"}
                <slider>
                    <input
                        type="range"
                        name="changefailure"
                        min="0"
                        max="100"
                        on:change={() => current_metric++}
                        bind:value={metrics["changefailure"]}
                    />
                    <echo>
                        {#if metrics["changefailure"] >= 0}{metrics[
                                "changefailure"
                            ]}{/if}
                    </echo>
                    <tickmarks>
                        <tick>|<br />0</tick>
                        <tick>|</tick>
                        <tick>|<br />20</tick>
                        <tick>|</tick>
                        <tick>|<br />40</tick>
                        <tick>|</tick>
                        <tick>|<br />60</tick>
                        <tick>|</tick>
                        <tick>|<br />80</tick>
                        <tick>|</tick>
                        <tick>|<br />100</tick>
                    </tickmarks>
                </slider>
            {:else}
                {#each Object.entries(metrics_question_responses[metric_name]) as [value, text]}
                    <label
                        ><input
                            name={metric_name}
                            type="radio"
                            bind:group={metrics[metric_name]}
                            on:click={() => current_metric++}
                            {value}
                        />{text}</label
                    >
                {/each}
            {/if}
        </fieldset>
    </section>
</div>

<style lang="scss">
    label {
        display: block;
    }

    section.question {
        display: flex;
        flex-direction: row;
        padding-bottom: 24px;
        border-bottom: 1px solid #dadce0;
        margin-bottom: 32px;

        aside {
            padding-right: 3rem;
            width: 35%;
        }

        p.description {
            padding-top: 1.5rem;
        }

        fieldset {
            width: 65%;
        }

        span.friendly_name {
            display: none;
        }

        img {
            padding: 1rem;
        }

        legend {
            margin-bottom: 1.5em;
        }

        label {
            margin-bottom: 6px;
            padding-left: 0.5rem;
        }

        slider {
            display: grid;
            max-width: 600px;
            grid-template-columns: auto 2rem;
            input[type="range"] {
                width: 100%;
            }
            echo {
                padding: 0 0.5rem;
                height: 1.5rem;
                vertical-align: middle;
            }
        }
        tickmarks {
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-left: 0rem;
            margin-right: -3rem;
            tick {
                display: inline-block;
                text-align: right;
                font-size: 0.65rem;
                color: #666;
                text-align: center;
                width: 1rem;
            }
        }

        &.kiosk {
            flex-direction: column;
            border-bottom: none;

            p.description {
                padding-top: 0;
                font-size:1.5rem;
            }

            fieldset {
                width:90%;
            }

            h2 {
                display: none;
            }

            img {
                display: none;
            }
            span.friendly_name {
                display: inline;
            }

            // show radio options as buttons
            input[type=radio] {
                display:none;
            }

            label {
                font-size:1.65rem;
                background-color:#eef;
                border-radius:.5rem;
                border:1px solid #e9e9f0;
                padding:.5rem 1rem;
                user-select: none;

                &:active {
                    background-color: var(--dora-blue);
                    color:white;
                }
            }
        }
    }

    /* There's no elegant way to use global variables for media queries (css variables aren't supported for this purpose, 
    and SCSS vars are cumbersome to propagate between different svelte components).
    So we'll use a "magic number" of 800px, in each file */
    @media (max-width: 800px) {
        section.question {
            flex-direction: column;
            aside {
                width: 100%;
                padding: 0.5rem;
                img {
                    display: none;
                }
            }
            p.description {
                padding-top: 0;
            }

            fieldset {
                width: 100%;
                padding: 0.5rem;
                label {
                    padding-left: 0.5rem;
                }
            }
        }
    }
</style>

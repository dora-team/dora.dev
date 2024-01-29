<script>
    export let metrics, step;
    import metrics_question_responses from "./data/metrics_question_responses.json";
    import metrics_images from "./data/metrics_images.json";

    function viewResults() {
        // advance to results view
        step = "results";

        // push data to URL
        if (typeof window !== "undefined") {
            const url = new URL(window.location);
            Object.entries(metrics).forEach(([metric, _]) => {
                url.searchParams.set(metric, metrics[metric]);
            });
            url.searchParams.set("step", "results");
            url.searchParams.set("v", "2023");
            window.history.pushState({}, "", url);
        }
    }
</script>

<!-- TODO: images on this page are inlined from "metrics_image.json" ... we should be able to use Vite to inline them automatically from static image files, which will make the source cleaner -->

<h5>Question 1 of 4</h5>
<section class="question">
    <aside>
        <h2>Lead time</h2>
        <img alt="lead time" src={metrics_images.leadtime} />
    </aside>
    <fieldset class="paragraph">
        <legend
            >For the primary application or service you work on, what is your
            lead time for changes (that is, how long does it take to go from
            code committed to code successfully running in production)?</legend
        >
        {#each Object.entries(metrics_question_responses["leadtime"]) as [value, text]}
            <label
                ><input
                    name="leadtime"
                    type="radio"
                    bind:group={metrics["leadtime"]}
                    {value}
                />{text}</label
            >
        {/each}
    </fieldset>
</section>
<h5>Question 2 of 4</h5>
<section class="question">
    <aside>
        <h2>Deploy frequency</h2>
        <img alt="deployment frequency" src={metrics_images.deployfreq} />
    </aside>
    <fieldset class="paragraph">
        <legend>
            For the primary application or service you work on, how often does
            your organization deploy code to production or release it to end
            users?
        </legend>
        {#each Object.entries(metrics_question_responses["deployfreq"]) as [value, text]}
            <label
                ><input
                    name="deployfreq"
                    type="radio"
                    bind:group={metrics["deployfreq"]}
                    {value}
                />{text}</label
            >
        {/each}
    </fieldset>
</section>
<h5>Question 3 of 4</h5>
<section class="question">
    <aside>
        <h2>Change fail percentage</h2>
        <img
            alt="change failure percentage"
            src={metrics_images.changefailure}
        />
    </aside>
    <fieldset class="paragraph">
        <legend>
            For the primary application or service you work on, what percentage
            of changes to production or released to users result in degraded
            service (for example, lead to service impairment or service outage)
            and subsequently require remediation (for example, require a hotfix,
            rollback, fix forward or patch)?
        </legend>
        <slider>
            <input
                type="range"
                name="changefailure"
                min="0"
                max="100"
                bind:value={metrics["changefailure"]}
            />
            <echo>
                {#if metrics["changefailure"] >= 0}{metrics["changefailure"]}{/if}
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
    </fieldset>
</section>
<h5>Question 4 of 4</h5>
<section class="question">
    <aside>
        <h2>Failed deployment recovery time</h2>
        <img
            alt="failed deployment recovery time"
            src={metrics_images.failurerecovery}
        />
    </aside>
    <fieldset class="paragraph">
        <legend>
            For the primary application or service you work on, how long does it
            generally take to restore service after a change to production or
            release to users results in degraded service (for example, lead to
            service impairment or service outage) and subsequently require
            remediation (for example, require a hotfix, rollback, fix forward,
            or patch)?
        </legend>
        {#each Object.entries(metrics_question_responses["failurerecovery"]) as [value, text]}
            <label
                ><input
                    name="failurerecovery"
                    type="radio"
                    bind:group={metrics["failurerecovery"]}
                    {value}
                />{text}</label
            >
        {/each}
    </fieldset>
</section>
<section class="submit">
    <input type="hidden" name="step" value="results" />
    <button
        disabled={!(
            metrics["leadtime"] > -1 &&
            metrics["deployfreq"] > -1 &&
            metrics["changefailure"] > -1 &&
            metrics["failurerecovery"] > -1
        )}
        on:click={() => {
            viewResults();
        }}>View Results</button
    >
</section>

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
            flex-grow: 0;
            width: 35%;

            img {
                margin: 1rem;
            }
        }

        fieldset {
            flex-grow: 1;
            width: 65%;

            legend {
                margin-bottom: 1.5em;
            }

            label {
                margin-bottom: 6px;
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
                }
            }
            tickmarks {
                width: 100%;
                max-width: 600px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                tick {
                    display: inline-block;
                    text-align: right;
                    font-size: 0.65rem;
                    color: #666;
                    text-align: center;
                    &:not(:last-child) {
                        transform: translateX(50%);
                    }
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

            fieldset {
                width: 100%;
                padding: 0.5rem;
                label {
                    padding-left: 1.5rem;
                }
            }
        }
    }

    section.submit {
        text-align: center;
    }
</style>

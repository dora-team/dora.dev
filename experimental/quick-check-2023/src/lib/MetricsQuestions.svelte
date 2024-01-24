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
            url.searchParams.set("v","2023");
            window.history.pushState({}, "", url);
        }
    }
</script>

<!-- TODO: images on this page are inlined from "metrics_image.json" ... we should be able to use Vite to inline them automatically from static image files, which will make the source cleaner -->

<h3>For the primary application or service you work on...</h3>
<h5>Question 1 of 4</h5>
<section class="question">
    <aside>
        <h2>Lead time</h2>
        <img alt="lead time" src={metrics_images.leadtime} />
    </aside>
    <fieldset class="paragraph">
        <legend
            >What is your lead time for changes (that is, how long does it take
            to go from code committed to code successfully running in
            production)?</legend
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
            How often does your organization deploy code to production or
            release it to end users?
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
            What percentage of changes to production or released to users result
            in degraded service (for example, lead to service impairment or
            service outage) and subsequently require remediation (for example,
            require a hotfix, rollback, fix forward or patch)?
        </legend>
        <input
            type="range"
            name="changefailure"
            min="0"
            max="100"
            list="markers"
            bind:value={metrics["changefailure"]}
            style="width:100%;max-width:600px"
        />
        <span
            >{metrics["changefailure"] > -1
                ? metrics["changefailure"]
                : ""}</span
        >
        <datalist
            id="markers"
            style="display:flex;width:100%;max-width:600px;justify-content:space-between"
        >
            <option value="0" label="0"></option>
            <option value="10"></option>
            <option value="20" label="20"></option>
            <option value="30"></option>
            <option value="40" label="40"></option>
            <option value="50"></option>
            <option value="60" label="60"></option>
            <option value="70"></option>
            <option value="80" label="80"></option>
            <option value="90"></option>
            <option value="100" label="100"></option>
        </datalist>
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
            How long does it generally take to restore service after a change to
            production or release to users results in degraded service (for
            example, lead to service impairment or service outage) and
            subsequently require remediation (for example, require a hotfix,
            rollback, fix forward, or patch)?
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
        }
    }

    section.submit {
        text-align: center;
    }
</style>

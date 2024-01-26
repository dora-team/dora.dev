<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";

    export let capability;
    export let capability_count;
    export let current_capability_index;

    // initialize user response data with dummy values
    // let responses = Array(capability.questions.length).fill(-1);
    export let this_capability_responses = [];
    let thisCapabilityCompleted = false;

    const dispatch = createEventDispatcher();

    function nextCapability() {
        // push data to URL
        if (typeof window !== "undefined") {
            const url = new URL(window.location);
            url.searchParams.set(
                capability.shortname,
                this_capability_responses.join(""),
            );
            if (current_capability_index == capability_count - 1) {
                url.searchParams.set("step", "priorities");
            }
            window.history.replaceState({}, "", url);
        }
        dispatch("nextCapability");
    }

    onMount(() => {
        // extract responses from URL and cast as Int
        if (typeof window !== "undefined") {
            const url = new URL(window.location);
            if (url.searchParams.has(capability.shortname)) {
                this_capability_responses = url.searchParams
                    .get(capability.shortname)
                    .split("")
                    .map((x) => parseInt(x));
            }
        }
    });

    let response_options = [
        "Strongly disagree",
        "Disagree",
        "Neither agree nor disagree",
        "Agree",
        "Strongly agree",
    ];

    // has user entered a value for every question of this capability?
    $: thisCapabilityCompleted = this_capability_responses.every((x) => x > -1);
</script>

<section>
    <h3>
        Capability {capability.number} of {capability_count}: {capability.capability_name}
    </h3>
    <p>
        {capability.description}
        <a href={capability.article_url} target="_blank">learn more</a>
    </p>
    <table>
        <thead>
            <tr>
                <th>For the primary application or service you work on:</th>
                {#each response_options as option}
                    <th>{option}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each capability.questions as question}
                <tr>
                    <td>{question.question_text}</td>
                    {#each response_options as option_text, idx}
                        <td>
                            <label
                                ><input
                                    type="radio"
                                    name={`${capability.shortname}_${question.number}`}
                                    value={idx + 1}
                                    bind:group={this_capability_responses[
                                        question.number - 1
                                    ]}
                                /><span>{option_text}</span></label
                            >
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="next">
        <button on:click={nextCapability} disabled={!thisCapabilityCompleted}>
            {#if current_capability_index < capability_count - 1}Next{:else}View
                Results{/if}</button
        >
        <!-- Vite provides environment variables; if running in dev, show some debug -->
        {#if typeof import.meta.env.MODE != "undefined" && import.meta.env.MODE === "development"}
            <div>
                debug: index = {current_capability_index}<br />
                debug: thisCapabilityCompleted = {thisCapabilityCompleted}<br />
                debug: mode = {import.meta.env.MODE}
            </div>
        {/if}
    </div>
</section>

<style lang="scss">
    table {
        font-weight: 300;
        font-size: 15px;
        border-collapse: collapse;

        th {
            border-bottom: 1px solid #dadce0;
            vertical-align: bottom;

            &:first-child {
                text-align: left;
            }
        }

        tbody {
            font-family: "Roboto", Arial, Helvetica, sans-serif;
            vertical-align: middle;

            tr:nth-child(even) {
                background-color: #f0f1f2;
            }

            td {
                &:first-child {
                    padding-left: 1em;
                }
                &:not(:first-child) {
                    text-align: center;
                    width: 10%;
                }
                label {
                    padding: 1.5em 1em;
                    display: block;
                    cursor: pointer;
                }
                input {
                    cursor: pointer;
                    transform: scale(1.25);
                    margin-right: 0.5em;
                }
                span {
                    display: none;
                }
            }
        }
    }
    div.next {
        text-align: center;
    }

    /* There's no elegant way to use global variables for media queries (css variables aren't supported for this purpose, 
    and SCSS vars are hard to propagate between different svelte components).
    So we'll use a "magic number" of 800px, in each file */
    @media (max-width: 800px) {
        table {
            tr {
                display:block;
                margin-bottom:.5rem;
            }
            th {
                display: none;
            }
            tbody {
                td,
                td:not(:first-child) {
                    text-align: left;
                    display: block;
                    width: 100%;
                    span {
                        display: inline;
                    }
                    label {
                        padding: 0 0 0 1.5rem;
                    }
                }
                td:first-child {
                    font-weight: 500;
                    padding-left: 0.25rem;
                }
            }
        }
    }
</style>

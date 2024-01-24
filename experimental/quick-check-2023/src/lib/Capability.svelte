<script>
    import { createEventDispatcher } from "svelte";

    export let capability;
    export let capability_count;
    export let index;

    // initialize user response data with dummy values
    let responses = Array(capability.questions.length).fill(-1);
    let thisCapabilityCompleted = false;

    const dispatch = createEventDispatcher();

    function nextCapability() {
        dispatch("nextCapability");
    }

    let response_options = [
        "Strongly disagree",
        "Disagree",
        "Neither agree nor disagree",
        "Agree",
        "Strongly agree",
    ];

    // has user entered a value for every question of this capability?
    $: thisCapabilityCompleted = responses.every((x) => x > -1);
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
                                    bind:group={responses[question.number - 1]}
                                /><span>{option_text}</span></label
                            >
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="next">
        {#if index < capability_count - 1}
            <button
                on:click={nextCapability}
                disabled={!thisCapabilityCompleted}>Next</button
            >
        {:else}
            <button>View Results</button>
        {/if}
        <br />
        <!-- Vite provides environment variables; if running in dev, show some debug -->
        {#if typeof import.meta.env.MODE != "undefined" && import.meta.env.MODE === "development"}
            debug: index = {index}<br>
            debug: thisCapabilityCompleted = {thisCapabilityCompleted}<br>
            debug: mode = {import.meta.env.MODE}
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
</style>

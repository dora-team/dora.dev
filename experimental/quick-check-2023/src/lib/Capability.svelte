<script>
    import { createEventDispatcher } from "svelte";
    import Debug from "./Debug.svelte";

    export let capability;
    export let capability_count;
    export let index;

    // initialize user response data with dummy values
    let responses = Array(capability.questions.length).fill(-1);
    console.log(responses.toString())

    const dispatch = createEventDispatcher();

    function nextCapability() {
        console.debug('nextCapability');
        dispatch("nextCapability");
    }

    // has user entered a value for every question of this capability?
    function thisCapabilityCompleted() {
        return responses.every(x => x > -1)
    }

    let response_options = [
        "Strongly disagree",
        "Disagree",
        "Neither agree nor disagree",
        "Agree",
        "Strongly agree",
    ];
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
                                    bind:group={responses[question.number-1]}
                                    on:click={thisCapabilityCompleted}
                                /><span>{option_text}</span></label
                            >
                        </td>
                    {/each}
                </tr>
            {/each}
            <!-- <tr>
                <td
                    >Code commits result in an automated build of the software.</td
                >
                <td>
                    <label for="question_1_1_1">
                        <input
                            type="radio"
                            name="question_1_1"
                            id="question_1_1_1"
                            value="1"
                        /> <span>Strongly disagree</span>
                    </label>
                </td>

                <td>
                    <label for="question_1_1_2">
                        <input
                            type="radio"
                            name="question_1_1"
                            id="question_1_1_2"
                            value="2"
                        /> <span>Disagree</span>
                    </label>
                </td>

                <td>
                    <label for="question_1_1_3">
                        <input
                            type="radio"
                            name="question_1_1"
                            id="question_1_1_3"
                            value="3"
                        /> <span>Neither agree nor disagree</span>
                    </label>
                </td>

                <td>
                    <label for="question_1_1_4">
                        <input
                            type="radio"
                            name="question_1_1"
                            id="question_1_1_4"
                            value="4"
                        /> <span>Agree</span>
                    </label>
                </td>

                <td>
                    <label for="question_1_1_5">
                        <input
                            type="radio"
                            name="question_1_1"
                            id="question_1_1_5"
                            value="5"
                        /> <span>Strongly agree</span>
                    </label>
                </td>
            </tr> -->
        </tbody>
    </table>
</section>

<div class="next">
    {#if index < capability_count - 1}
        <button on:click={nextCapability} disabled={!thisCapabilityCompleted}>Next</button>
    {:else}
        (SUBMIT)
    {/if}
    <br />
    debug: index = {index}
</div>

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

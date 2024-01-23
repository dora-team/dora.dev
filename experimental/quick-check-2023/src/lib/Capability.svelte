<script>
    export let capability;
    export let question_count;

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
        Capability {capability.number} of {question_count}: {capability.capability_name}
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
                    {#each response_options as option, idx}
                        <td>
                            <label><input type="radio" value={idx + 1} /></label
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
</style>

<script>
    import { arrayAverage, recode_numeric_range } from "./utils";

    export let question;
    export let this_capability_responses = [0];
    export let this_capability_recoded_average = 0;
    $: this_capability_recoded_average = recode_numeric_range(
        arrayAverage(this_capability_responses),
        1,
        5,
        0,
        10,
    );
</script>

<div class="prioritization_result">
    <div class="capability_name">
        <h2>{question.capability_name}</h2>
        <a href={question.article_url}
            >Learn more about {question.capability_name}</a
        >
    </div>
    <div class="capability_score">
        <div class="score_bar_container">
            <div class="score_bar_value" style:width={`${this_capability_recoded_average*10}%`} style:background-position={`${this_capability_recoded_average * 10}%`}
            ></div>
        </div>
        <div class="score_text">
            {this_capability_recoded_average} <span class="range">/ 10</span>
        </div>
    </div>
</div>

<style lang="scss">
    .prioritization_result {
        padding: 0.5rem 0;
        &:not(:last-child) {
            border-bottom: 1px solid var(--border-color-light);
        }

        display: grid;
        grid-template-columns: auto fit-content(60%);
        align-items: center;

        .capability_name {
            a {
                font-size: 85%;
            }
        }

        .capability_score {
            display: grid;
            grid-template-columns: auto 4rem;
            align-items: center;
            .score_bar_container {
                width: 10rem;
                height: 2rem;
                position: relative;
                border-radius: 1rem;
                overflow: hidden;
                border: 1px solid var(--border-color-medium);

                .score_bar_value {
                    position: absolute;
                    width: 5rem;
                    min-width:5%; // always show a wee bit in case the score is zero
                    height: 2rem;
                    background: var(--performance-spectrum);
                    background-size: 100vw;
                }
            }

            .score_text {
                margin-left: 0.5rem;
                white-space: nowrap;
                text-align: right;
                span.range {
                    color: #999;
                }
            }
        }
    }
</style>

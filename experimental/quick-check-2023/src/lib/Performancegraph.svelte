<script>
    export let user_score, industry_score, industry_benchmark_distribution;
    export let featured = false;
</script>

<div class="graph" class:featured>
    {#if industry_benchmark_distribution}
        {#each Object.entries(industry_benchmark_distribution) as [score, percent]}
            {#if percent}
                {#if score == 0}
                    <div
                        class="benchmark_bar"
                        style:height={percent * 1000 * 3.5 + "%"}
                        style="left:0%;width:.5%"
                    ></div>
                {:else if score > 0 && score < 10}
                    <div
                        class="benchmark_bar"
                        style:height={percent * 1000 * 3.5 + "%"}
                        style:left={score * 10 - 0.5 + "%"}
                    ></div>
                {:else}
                    <div
                        class="benchmark_bar"
                        style:height={percent * 1000 * 3.5 + "%"}
                        style="left:99.5%;width:.5%"
                    ></div>
                {/if}
            {/if}
        {/each}
    {/if}
    <div class="metric user" style="left:calc({user_score}% * 10)">
        <div class="value">{user_score}</div>
    </div>
    <div class="metric industry" style="left:calc({industry_score}% * 10)">
        <div class="value">
            <!-- {industry_score} -->&nbsp;
        </div>
    </div>
</div>

<style lang="scss">
    .graph {
        height: 3em;
        padding-bottom: 1.5em;
        margin-bottom: 2em;
        // border:1px solid red;
        border-bottom: 1px solid #666;
        height: 3em;
        position: relative;

        .benchmark_bar {
            width: 1%;
            background-color: var(--dora-blue);
            opacity: .3;
            position: absolute;
            bottom: 0rem;
            z-index: -1;
            transition: all 0.3s ease-out;
        }

        .metric {
            display: inline-block;
            position: absolute;
            transform: translateX(-50%);
            transition: left 0.3s ease-out;
            width: 2rem;
            height: 7rem;
            text-align: center;
            bottom: -2.5rem;
            z-index: 100;
            background-image: url(../assets/your_performance_grey.svg);
            background-position: top;
            background-repeat: no-repeat;
            background-position-y: 2rem;

            .value {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%) translateY(0rem);
                padding: 0 0.25rem;
                border-radius: 0.25rem;
            }

            &.industry {
                z-index: 99;
                background-image: url("../assets/marker_simple.png");
                background-repeat: repeat-y;
                height: 4rem;

                .value {
                    color: #666;
                    background-color: white;
                    font-size: 0.75rem;
                }
            }

            &.user {
                background-size: 70%;
                .value {
                    background-color: #666;
                    color: white;
                }
            }
        }

        &.featured {
            .metric {
                height: 7rem;
                background-image: url(../assets/your_performance.svg);

                background-position-y: 0rem;

                .value {
                    font-size: 1.25rem;
                }

                &.user {
                    background-size: 100%;
                    .value {
                        background-color: #041e49;
                    }
                }

                &.industry {
                    background-image: url("../assets/marker_simple_wide.png");
                    height: 4rem;

                    .value {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
</style>

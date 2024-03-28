<script>
    export let user_score,
        industry_score,
        displayMode,
        std = 0,
        tickmarks = [];
    export let featured = false;

    let user_score_position = "0%";

    $: user_score_position = `${user_score * 10}%`;
</script>

<div class="graph {displayMode}" class:featured>
    <div class="axis"></div>
    <div
        class="std"
        style:left="{Math.max((industry_score - std) * 10, 0)}%"
        style:right="{Math.max(100 - (industry_score + std) * 10, 0)}%"
    ></div>
    <div class="metric industry" style:left="{industry_score * 10}%"></div>
    <div class="metric user" style:left={user_score_position}></div>
    <div class="user_score" style:left={user_score_position}>{user_score}</div>
    <div class="tickmarks">
        {#each tickmarks as tick, index}
            <div
                class="tick"
                style:left="{index * (100 / (tickmarks.length - 1))}%"
            >
                {tick}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .graph {
        position: relative;
        height: 5.5rem;

        .axis {
            background-color: #eee;
            height: 0.3rem;
            position: absolute;
            left: -0.25rem;
            right: -0.25rem;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 0.15rem;
        }

        .std {
            height: 0.9rem;
            position: absolute;
            background-color: var(--std-background);
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease-out;
            border-radius: 0.2rem;
        }

        .metric {
            position: absolute;
            box-sizing: content-box;
            height: 2.5rem;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 0.2%;
            min-width: 1px;
            background-color: var(--metric-background);
            border-left: 1px solid var(--metric-border);
            border-right: 1px solid var(--metric-border);
            transition: all 0.3s ease-out;

            &.user {
                background-color: var(--dora-blue);
                height: 3rem;
                width: 0.2rem;
                border-bottom: 1px solid var(--metric-border);
                border-radius: 0.2rem;
            }
        }

        .user_score {
            font-size: 0.85rem;
            color: var(--dora-blue);
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(calc(-50% - 2rem));
            background-color: var(--user-score-bg);
            border: 2px solid var(--dora-blue);
            padding: 0 0.25rem;
            border-radius: 0.35rem;
            transition: all 0.3s ease-out;
        }

        .tickmarks {
            display: flex;
            position: absolute;
            bottom: 0;
            width: 100%;
            .tick {
                position: absolute;
                bottom: 0;
                text-wrap: nowrap;
                font-size: 0.65rem;
                color: #999;
                transform: translateX(-50%);
            }
        }

        &.featured {
            height: 6.5rem;
            .axis {
                height: 2.5em;
                border-radius: 1.25em;
                background: var(--performance-spectrum);
                left: -1.25em;
                right: -1.25em;
            }

            .std {
                height: 4rem;
            }

            .metric {
                height: 5rem;

                &.user {
                    width: 0.4rem;
                    height: 5rem;
                    border-radius: 0.4rem;
                }
            }

            .user_score {
                transform: translateX(-50%) translateY(calc(-50% - 3rem));
                background-color: var(--dora-blue);
                font-size: 1rem;
                font-weight: 700;
                color: white;
            }
        }

        &.kiosk {
            .tickmarks {
                display:none;
            }
        }

    }
</style>

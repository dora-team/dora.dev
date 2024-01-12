<script>
    export let user_score,
        industry_score,
        std = 0,
        tickmarks = [];
    export let featured = false;
</script>

<div class="graph" class:featured>
    <div class="graph_contents">
        <div class="metric user" style:left="{user_score * 10}%">
            <div class="value">{user_score}</div>
            <div class="indicator"></div>
        </div>
        <div class="metric industry" style:left="{industry_score * 10}%">
            <div class="value">{industry_score}</div>
            <div class="indicator"></div>
        </div>
        <div
            class="std"
            style:width="{std * 20}%"
            style:left="{industry_score * 10 - std * 10}%"
        >
            &nbsp;
        </div>
        <div class="tickmarks">
            {#each tickmarks as tick}
                <div class="tick"><span>{tick}</span></div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .graph {
        background-color: #eee;
        height: 0.25rem;
        position: relative;
        margin-bottom: 3rem;
        .graph_contents {
            margin: 0 1.25em 0 1.25em;
            position: relative;

            .metric {
                display: inline-grid;
                position: absolute;
                transform: translateX(-50%) translateY(-2rem);
                transition: left 0.3s ease-out;
                z-index: 100;

                .value {
                    border-radius: 0.25rem;
                    padding: 0 0.25rem;
                    font-size: 0.75rem;
                    min-width: 0.75rem;
                    text-align: center;
                    background-color: white;
                }

                .indicator {
                    height: 2rem;
                    background-repeat: no-repeat;
                }

                &.industry {
                    z-index: 99;
                    opacity: 0.6;

                    .value {
                        color: #666;
                        visibility: hidden;
                    }

                    .indicator {
                        background-image: url("../assets/marker_simple.png");
                        background-repeat: repeat-y;
                        background-position: top;
                    }
                }

                &.user {
                    .indicator {
                        background-image: url("../assets/indicator.svg");
                        background-size: 0.4rem;
                        background-position: bottom;
                    }
                    .value {
                        color: var(--dora-blue);
                        padding: 0 0.2rem;
                        border: 2px solid var(--dora-blue);
                    }
                }
            }

            .std {
                background-color: var(--std-background);
                position: relative;
                height: 1rem;
                transform: translateY(-0.5rem);
                transition: all 0.3s ease-out;
            }

            .tickmarks {
                display: flex;
                position: relative;
                top: 1.5em;
                width: calc(100% + 1rem);
                left: -0.5rem;
                .tick {
                    flex-grow: 1;
                    font-size: 0.65rem;
                    color: #999;
                    padding-left: 0.2rem;
                    // border:1px solid orange;

                    span {
                        transform: translateX((calc(-50%)));
                        display: inline-block;
                    }

                    &:last-child {
                        flex-grow: 0;
                        span {
                            text-align: right;
                            transform: translateX(calc(50% - 0.5rem));
                        }
                    }
                }
            }

            .metric:hover {
                z-index: 200;
                opacity: 1;
                .value {
                    visibility: visible;
                }
            }
        }

        &.featured {
            height: 2.5em;
            border-radius: 1.25em;
            background: linear-gradient(
                90deg,
                #e62f23 0%,
                #7a23e6 50%,
                #1785e6 100%
            );

            .graph_contents {
                .metric {
                    &.user {
                        .value {
                            background-color: var(--dora-blue);
                            border: none;
                            color: white;
                            padding: 0 0.5rem;
                        }
                        .indicator {
                            background-size: 0.75rem;
                            height: 3.5rem;
                        }
                    }
                    .value {
                        font-size: 1.25rem;
                    }

                    &.industry {
                        opacity: 1;

                        .value {
                            font-size: 0.85rem;
                        }

                        .indicator {
                            height: 3.5rem;
                        }
                    }
                }

                .std {
                    background-color: var(--std-background);
                    position: relative;
                    height: 2.5rem;
                    transform: translateY(0rem);
                }

                .tickmarks {
                    top: 2.75rem;
                }
            }
        }
    }
</style>

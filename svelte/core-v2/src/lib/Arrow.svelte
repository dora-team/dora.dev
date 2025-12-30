<script>
    export let text = "predicts";
    export let view_mode = "summary";
</script>

<div class={view_mode}>
    <span class="text">{text}</span> <span>→</span>
</div>

<style lang="scss">
    div {
        font-size: 14px;
        color: var(--color-grey-dark);
        white-space: nowrap;
        display: flex;
        column-gap: 0.25em;

        .text {
            display: inline-block;
            width: 3.5rem;
            transition: var(--default-transition);
            overflow: hidden;
        }

        &.detail {
            column-gap: 0;
            .text {
                width: 0;
                overflow: hidden;
                opacity: 0;
            }
        }

        @media (max-width: 800px) {
            flex-direction: column;
            align-items: center;
            margin: 0.5rem 0;

            span:last-child {
                transform: rotate(90deg);
                display: inline-block; /* transform requires block/inline-block */
            }

            .text {
                width: auto; /* Allow text to be visible if needed or keep existing logic */
                text-align: center;
            }
        }
    }
</style>

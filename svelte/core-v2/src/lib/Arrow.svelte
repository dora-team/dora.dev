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
    }
</style>

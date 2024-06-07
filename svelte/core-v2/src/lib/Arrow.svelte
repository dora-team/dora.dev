<script>
    export let text = "predicts";
    export let view_mode = "summary";
</script>

<div class="{view_mode}">
    <span class="text">{text}</span> →
</div>

<style lang="scss">
    div {
        font-size: 14px;
        color:var(--color-grey-dark);
        white-space: nowrap;

        .text {
            display:inline-block;
            width:3.5rem;
            transition: all .3s linear;
        }

        &.detail {
            .text {
                width:0;
                overflow: hidden;
                opacity:0;
            }
        }
    }
</style>

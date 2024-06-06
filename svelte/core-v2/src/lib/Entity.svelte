<script>
    export let entity;
    export let details;
    export let view_mode;
    export let selected_entity;

    function openPopover(entity) {
        selected_entity = entity;
        document.getElementById('popover').showPopover();
    }
</script>

<!-- css transitions require specified heights, so we'll make an educated guess as to whether to put items on one line or two-->
<div
    class={view_mode}
    class:twolines={details["name"].length > 31}
    on:click={() => openPopover(entity)}
>
    {details["name"]}
</div>

<style lang="scss">
    div {
        transition: all 0.3s linear;
        border: 1px solid var(--color-grey-light);
        border-radius: 0.5rem;
        padding: 0.2rem;
        display: grid;
        align-items: center;
        cursor: pointer;
    }

    .summary {
        height: 0;
        overflow: hidden;
        opacity: 0;
        margin: 0;
        border: none;
        padding: 0;
    }

    .detail {
        height: 1lh;
        opacity: 1;

        &.twolines {
            height: 2lh;
        }
    }
</style>

<script>
    export let entity;
    export let details;
    export let view_mode;
    export let selected_entity;

    function openPopover(entity) {
        selected_entity = entity;
        document.getElementById("entityPopover").showPopover();
    }
</script>

<div
    class={view_mode}
    on:click={() => openPopover(entity)}
    on:keyup={() => openPopover(entity)}
    role="link"
    tabindex="-1"
>
    {details["name"]}
</div>

<style lang="scss">
    div {
        border: 1px solid var(--color-grey-light);
        border-radius: 0.5rem;
        padding: 0.2rem;
        display: grid;
        align-items: center;
        cursor: pointer;
    }
</style>

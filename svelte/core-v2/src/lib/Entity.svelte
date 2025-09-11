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

<button
    class={view_mode}
    on:click={() => openPopover(entity)}
>
    {details["name"]}
</button>

<style lang="scss">
    button {
        all: unset;
        display: grid;
        border: 1px solid var(--color-grey-light);
        border-radius: 0.5rem;
        padding: 0.2rem;
        align-items: center;
        cursor: pointer;
        text-align: center;
    }
    button:hover {
        background-color: initial;
        color: inherit;
    }
</style>

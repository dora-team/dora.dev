<script>
    let {
        entity,
        details,
        view_mode,
        selected_entity = $bindable()
    } = $props();

    function openPopover(entity) {
        selected_entity = entity;
        document.getElementById("entityPopover").showPopover();
    }
</script>

<div
    class={view_mode}
    onclick={() => openPopover(entity)}
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
        outline:none;
    }
</style>

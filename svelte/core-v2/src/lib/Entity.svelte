<script>
    import { appState } from "./state.svelte.js";

    let {
        entity,
        details
    } = $props();

    function openPopover(entity) {
        appState.selected_entity = entity;
        document.getElementById("entityPopover").showPopover();
    }
</script>

<div
    class={appState.view_mode}
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

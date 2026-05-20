<script>
    import { appState } from "./state.svelte.js";

    let {
        entity,
        details
    } = $props();

</script>

<div
    class={appState.view_mode}
    onclick={() => appState.selected_entity = entity}
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

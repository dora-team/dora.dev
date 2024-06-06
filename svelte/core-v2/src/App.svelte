<script>
    import Column from "./lib/Column.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Popover from "./lib/Popover.svelte";
    import ViewControl from "./lib/ViewControl.svelte";

    let selected_entity = "unspecified";

    let view_mode = "summary";
</script>

<!-- Popover shows summaries of entities -->
<Popover {selected_entity} />

<ViewControl bind:view_mode />

<div class="coremodel">
    <Column column="capabilities" {view_mode} bind:selected_entity />
    <Arrow text="predict" {view_mode} />
    <Column column="performance" {view_mode} bind:selected_entity />
    <Arrow text="predicts" {view_mode} />
    <Column column="outcomes" {view_mode} bind:selected_entity />
</div>

<style lang="scss">
    .coremodel {
        display: flex;
        flex-direction: row;
        column-gap: .25em;
        align-items: center;
    }
</style>

<script>
    import Column from "./lib/Column.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Popover from "./lib/Popover.svelte";

    let selected_entity = "unspecified";

    let view_mode = "summary";
</script>

<!-- Popover shows summaries of entities -->
<Popover {selected_entity} />

<div class="viewcontrol">
    View mode:
    <label for="summary"
        ><input
            type="radio"
            name="view_mode"
            bind:group={view_mode}
            value="summary"
            id="summary"
        />summary</label
    >
    <label for="detail"
        ><input
            type="radio"
            name="view_mode"
            bind:group={view_mode}
            value="detail"
            id="detail"
        />detail</label
    >
</div>

<div class="coremodel">
    <Column column="capabilities" {view_mode} bind:selected_entity />
    <Arrow text="predict" />
    <Column column="performance" {view_mode} bind:selected_entity />
    <Arrow text="predicts" />
    <Column column="outcomes" {view_mode} bind:selected_entity />
</div>

<style lang="scss">
    .viewcontrol {
        margin: 2em;
        label {
            border: 1px solid var(--color-grey-light);
            padding: 0.25em 0.5em 0.25em 0;
            border-radius: 0.5em;
        }
    }
    .coremodel {
        display: flex;
        flex-direction: row;
        column-gap: 1em;
        align-items: center;
    }
</style>

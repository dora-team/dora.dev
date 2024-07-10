<script>
    import Column from "./lib/Column.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Popover from "./lib/Popover.svelte";
    import ViewControl from "./lib/ViewControl.svelte";

    import DORAlogo from "./assets/icon-color-alt.svg";

    let selected_entity = "unspecified";

    let view_mode = "summary";
</script>

<!-- Popover shows summaries of entities -->
<Popover {selected_entity} />

<div class="header">
    <div class="title"><img src="{DORAlogo}" alt="DORA"><h1>Core Model</h1></div>
    <div class="view-control"><ViewControl bind:view_mode /></div>
</div>

<div class="coremodel">
    <Column column="capabilities" {view_mode} bind:selected_entity />
    <Arrow text="predict" {view_mode} />
    <Column column="performance" {view_mode} bind:selected_entity />
    <Arrow text="predicts" {view_mode} />
    <Column column="outcomes" {view_mode} bind:selected_entity />
</div>
<div class="version">DORA Core model v2.0.0</div>

<style lang="scss">
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        div {

            &.title {
                font-size: 1.25rem;
                font-weight: bold;
                padding-left: 0.25rem;
                display:flex;
                gap:.5rem;

                img {
                    width:2rem;
                }

                h1 {
                    font-size:1.5rem;
                }

            }
        }
    }
    .coremodel {
        display: flex;
        flex-direction: row;
        column-gap: 0.25em;
        align-items: center;
    }
    .version {
        font-size: 0.75rem;
        color: var(--color-grey-medium);
        text-align: right;
        margin-bottom:2rem;
    }
</style>

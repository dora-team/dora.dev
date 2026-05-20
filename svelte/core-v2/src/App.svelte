<script>
    import Column from "./lib/Column.svelte";
    import Arrow from "./lib/Arrow.svelte";
    import Popover from "./lib/Popover.svelte";
    import ViewControl from "./lib/ViewControl.svelte";
    import Footer from "./lib/Footer.svelte";

    import DORAlogo from "./assets/dora-icon-color-alt.svg";
</script>

<!-- Popover shows summaries of entities -->
<Popover />

<div class="header">
    <div class="title"><img src="{DORAlogo}" alt="DORA"><h1>Core Model</h1></div>
    <div class="view-control"><ViewControl /></div>
</div>

<div class="coremodel">
    <Column column="capabilities" />
    <Arrow text="predict" />
    <Column column="performance" />
    <Arrow text="predicts" />
    <Column column="outcomes" />
</div>
<Footer />

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

        @media (max-width: 800px) {
            flex-direction: column;
            row-gap: 0.5rem;
            margin:0 1em;
        }
    }
</style>

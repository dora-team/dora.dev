<script>
    import { sentenceCase } from "./utils.js";

    import EntityGroup from "./EntityGroup.svelte";

    import core_data from "./core_data.json";

    export let column;
    export let selected_entity;
    export let view_mode = "summary";
</script>

<section class="{column} {view_mode}">
    <div class="heading">{sentenceCase(column)}</div>
    <div class="entities">
        {#each Object.entries(core_data[column]) as [entity_group_id, entity_group]}
            <EntityGroup
                {column}
                {entity_group_id}
                {entity_group}
                {view_mode}
                bind:selected_entity
            />
        {/each}
    </div>
</section>

<style lang="scss">
    section {
        display: flex;
        flex-direction: column;
        background-color: black; /* default; this may be overridden per instance */
        border: 2px solid black; /* default; this may be overridden per instance */
        border-radius: 1rem;
        overflow: hidden;
        transition: all 0.3s linear;

        .heading {
            display: block;
            margin: 0;
            padding: 0.25rem 1rem;
            font-size: 1.75rem;
            font-weight: 500;
            color: white;
            background-color: black; /* default; this may be overridden per instance */
        }

        .entities {
            flex-grow: 1;
            background-color: var(--color-background);
            display: flex;
            flex-direction: column;
        }
    }
    section.capabilities {
        background-color: var(--color-capabilities);
        border-color: var(--color-capabilities);
        .heading {
            background-color: var(--color-capabilities);
        }

        &.summary {
            height: 12.5rem;
            width:20rem;
        }

        &.detail {
            height: 36rem;
            width:30rem;
        }
    }
    section.performance {
        background-color: var(--color-performance);
        border-color: var(--color-performance);

        width: 16rem;
        .heading {
            background-color: var(--color-performance);
        }
        &.summary {
            height: 10.5rem;
        }

        &.detail {
            height: 32rem;
        }
    }
    section.outcomes {
        background-color: var(--color-outcomes);
        border-color: var(--color-outcomes);
        width: 16rem;
        .heading {
            background-color: var(--color-outcomes);
        }
        &.summary {
            height: 9.75rem;
        }

        &.detail {
            height: 24rem;
        }
    }
</style>

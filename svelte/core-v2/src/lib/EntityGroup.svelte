<script>
    import Entity from "./Entity.svelte";

    export let column; // column containing this group (e.g. "capabilities")
    export let entity_group_id;
    export let entity_group;
    export let view_mode;
    export let selected_entity;

    function openPopover(entity) {
        selected_entity = entity;
        document.getElementById("entityPopover").showPopover();
    }
</script>

<div class="entity-group {view_mode} {column}">
    <h3 on:click={() => openPopover(entity_group_id)}>
        {entity_group["name"]}
        {#if entity_group["measured_by"]}
            <small>measured by</small>
            <h5>
                {entity_group["measured_by"]}{#if view_mode === "detail"}:{/if}
            </h5>
        {/if}
    </h3>
    <div class="entities">
        {#each Object.entries(entity_group["entities"]) as [entity, details]}
            <Entity {entity} {details} {view_mode} bind:selected_entity />
        {/each}
    </div>
</div>

<style lang="scss">
    .entity-group {
        transition: all 0.3s linear;
        margin: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        padding: 0.25rem ;

        h3 {
            font-size:1.15rem;
            padding: 0;
            margin: 0;
            font-weight: 500;
            cursor: pointer;
        }

        small {
            display: block;
            overflow: hidden;
            transition: height 0.3s linear;
            font-style: italic;
            font-size:.85rem;
            color: var(--color-grey-medium);
        }

        h5 {
            padding: 0;
            margin: 0;
            font-weight: 500;
            font-size: .85rem;
            color: var(--color-grey-dark);
            text-transform: none;
            letter-spacing: normal;
            white-space: nowrap;
        }

        .entities {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.25rem 0.5rem;
            transition: all 0.3s linear;
            align-items: stretch;
        }

        &.capabilities {
            &.summary {
                /* we want the Capabilities column to be taller than the Performance column, so cheat it a bit here */
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }

            .entities {
                grid-template-columns: 1fr 1fr;
            }
        }

        &.summary {
            border: 1px solid var(--color-grey-light);
            small {
                height: 0lh;
            }

            .entities {
                gap: 0;
            }
        }

        &.detail {
            border: 1px solid var(--color-background);

            &:not(:last-child) {
                border-radius: 0;
                &.capabilities {
                    border-bottom: 1px solid var(--color-capabilities);
                }
                &.performance {
                    border-bottom: 1px solid var(--color-performance);
                }
                &.outcomes {
                    border-bottom: 1px solid var(--color-outcomes);
                }
            }
            small {
                height: 1lh;
            }
        }
    }
</style>

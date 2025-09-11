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
    <button
        class="group-name"
        on:click={() => openPopover(entity_group_id)}
    >
        <span class="entity-group-name">{entity_group["name"]}</span>
        {#if entity_group["measured_by"]}
            <small>measured by</small>
            <h5>
                {entity_group["measured_by"]}{#if view_mode === "detail"}:{/if}
            </h5>
        {/if}
    </button>
    <div class="entities-wrapper" id={entity_group_id}>
        <div class="entities">
            {#each Object.entries(entity_group["entities"]) as [entity, details]}
                <Entity {entity} {details} {view_mode} bind:selected_entity />
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .entity-group {
        transition: var(--default-transition);
        border-radius: 0.5rem;
        margin: 0.25rem 0.5rem;
        padding: 0.25rem 0.25rem 0.15rem 0.25rem;
        border: 1px solid var(--color-grey-light);
        overflow: hidden;

        .entity-group-name {
            display: block;
            border-bottom: 1px solid var(--color-background);
            transition: var(--default-transition);
            padding-bottom: 0.25rem;
        }

        .group-name {
            font-size: 1.15rem;
            padding: 0;
            margin: 0;
            font-weight: 500;
            cursor: pointer;
            outline:none;
            background: none;
            border: none;
            color: inherit;
            width: 100%;
            font-family: inherit;
            line-height: inherit;
            letter-spacing: inherit;
        }

        small {
            display: block;
            overflow: hidden;
            font-variant: italic;
            font-size: 0.85rem;
            height: 0;
            color: var(--color-grey-medium);
            transition: var(--default-transition);
        }

        h5 {
            padding: 0;
            margin: 0;
            font-weight: 500;
            font-size: 0.85rem;
            color: var(--color-grey-dark);
            text-transform: none;
            letter-spacing: normal;
            white-space: nowrap;
        }

        .entities-wrapper {
            height: 0;
            overflow: hidden;
            transition: var(--default-transition);
            width: 14rem;
            margin: auto;

            .entities {
                display: grid;
                margin-top: 0.5rem;
                grid-template-columns: 1fr;
                gap: 0.25rem 0.5rem;
                transition: var(--default-transition);
                align-items: stretch;
                opacity: 0;
            }
        }

        &.capabilities {
            .entities {
                grid-template-columns: 1fr 1fr;
            }
        }

        &.detail {
            border: 1px solid var(--color-background);
            margin: 0;
            .entity-group-name {
                border-bottom: 1px solid var(--color-grey-medium);
            }
            small {
                height: 1lh;
            }
            .entities-wrapper {
                height: 3rem;
            }
            .entities {
                opacity: 1;
            }
        }
    }

    // cababilities is two-column, so entities-wrapper needs to be wider
    .capabilities .entities-wrapper {
        width: 26rem;
    }
    .performance .entities-wrapper {
        width: 16rem;
    }
    .outcomes .entities-wrapper {
        width: 15rem;
    }

    // group-specific entity-group sizes in detail / expanded mode
    .entity-group.detail {
        .entities-wrapper {
            &#climate-for-learning {
                height: 6.5rem;
            }
            &#fast-flow {
                height: 12.5rem;
            }
            &#fast-feedback {
                height: 9rem;
            }
            &#software-delivery {
                height: 9.75rem;
            }
            &#reliability {
                height: 9.5rem;
            }
            &#organizational-performance {
                height: 5.25rem;
            }
            &#well-being {
                height: 9.5rem;
            }
        }
    }
</style>

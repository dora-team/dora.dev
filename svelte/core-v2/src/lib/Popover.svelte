<script>
    import core_data from "./core_data.json";

    export let selected_entity = "unspecified";

    let name = "";
    let summary = "";
    let link = "";

    // TODO: this can probably be made more spiffy/functional
    function populateDetails(entity) {
        for (const column in core_data) {
            for (const entity_group in core_data[column]) {
                if (entity_group === selected_entity) {
                    // user has clicked on a group title
                    name = core_data[column][entity_group]["name"];
                    summary = core_data[column][entity_group]["summary"];
                    link = core_data[column][entity_group]["link"];
                } else {
                    // user has clicked on an entity title
                    for (const entity in core_data[column][entity_group][
                        "entities"
                    ]) {
                        if (entity === selected_entity) {
                            name =
                                core_data[column][entity_group]["entities"][
                                    entity
                                ]["name"];
                            summary =
                                core_data[column][entity_group]["entities"][
                                    entity
                                ]["summary"];
                            link =
                                core_data[column][entity_group]["entities"][
                                    entity
                                ]["link"];
                        }
                    }
                }
            }
        }
    }

    // when the selected entity changes, find its associated info
    $: populateDetails(selected_entity);
</script>

<div id="entityPopover" popover="auto">
    <div class="header">
        <h1>{name}</h1>
        <div>
            <a
                href="."
                on:click={(e) => {
                    e.preventDefault();
                    document.getElementById("entityPopover").hidePopover();
                }}>&times;</a
            >
        </div>
    </div>

    <p>{@html summary}</p>
    <div class="footer">
        {#if link}
            <a href={link} target="_blank">Learn more about {name.toLowerCase()}</a>
        {/if}
    </div>
</div>

<!-- this is a hack! the HTML native `popover` function provides for a `::backdrop` pseudo-element (see below)
    which obscures everything under the popover. BUT it doesn't deactivate links underneath the backdrop.
    So, we add this full-page div, and use styles (see `#link-blocker` styles below) to show it whenever the
    popover is visible.
    -->
<div id="link-blocker"></div>

<style lang="scss">
    :global(:root) {
        #link-blocker {
            z-index: 999;
            width: 100vw;
            height: 100vh;
            opacity: 0;
            position: fixed;
            left: 0;
            top: 0;
            display: none;
        }

        &:has(:popover-open) #link-blocker {
            display: block;
        }
    }

    #entityPopover {
        width: min(960px, calc(100vw - 2rem));
        margin: 10vh auto;
        border: none;
        border-radius: 1em;
        text-align: left;
        padding: 0;

        &:popover-open {
            display: flex;
            flex-direction: column;
        }

        .header {
            margin: 0;
            background-color: var(--color-grey-light);
            display: flex;
            flex-direction: row;
            h1 {
                flex-grow: 1;
                padding-left: 1rem;
                font-size: 2rem;
                line-height: 3rem;
                font-weight: 500;
            }
            a {
                font-size: 2em;
                text-decoration: none;
                color: var(--color-grey-dark);
                background-color: var(--color-grey-lighter);
                // border:1px solid var(--color-grey-medium);
                border-radius: 0.5rem;
                display: block;
                height: 1.25em;
                line-height: 1.25em;
                width: 1.25em;
                text-align: center;
                margin: 0.5em;
                cursor: pointer;
            }
        }

        p {
            flex-grow: 1;
            padding: 1rem;
            padding-inline: 2.5rem;
            line-height: 1.75;
        }

        .footer {
            text-align: center;
            padding: 0 .5rem 1rem .5rem;

            a {
                border:1px solid var(--color-grey-light);
                display:inline-block;
                border-radius: .25rem;
                padding:.25rem .75rem;
                text-decoration: none;
            }
        }

        &::backdrop {
            background-color: var(--popover-backdrop);
            backdrop-filter: blur(2px);
        }
    }
</style>

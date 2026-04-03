<script lang="ts">
    import { onMount } from "svelte";
    import { sendAnalyticsEvent, numberToWord } from "./utils";
    import Capability from "./Capability.svelte";
    import PrioritizationResults from "./PrioritizationResults.svelte";
    // @ts-ignore
    import capability_prioritization_questions_raw from "./data/capability_prioritization_questions.json";
    import type { Capability as CapabilityType } from "./types";

    const capability_prioritization_questions = capability_prioritization_questions_raw as CapabilityType[];

    export let current_capability = -1;
    let capability_count = capability_prioritization_questions.length;
    let capability_dom_elements: HTMLElement[] = [];
    let capability_container: HTMLElement;

    let capability_responses: Record<string, number[]> = {};
    capability_prioritization_questions.forEach((capability) => {
        capability_responses[capability.shortname] = [];
    });

    $: capability_names_list = new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
    }).format(
        capability_prioritization_questions.map((c) => c.capability_name),
    );

    // TODO: change this to allow direct specification of step (ie. `loadCapability(x)`) -- this will be cleaner for the onMount event so we can e.g. skip directly to priorities
    function nextCapability() {
        current_capability++;

        // move the previous question out of the way, and the next question into place.
        if (capability_dom_elements[current_capability - 1]) {
            capability_dom_elements[current_capability - 1].style.transform =
                "translateX(-100%)";
            capability_dom_elements[current_capability - 1].style.opacity = "0";
        }
        capability_dom_elements[current_capability].style.transform =
            "translateX(0%)";
        capability_dom_elements[current_capability].style.opacity = "1";

        // resize container to fit its contents
        capability_container.style.height = `${capability_dom_elements[current_capability].offsetHeight}px`;

        if (current_capability > 0) {
            const el = document.getElementById("help-me-prioritize");
            if (el) {
                window.scrollTo({
                    top: el.offsetTop,
                    behavior: "smooth",
                });
            }

            if (current_capability == capability_count) {
                sendAnalyticsEvent("quick_check_priorities");
            }
        }
    }

    onMount(() => {
        // extract responses from URL and cast as Int
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            capability_prioritization_questions.forEach((capability) => {
                if (url.searchParams.has(capability.shortname)) {
                    capability_responses[capability.shortname] =
                        url.searchParams
                            .get(capability.shortname)!
                            .split("")
                            .map((x) => parseInt(x));
                }
            });
        }
        nextCapability();
    });
</script>

<section id="help-me-prioritize">
    <div id="whats-holding-you-back" class:show={current_capability == 0}>
        <h2>What's holding you back?</h2>
        <p>
            In our <a href="/research">research</a>, DORA has identified several
            key capabilities which drive higher software delivery and
            organizational performance. Improving these technical, process, and
            cultural capabilities can help your team deliver more value to your
            customers and organization. It's important to focus your efforts on
            the specific thing that is currently holding you back. While every
            team will take a different journey, we have identified {numberToWord(
                capability_count,
            )}
            capabilities that are often beneficial to improve:
            <strong>{capability_names_list}</strong>.
        </p>
    </div>

    <div id="capability_container" bind:this={capability_container}>
        {#each capability_prioritization_questions as capability, counter}
            <div
                class="capability {capability.shortname}"
                style:transform={counter == 0
                    ? "translateX(0)"
                    : "translateX(100%)"}
                bind:this={capability_dom_elements[counter]}
            >
                <!-- render each set of capabilty questions; listen for the 'next Capability' event  -->
                <Capability
                    {capability}
                    {capability_count}
                    bind:current_capability_index={current_capability}
                    bind:this_capability_responses={capability_responses[
                        capability.shortname
                    ]}
                    on:nextCapability={nextCapability}
                />
            </div>
        {/each}
        <div
            class="capability results"
            style:transform={"translateX(100%)"}
            bind:this={capability_dom_elements[capability_count]}
        >
            <PrioritizationResults
                {capability_prioritization_questions}
                {capability_responses}
            />
        </div>
    </div>
</section>

<style lang="scss">
    section {
        border-top: 1px solid var(--border-color-medium);
        margin: 1.5rem 0;
    }
    #whats-holding-you-back {
        height: 0;
        overflow: hidden;
        &.show {
            height: auto;
        }
        transform: all 0.5s ease-in-out;
    }
    #capability_container {
        padding: 0.75rem 0;
        overflow: hidden;
        position: relative;
        transition: all 0.5s ease-in-out;
        .capability {
            position: absolute;
            opacity: 0;
            transition: all 0.5s ease-in-out;
        }
    }

    /* There's no elegant way to use global variables for media queries (css variables aren't supported for this purpose, 
    and SCSS vars are hard to propagate between different svelte components).
    So we'll use a "magic number" of 800px, in each file */
    @media (max-width: 800px) {
        section {
            padding: 0 1rem;
        }
    }
</style>

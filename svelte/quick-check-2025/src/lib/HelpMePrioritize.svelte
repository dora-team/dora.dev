<script lang="ts">
    import { onMount } from 'svelte';
    import { sendAnalyticsEvent, numberToWord } from './utils';
    import Capability from './Capability.svelte';
    import PrioritizationResults from './PrioritizationResults.svelte';
    // @ts-ignore
    import capability_prioritization_questions_raw from './data/capability_prioritization_questions.json';
    import type { Capability as CapabilityType } from './types';

    const capability_prioritization_questions =
        capability_prioritization_questions_raw as CapabilityType[];

    let {
        current_capability = $bindable(-1),
    }: {
        current_capability: number;
    } = $props();

    let capability_count = capability_prioritization_questions.length;
    let capability_dom_elements: HTMLElement[] = $state([]);
    let capability_container: HTMLElement | undefined = $state();

    let capability_responses: Record<string, number[]> = $state({});
    capability_prioritization_questions.forEach((capability) => {
        capability_responses[capability.shortname] = [];
    });

    let capability_names_list = $derived(
        new Intl.ListFormat('en', {
            style: 'long',
            type: 'conjunction',
        }).format(
            capability_prioritization_questions.map((c) => c.capability_name),
        ),
    );

    function nextCapability() {
        current_capability++;

        // move the previous question out of the way, and the next question into place.
        if (capability_dom_elements[current_capability - 1]) {
            capability_dom_elements[current_capability - 1].style.transform =
                'translateX(-100%)';
            capability_dom_elements[current_capability - 1].style.opacity = '0';
        }
        if (capability_dom_elements[current_capability]) {
            capability_dom_elements[current_capability].style.transform =
                'translateX(0%)';
            capability_dom_elements[current_capability].style.opacity = '1';

            // resize container to fit its contents
            if (capability_container) {
                capability_container.style.height = `${capability_dom_elements[current_capability].offsetHeight}px`;
            }
        }

        if (current_capability > 0) {
            const el = document.getElementById('help-me-prioritize');
            if (el) {
                window.scrollTo({
                    top: el.offsetTop,
                    behavior: 'smooth',
                });
            }

            if (current_capability == capability_count) {
                sendAnalyticsEvent('quick_check_priorities');
            }
        }
    }

    onMount(() => {
        // extract responses from URL and cast as Int
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            capability_prioritization_questions.forEach((capability) => {
                if (url.searchParams.has(capability.shortname)) {
                    capability_responses[capability.shortname] =
                        url.searchParams
                            .get(capability.shortname)!
                            .split('')
                            .map((x) => parseInt(x, 10));
                }
            });
        }
        nextCapability();
    });
</script>

<section id="help-me-prioritize">
    <div
        id="whats-holding-you-back"
        class:show={current_capability == 0}
        aria-hidden={current_capability != 0}
    >
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
                    ? 'translateX(0)'
                    : 'translateX(100%)'}
                bind:this={capability_dom_elements[counter]}
            >
                <Capability
                    {capability}
                    {capability_count}
                    current_capability_index={current_capability}
                    bind:this_capability_responses={capability_responses[
                        capability.shortname
                    ]}
                    onNextCapability={nextCapability}
                />
            </div>
        {/each}
        <div
            class="capability results"
            style:transform={'translateX(100%)'}
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
        transition: all 0.5s ease-in-out;
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
            width: 100%;
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

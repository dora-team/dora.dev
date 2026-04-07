<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { sendAnalyticsEvent, numberToWord } from './utils';
    import Capability from './Capability.svelte';
    import PrioritizationResults from './PrioritizationResults.svelte';
    // @ts-ignore
    import capability_prioritization_questions_raw from './data/capability_prioritization_questions.json';
    import type { Capability as CapabilityType } from './types';

    const capability_prioritization_questions =
        capability_prioritization_questions_raw as CapabilityType[];

    let {
        current_capability = $bindable(0),
    }: {
        current_capability: number;
    } = $props();

    let capability_count = capability_prioritization_questions.length;
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

        if (current_capability > 0) {
            const el = document.getElementById('help-me-prioritize');
            if (el) {
                window.scrollTo({
                    top: el.offsetTop,
                    behavior: 'smooth',
                });
            }

            if (current_capability === capability_count) {
                sendAnalyticsEvent('quick_check_priorities');
            }
        }
    }

    onMount(() => {
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
    });
</script>

<section id="help-me-prioritize">
    {#if current_capability === 0}
        <div
            id="whats-holding-you-back"
            transition:fly={{ y: 20, duration: 300 }}
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
    {/if}

    <div id="capability_container">
        {#each capability_prioritization_questions as capability, counter}
            {#if current_capability === counter}
                <div
                    class="capability {capability.shortname}"
                    in:fly={{ x: 300, duration: 300, delay: 300 }}
                    out:fly={{ x: -300, duration: 300 }}
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
            {/if}
        {/each}
        
        {#if current_capability === capability_count}
            <div
                class="capability results"
                in:fly={{ x: 300, duration: 300, delay: 300 }}
            >
                <PrioritizationResults
                    {capability_prioritization_questions}
                    {capability_responses}
                />
            </div>
        {/if}
    </div>
</section>

<style lang="scss">
    section {
        border-top: 1px solid var(--border-color-medium);
        margin: 1.5rem 0;
    }
    #whats-holding-you-back {
        overflow: hidden;
        transition: all 0.5s ease-in-out;
    }
    #capability_container {
        padding: 0.75rem 0;
        min-height: 400px;
        position: relative;
        .capability {
            width: 100%;
        }
    }

    @media (max-width: 800px) {
        section {
            padding: 0 1rem;
        }
    }
</style>

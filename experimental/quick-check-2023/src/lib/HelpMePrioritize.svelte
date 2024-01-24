<script>
    import { onMount } from "svelte";
    import Capability from "./Capability.svelte";
    import capability_prioritization_questions from "./data/capability_prioritization_questions.json";

    let index = -1;
    let capability_count = capability_prioritization_questions.length;
    let capability_dom_elements = [];
    let capability_container;

    function nextCapability() {
        index++;

        // move the previous question out of the way, and the next question into place.
        if (index < capability_count) {
            if (capability_dom_elements[index - 1]) {
                capability_dom_elements[index - 1].style.transform = "translateX(-100%)";
                capability_dom_elements[index - 1].style.opacity = "0";
            }
            capability_dom_elements[index].style.transform = "translateX(0%)";
            capability_dom_elements[index].style.opacity = "1";

            // resize container to fit its contents
            capability_container.style.height = `${capability_dom_elements[index].offsetHeight}px`;
        }
    }

    onMount(() => {
        nextCapability();
    });
</script>

<section>
    <h2>What's holding you back?</h2>
    <p>
        In our <a href="/research">research</a>, DORA has identified several key
        capabilities which drive higher software delivery and organizational
        performance. Improving these technical, process, and cultural
        capabilities can help your team deliver more value to your customers and
        organization. It's important to focus your efforts on the specific thing
        that is currently holding you back. While every team will take a
        different journey, we have identified three capabilities that are often
        beneficial to improve: <strong>Continuous Integration</strong>,
        <strong>Loosely Coupled Architecture</strong>, and
        <strong>Generative Organizational Culture</strong>.
    </p>
</section>

<div class="capability_container" bind:this={capability_container}>
    {#each capability_prioritization_questions as capability, counter}
        <div
            class="capability"
            style:transform={counter == 0
                ? "translateX(0)"
                : "translateX(100%)"}
            bind:this={capability_dom_elements[counter]}
        >
            <!-- render each set of capabilty questions; listen for the 'next Capability' event  -->
            <Capability {capability} {capability_count} bind:index on:nextCapability={nextCapability} />
        </div>
    {/each}
</div>

<style lang="scss">
    section {
        border-top: 1px solid var(--border-color-medium);
        padding: 0.75rem 0;
        margin: 1.5rem 0;
    }

    .capability_container {
        overflow: hidden;
        position: relative;
        transition: all 0.5s ease-in-out;
        .capability {
            position: absolute;
            opacity: 0;
            transition: all 0.5s ease-in-out;
        }
    }
</style>

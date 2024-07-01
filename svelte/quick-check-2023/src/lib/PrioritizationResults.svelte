<script>
    import PrioritizationResult from "./PrioritizationResult.svelte";

    export let capability_prioritization_questions;
    
    export let capability_responses;
</script>

<div class="prioritize_step">
    <h2>Capabilities analysis</h2>
    <p>Based on your responses, here's how your team is performing:</p>
    <div class="results">
        {#each capability_prioritization_questions as question, idx}
            <PrioritizationResult
                {question}
                this_capability_responses={capability_responses[
                    question.shortname
                ]}
            />
        {/each}
    </div>
    <div>
        <p>
            These are only three of the capabilities that our research has shown
            to predict software delivery and operations performance. Here are
            some resources to help you plan the next step of your DevOps
            journey:
        </p>

        <ul>
            <li>
                <h3>
                    <a href="/capabilities/" target="_blank"
                        >Explore DORA's Capabilities Catalog</a
                    >
                </h3>
                <p>
                    Learn about all of the technical, process, and cultural
                    capabilities that our research has shown to be predictive of
                    software delivery performance.
                </p>
            </li>
            <li>
                <h3>
                    <a href="https://bit.ly/dora-sodr" target="_blank"
                        >Read the latest Accelerate State of DevOps Report</a
                    >
                </h3>
                <p>Explore recent findings from DORA's research project.</p>
            </li>
            <li>
                <h3>
                    <a href="https://dora.community" target="_blank"
                        >Join DORA's global community of practice</a
                    >
                </h3>
                <p>
                    Learn, discuss, and collaborate on strategies for leveraging
                    DORA research in your organization.
                </p>
            </li>
        </ul>
    </div>
</div>

<style lang="scss">
    .results {
        padding: 2rem 4rem;
    }

    /* There's no elegant way to use global variables for media queries (css variables aren't supported for this purpose, 
    and SCSS vars are hard to propagate between different svelte components).
    So we'll use a "magic number" of 800px, in each file */
    @media (max-width: 800px) {
        .results {
            padding: 1rem 0.5rem;
        }
    }
</style>

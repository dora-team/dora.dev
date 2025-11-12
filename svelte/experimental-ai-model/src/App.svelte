<script>
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  import Capability from "./lib/Capability.svelte";
  import Outcome from "./lib/Outcome.svelte";
  const { capabilities, outcomes, connections } = data;
  let hoveredCapabilityId = $state(null);
  let hoveredOutcomeId = $state(null);

  let connectedOutcomeIds = $derived(
    hoveredCapabilityId
      ? connections
          .filter((c) => c.from === hoveredCapabilityId)
          .map((c) => c.to)
      : [],
  );
  let connectedCapabilityIds = $derived(
    hoveredOutcomeId
      ? connections.filter((c) => c.to === hoveredOutcomeId).map((c) => c.from)
      : [],
  );
</script>

<main>
  <div class="model-container">
    <div class="model">
      <div class="ai_adoption">
        <div
          class="entity"
          class:hovered={hoveredCapabilityId || hoveredOutcomeId}
        >
          AI adoption
        </div>
      </div>
      <div class="x">
        <div
          class="entity"
          class:hovered={hoveredCapabilityId || hoveredOutcomeId}
        >
          &times;
        </div>
      </div>
      <div class="capabilities">
        {#each capabilities as capability}
          <div
            onmouseover={() => (hoveredCapabilityId = capability.id)}
            onmouseout={() => (hoveredCapabilityId = null)}
          >
            <Capability
              {capability}
              dimmed={(hoveredCapabilityId &&
                hoveredCapabilityId !== capability.id) ||
                (hoveredOutcomeId &&
                  !connectedCapabilityIds.includes(capability.id))}
              hovered={hoveredCapabilityId === capability.id ||
                (hoveredOutcomeId &&
                  connectedCapabilityIds.includes(capability.id))}
            />
          </div>
        {/each}
      </div>
      <div class="connectors">
        {#each connections as connection}
          <Connector
            fromId={connection.from}
            toId={connection.to}
            index={connection.index}
            {hoveredCapabilityId}
            {hoveredOutcomeId}
          />
        {/each}
      </div>
      <div class="outcomes">
        {#each outcomes as outcome}
          <div
            onmouseover={() => (hoveredOutcomeId = outcome.id)}
            onmouseout={() => (hoveredOutcomeId = null)}
          >
            <Outcome
              {outcome}
              dimmed={(hoveredCapabilityId &&
                !connectedOutcomeIds.includes(outcome.id)) ||
                (hoveredOutcomeId && hoveredOutcomeId !== outcome.id)}
            />
          </div>
        {/each}
      </div>
    </div>
    <div class="snippet">
      <strong>Team performance</strong> Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Fusce sit amet laoreet mi. Vivamus
      interdum justo ex, commodo porttitor ante mattis et. Pellentesque neque
      augue, sollicitudin vel massa et, lobortis bibendum libero. Ut arcu
      tellus, dictum et consectetur vitae, euismod quis urna. Morbi dictum
      molestie ligula, quis commodo orci pharetra a. Nulla consequat, purus eu
      faucibus commodo, nisi purus egestas massa, eu tempus elit ligula non est.
      <div class="snippet-links">
        <div>
          <a href="#" class="button">Learn more about Team performance</a>
        </div>
        <div>
          <a href="#" class="button">How to assess Team performance</a>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  :root {
    background-color: var(--dora-primary-light);
  }

  :global(.model-container) {
    width: fit-content;
    border: 1px solid var(--dora-primary-dark);
    max-width: 800px;
    border-radius: 24px;
    padding: 12px 6px;
    background-color: white;

    :global(.model) {
      display: flex;
      flex-direction: row;
      align-items: center;

      :global(.entity) {
        border: 1px solid var(--dora-primary-dark);
        border-radius: 4px;
        padding: 4px 12px;
        margin: 12px;
        font-size: 14px;
        font-weight: 500;
        /* text-wrap: nowrap; */
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        font-size: clamp(0.6rem, 0.8vw, 1rem);
      }

      :global(.hovered) {
        background-color: var(--dora-secondary-c);
      }

      .connectors {
        width: 120px;
        position: relative;
        align-self: stretch;
      }

      .x .entity {
        margin: 0px;
      }
    }

    .snippet {
      margin:4px 12px;
      font-size:.85em;

      strong {
       font-weight:700;
      }

      .snippet-links {
        display: flex;
      }
    }
  }
</style>

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
  <div class="model">
    <div class="ai_adoption">
      <div class="entity" class:hovered={hoveredCapabilityId || hoveredOutcomeId}>AI Adoption</div>
    </div>
    <div class="x">
      <div class="entity" class:hovered={hoveredCapabilityId || hoveredOutcomeId}>&times;</div>
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
</main>

<style>
  :root {
    background-color: var(--dora-primary-light);
  }
  :global(.model) {
    width:fit-content;
    border: 1px solid var(--dora-primary-dark);
    max-width: 800px;
    border-radius: 24px;
    padding: 12px 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;

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
      font-size: clamp(0.6rem, .8vw, 1rem);
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
      margin:0px;
    }
  }
</style>
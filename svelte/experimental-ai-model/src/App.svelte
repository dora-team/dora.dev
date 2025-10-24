<script>
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  import Capability from "./lib/Capability.svelte";
  import Outcome from "./lib/Outcome.svelte";
  const { capabilities, outcomes, connections } = data;
  let hoveredCapabilityId = null;
  let hoveredOutcomeId = null;

  let connectedOutcomeIds = [], connectedCapabilityIds = [];
  $: {
    connectedOutcomeIds = hoveredCapabilityId
      ? connections.filter((c) => c.from === hoveredCapabilityId).map((c) => c.to)
      : [];
    connectedCapabilityIds = hoveredOutcomeId
      ? connections.filter((c) => c.to === hoveredOutcomeId).map((c) => c.from)
      : [];
  }
</script>

<main>
  <div class="model">
    <div class="ai_adoption">
      <div class="entity">AI Adoption</div>
    </div>
    <div class="x">
      <div class="entity">&times;</div>
    </div>
    <div class="capabilities">
      {#each capabilities as capability}
        <div
          on:mouseover={() => (hoveredCapabilityId = capability.id)}
          on:mouseout={() => (hoveredCapabilityId = null)}
        >
          <Capability
            {capability}
            dimmed={(hoveredCapabilityId && hoveredCapabilityId !== capability.id) || (hoveredOutcomeId && !connectedCapabilityIds.includes(capability.id))}
            hovered={hoveredCapabilityId === capability.id || (hoveredOutcomeId && connectedCapabilityIds.includes(capability.id))}
          />
        </div>
      {/each}
    </div>
    <div class="connectors">
      {#each connections as connection}
        <Connector fromId={connection.from} toId={connection.to} index={connection.index} {hoveredCapabilityId} {hoveredOutcomeId}/>
      {/each}
    </div>
    <div class="outcomes">
      {#each outcomes as outcome}
        <div
          on:mouseover={() => (hoveredOutcomeId = outcome.id)}
          on:mouseout={() => (hoveredOutcomeId = null)}
        >
          <Outcome {outcome} dimmed={(hoveredCapabilityId && !connectedOutcomeIds.includes(outcome.id)) || (hoveredOutcomeId && hoveredOutcomeId !== outcome.id)} />
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
    border: 1px solid var(--dora-primary-dark);
    border-radius: 24px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;

    :global(.entity) {
      border: 1px solid var(--dora-primary-dark);
      border-radius: 4px;
      padding: 4px 12px;
      margin: 12px;
      font-size:14px;
      font-weight: 500;
      text-wrap: nowrap;
      transition:all 0.2s ease-in-out;
      cursor: pointer;
    }

    .connectors {
      width: 120px;
      padding-right:4px;
      position: relative;
      align-self: stretch;
    }
  }
</style>

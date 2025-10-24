<script>
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  import Capability from "./lib/Capability.svelte";
  import Outcome from "./lib/Outcome.svelte";
  const { capabilities, outcomes, connections } = data;
  let hoveredCapabilityId = null;

  let connectedOutcomeIds = [];
  $: {
    if (hoveredCapabilityId) {
      connectedOutcomeIds = connections
        .filter((c) => c.from === hoveredCapabilityId)
        .map((c) => c.to);
    } else {
      connectedOutcomeIds = [];
    }
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
            dimmed={hoveredCapabilityId && hoveredCapabilityId !== capability.id}
          />
        </div>
      {/each}
    </div>
    <div class="connectors">
      {#each connections as connection}
        <Connector fromId={connection.from} toId={connection.to} index={connection.index} {hoveredCapabilityId}/>
      {/each}
    </div>
    <div class="outcomes">
      {#each outcomes as outcome}
        <Outcome {outcome} dimmed={hoveredCapabilityId && !connectedOutcomeIds.includes(outcome.id)} />
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
    /* column-gap: 12px; */
    background-color: white;

    :global(.entity) {
      border: 1px solid var(--dora-primary-dark);
      border-radius: 4px;
      padding: 4px 12px;
      margin: 12px;
      font-size:14px;
      font-weight: 500;
      text-wrap: nowrap;
      transition:opacity 0.2s ease-in-out;
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

<script>
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  import Capability from "./lib/Capability.svelte";
  import Outcome from "./lib/Outcome.svelte";
  const { capabilities, outcomes } = data;
  let hoveredCapabilityId = null;

  const connections = [
    { from: "user-centric-focus", to: "team-performance", index: 0 },
    { from: "strong-version-control-practices", to: "team-performance", index: 1 },
    { from: "strong-version-control-practices", to: "individual-effectiveness", index: -1 },
    { from: "ai-accessible-internal-data", to: "code-quality", index: 0 },
    { from: "ai-accessible-internal-data", to: "individual-effectiveness", index: 0 },
    { from: "ai-accessible-internal-data", to: "product-performance", index: -1 },
    { from: "working-in-small-batches", to: "individual-effectiveness", index: 1 },
    { from: "working-in-small-batches", to: "product-performance", index: 0 },
    { from: "working-in-small-batches", to: "friction", index: -1 },
    { from: "clear-communicated-ai-stance", to: "individual-effectiveness", index: 2 },
    { from: "clear-communicated-ai-stance", to: "product-performance", index: 1 },
    { from: "clear-communicated-ai-stance", to: "friction", index: 0 },
    { from: "clear-communicated-ai-stance", to: "throughput", index: 0 },
    { from: "clear-communicated-ai-stance", to: "organizational-performance", index: -2 },
    { from: "quality-internal-platform", to: "friction", index: 1 },
    { from: "quality-internal-platform", to: "organizational-performance", index: -1 },
    { from: "healthy-data-ecosystems", to: "organizational-performance", index: 0 },
  ];

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
      font-weight: 400;
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

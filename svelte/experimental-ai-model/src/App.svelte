<script>
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  const { capabilities, outcomes } = data;
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
        <div class="entity" id={capability.id}>{capability.name}</div>
      {/each}
    </div>
    <div class="connectors">
      <Connector fromId="user-centric-focus" toId="team-performance" index="0"/>
      <Connector fromId="strong-version-control-practices" toId="team-performance" index="1" />
      <Connector fromId="strong-version-control-practices" toId="individual-effectiveness" index="-1" />
      <Connector fromId="ai-accessible-internal-data" toId="code-quality" index="0" />
      <Connector fromId="ai-accessible-internal-data" toId="individual-effectiveness" index="0" />
      <Connector fromId="ai-accessible-internal-data" toId="product-performance" index="-1" />
      <Connector fromId="working-in-small-batches" toId="individual-effectiveness" index="1" />
      <Connector fromId="working-in-small-batches" toId="product-performance" index="0" />
      <Connector fromId="working-in-small-batches" toId="friction" index="-1" />
      <Connector fromId="clear-communicated-ai-stance" toId="individual-effectiveness" index="2" />
      <Connector fromId="clear-communicated-ai-stance" toId="product-performance" index="1" />
      <Connector fromId="clear-communicated-ai-stance" toId="throughput" index="0" />
      <Connector fromId="clear-communicated-ai-stance" toId="organizational-performance" index="-2" />
      <Connector fromId="quality-internal-platform" toId="friction" index="0" />
      <Connector fromId="quality-internal-platform" toId="organizational-performance" index="-1" />
      <Connector fromId="healthy-data-ecosystems" toId="organizational-performance" index="0" />
    </div>
    <div class="outcomes">
      {#each outcomes as outcome}
        <div class="entity" id={outcome.id}>{outcome.name}</div>
      {/each}
    </div>
  </div>
</main>

<style>
  :root {
    background-color: var(--dora-primary-light);
  }
  .model {
    border: 1px solid var(--dora-primary-dark);
    border-radius: 24px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* column-gap: 12px; */
    background-color: white;

    .entity {
      border: 1px solid var(--dora-primary-dark);
      border-radius: 4px;
      padding: 4px 12px;
      margin: 12px;
      font-size:14px;
      font-weight: 400;
      text-wrap: nowrap;
    }

    .connectors {
      width: 120px;
      padding-right:4px;
      position: relative;
      align-self: stretch;
    }

    .outcomes .entity {
      background-color:var(--dora-highlight);
    }
  }
</style>

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
      <div class="entity">x</div>
    </div>
    <div class="capabilities">
      {#each capabilities as capability}
        <div class="entity" id={capability.id}>{capability.name}</div>
      {/each}
    </div>
    <div class="connectors">
      <Connector fromId="user-centric-focus" toId="team-performance" index="0"/>
      <Connector fromId="strong-version-control-practices" toId="team-performance" index="1" />
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
    column-gap: 12px;
    background-color: white;

    .entity {
      border: 1px solid var(--dora-primary-dark);
      border-radius: 4px;
      padding: 4px 12px;
      margin: 12px;
      /* text-wrap: nowrap; */
    }

    .connectors {
      width: 200px;
      padding-right:24px;
      position: relative;
      align-self: stretch;
    }

    .outcomes .entity {
      background-color:var(--dora-highlight);
    }
  }
</style>

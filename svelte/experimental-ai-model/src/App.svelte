<script lang="ts">
  import data from "./data.json";
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
    <div class="connectors">...</div>
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

    .entity {
      border: 1px solid var(--dora-primary-dark);
      border-radius: 4px;
      padding: 4px 12px;
      margin: 12px;
    }

    .outcomes .entity {
      background-color:var(--dora-highlight);
    }
  }
</style>

<script lang="ts">
  const capabilities = [
    { name: "User-centric Focus", id: "user-centric-focus" },
    {
      name: "Strong Version Control Practices",
      id: "strong-version-control-practices",
    },
    { name: "AI-accessible Internal Data", id: "ai-accessible-internal-data" },
    { name: "Working in Small Batches", id: "working-in-small-batches" },
    {
      name: "Clear + Communicated AI Stance",
      id: "clear-communicated-ai-stance",
    },
    { name: "Quality Internal Platform", id: "quality-internal-platform" },
    { name: "Healthy Data Ecosystems", id: "healthy-data-ecosystems" },
  ];
  const outcomes = [
    { name: "Team Performance", id: "team-performance" },
    { name: "Code Quality", id: "code-quality" },
    { name: "Individual Effectiveness", id: "individual-effectiveness" },
    { name: "Product Performance", id: "product-performance" },
    { name: "Friction", id: "friction" },
    { name: "Throughput", id: "throughput" },
    { name: "Organizational Performance", id: "organizational-performance" },
  ];
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

<script lang="ts">
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  import Capability from "./lib/Capability.svelte";
  import Outcome from "./lib/Outcome.svelte";
  import Snippet from "./lib/Snippet.svelte";

  type CapabilityData = {
    name: string;
    id: string;
    description?: string;
    capabilityId?: string;
  };
  type OutcomeData = { name: string; id: string; description?: string };
  type ConnectionData = { from: string; to: string; index: number };
  type SelectedEntity = { id: string; type: "capability" | "outcome" } | null;

  const { capabilities, outcomes, connections } = data as {
    capabilities: CapabilityData[];
    outcomes: OutcomeData[];
    connections: ConnectionData[];
  };

  let hoveredEntity = $state<{ id: string; type: "capability" | "outcome" } | null>(
    null,
  );
  let selectedEntity = $state<SelectedEntity>(null);

  let activeCapabilityId = $derived(
    hoveredEntity?.type === "capability"
      ? hoveredEntity.id
      : selectedEntity?.type === "capability"
        ? selectedEntity.id
        : null,
  );
  let activeOutcomeId = $derived(
    hoveredEntity?.type === "outcome"
      ? hoveredEntity.id
      : selectedEntity?.type === "outcome"
        ? selectedEntity.id
        : null,
  );

  let activeEntityData = $derived.by(() => {
    const currentSelectedEntity = selectedEntity;
    if (!currentSelectedEntity) {
      return null;
    }

    if (currentSelectedEntity.type === "capability") {
      return capabilities.find((c) => c.id === currentSelectedEntity.id);
    }
    if (currentSelectedEntity.type === "outcome") {
      return outcomes.find((o) => o.id === currentSelectedEntity.id);
    }
    return null;
  });

  let connectedOutcomeIds = $derived(
    activeCapabilityId
      ? connections
          .filter((c) => c.from === activeCapabilityId)
          .map((c) => c.to)
      : [],
  );
  let connectedCapabilityIds = $derived(
    activeOutcomeId
      ? connections.filter((c) => c.to === activeOutcomeId).map((c) => c.from)
      : [],
  );

  function handleBackgroundClick() {
    selectedEntity = null;
  }

  function handleCapabilityClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    selectedEntity = { id, type: "capability" };
  }

  function handleOutcomeClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    selectedEntity = { id, type: "outcome" };
  }
</script>

<main>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="model-container" onclick={handleBackgroundClick}>
    <div class="model">
      <div class="ai_adoption">
        <div
          class="entity"
          class:active={!!selectedEntity || !!hoveredEntity}
        >
          AI adoption
        </div>
      </div>
      <div class="x">
        <div
          class="entity"
          class:active={!!selectedEntity || !!hoveredEntity}
        >
          &times;
        </div>
      </div>
      <div class="capabilities">
        {#each capabilities as capability}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            onmouseover={() =>
              (hoveredEntity = { id: capability.id, type: "capability" })}
            onmouseout={() => (hoveredEntity = null)}
            onfocus={() =>
              (hoveredEntity = { id: capability.id, type: "capability" })}
            onblur={() => (hoveredEntity = null)}
            onclick={(e) => handleCapabilityClick(e, capability.id)}
            role="button"
            tabindex="0"
          >
            <Capability
              {capability}
              dimmed={!!(
                (activeCapabilityId && activeCapabilityId !== capability.id) ||
                (activeOutcomeId &&
                  !connectedCapabilityIds.includes(capability.id))
              )}
              active={activeCapabilityId === capability.id ||
                connectedCapabilityIds.includes(capability.id)}
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
            activeCapabilityId={activeCapabilityId}
            activeOutcomeId={activeOutcomeId}
          />
        {/each}
      </div>
      <div class="outcomes">
        {#each outcomes as outcome}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            onmouseover={() =>
              (hoveredEntity = { id: outcome.id, type: "outcome" })}
            onmouseout={() => (hoveredEntity = null)}
            onfocus={() =>
              (hoveredEntity = { id: outcome.id, type: "outcome" })}
            onblur={() => (hoveredEntity = null)}
            onclick={(e) => handleOutcomeClick(e, outcome.id)}
            role="button"
            tabindex="0"
          >
            <Outcome
              {outcome}
              dimmed={!!(
                (activeCapabilityId &&
                  !connectedOutcomeIds.includes(outcome.id)) ||
                (activeOutcomeId && activeOutcomeId !== outcome.id)
              )}
              active={activeOutcomeId === outcome.id ||
                connectedOutcomeIds.includes(outcome.id)}
            />
          </div>
        {/each}
      </div>
    </div>
    {#if activeEntityData}
      <Snippet {activeEntityData} {selectedEntity} />
    {/if}
  </div>
</main>

<style>
  :root {
    background-color: var(--dora-primary-light);
  }

  :global(.model-container) {
    width: 100%;
    margin: 0 auto;
    border: 1px solid var(--dora-primary-dark);
    border-radius: 24px;
    padding: 12px 6px;
    background-color: white;

    :global(.model) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      :global(.entity) {
        border: 1px solid var(--dora-primary-dark);
        background-color: var(--dora-warm-white);
        border-radius: 4px;
        padding: 4px 12px;
        margin: 12px;
        font-size: 14px;
        font-weight: 500;
        /* text-wrap: nowrap; */
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        font-size: clamp(0.6rem, 1.5vw, 1rem);

        &.active {
          background-color: var(--dora-mauve);
        }
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
  }
</style>

<script lang="ts">
  import data from "./data.json";
  import Connector from "./lib/Connector.svelte";
  import Capability from "./lib/Capability.svelte";
  import Outcome from "./lib/Outcome.svelte";

  type CapabilityData = { name: string; id: string };
  type OutcomeData = { name: string; id: string };
  type ConnectionData = { from: string; to: string; index: number };
  type SelectedEntity = { id: string; type: "capability" | "outcome" } | null;

  const { capabilities, outcomes, connections } = data as {
    capabilities: CapabilityData[];
    outcomes: OutcomeData[];
    connections: ConnectionData[];
  };

  let hoveredCapabilityId = $state<string | null>(null);
  let hoveredOutcomeId = $state<string | null>(null);
  let selectedEntity = $state<SelectedEntity>(null);

  let activeCapabilityId = $derived(
    selectedEntity?.type === "capability"
      ? selectedEntity.id
      : hoveredCapabilityId,
  );
  let activeOutcomeId = $derived(
    selectedEntity?.type === "outcome" ? selectedEntity.id : hoveredOutcomeId,
  );

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
          class:hovered={activeCapabilityId || activeOutcomeId}
        >
          AI adoption
        </div>
      </div>
      <div class="x">
        <div
          class="entity"
          class:hovered={activeCapabilityId || activeOutcomeId}
        >
          &times;
        </div>
      </div>
      <div class="capabilities">
        {#each capabilities as capability}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            onmouseover={() => (hoveredCapabilityId = capability.id)}
            onmouseout={() => (hoveredCapabilityId = null)}
            onfocus={() => (hoveredCapabilityId = capability.id)}
            onblur={() => (hoveredCapabilityId = null)}
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
              hovered={!!(
                activeCapabilityId === capability.id ||
                (activeOutcomeId &&
                  connectedCapabilityIds.includes(capability.id))
              )}
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
            hoveredCapabilityId={activeCapabilityId}
            hoveredOutcomeId={activeOutcomeId}
          />
        {/each}
      </div>
      <div class="outcomes">
        {#each outcomes as outcome}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            onmouseover={() => (hoveredOutcomeId = outcome.id)}
            onmouseout={() => (hoveredOutcomeId = null)}
            onfocus={() => (hoveredOutcomeId = outcome.id)}
            onblur={() => (hoveredOutcomeId = null)}
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
            />
          </div>
        {/each}
      </div>
    </div>
    <div class="snippet">
      <strong>Team performance</strong> Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Fusce sit amet laoreet mi. Vivamus interdum justo ex,
      commodo porttitor ante mattis et. Pellentesque neque augue, sollicitudin
      vel massa et, lobortis bibendum libero. Ut arcu tellus, dictum et
      consectetur vitae, euismod quis urna. Morbi dictum molestie ligula, quis
      commodo orci pharetra a. Nulla consequat, purus eu faucibus commodo, nisi
      purus egestas massa, eu tempus elit ligula non est.
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
        font-size: clamp(0.6rem, 1vw, 0.8rem);
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
      margin: 4px 12px;
      font-size: 0.85em;

      strong {
        font-weight: 700;
      }

      .snippet-links {
        display: flex;
      }
    }
  }
</style>

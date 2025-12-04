<script lang="ts">
  import { slide, fade } from "svelte/transition";
  import SnippetLink from "./SnippetLink.svelte";

  type CapabilityData = {
    name: string;
    id: string;
    description?: string;
    capabilityId?: string;
  };
  type OutcomeData = { name: string; id: string; description?: string };
  type SelectedEntity = { id: string; type: "capability" | "outcome" } | null;

  let { activeEntityData, selectedEntity } = $props<{
    activeEntityData: CapabilityData | OutcomeData;
    selectedEntity: SelectedEntity;
  }>();
</script>

<div class="snippet" transition:slide>
  <div in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
    <strong>{activeEntityData.name}</strong>
    {activeEntityData.description}
    <div class="snippet-links">
      {#if selectedEntity?.type === "capability"}
        <div>
          <SnippetLink
            text={`Learn more`}
            url={`/capabilities/${"capabilityId" in activeEntityData && activeEntityData.capabilityId ? activeEntityData.capabilityId : activeEntityData.id}`}
          />
        </div>
      {/if}
      <div>
        <SnippetLink
          text={`How to assess`}
          url={`/ai/capabilities-model/questions/#${activeEntityData.id}`}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .snippet {
    margin: 12px 24px;
    font-size: 0.85rem;

    strong {
      font-weight: 700;
    }

    .snippet-links {
      margin-top: 8px;
      display: flex;
      white-space: nowrap;
      justify-content: center;
    }
  }
</style>

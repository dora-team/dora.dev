<script lang="ts">
  let { capability, dimmed = false, hovered = false } = $props();
</script>

<div class="entity" class:dimmed class:hovered id={capability.id}>{capability.name}</div>

<style>
  .dimmed {
    opacity: 0.35;
  }

  .hovered {
    background-color: var(--dora-secondary-c);
  }
</style>

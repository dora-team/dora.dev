<script lang="ts">
  let { capability, dimmed = false, hovered = false, active = false } = $props();
</script>

<div class={["entity", { dimmed, hovered, active }]} id={capability.id}>{capability.name}</div>

<style>
  .dimmed {
    opacity: 0.35;
  }

  .hovered {
    background-color:var(--dora-mauve) !important;
  }
</style>

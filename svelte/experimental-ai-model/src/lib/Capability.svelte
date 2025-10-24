<script lang="ts">
  let { capability, dimmed = false, hovered = false } = $props();
</script>

<div class={["entity", { dimmed, hovered }]} id={capability.id}>{capability.name}</div>

<style>
  .dimmed {
    opacity: 0.35;
  }
</style>

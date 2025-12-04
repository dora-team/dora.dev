<script lang="ts">
  let { capability, dimmed = false, active = false } = $props();
</script>

<div class={["entity", { dimmed, active }]} id={capability.id}>{capability.name}</div>

<style>
  .dimmed {
    opacity: 0.35;
  }
</style>

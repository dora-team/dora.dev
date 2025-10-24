<script lang="ts">
  let { outcome, dimmed = false } = $props();
</script>

<div class={["entity", { dimmed }]} id={outcome.id}>{outcome.name}</div>

<style>
  .entity {
    background-color:var(--dora-highlight);
  }
  .dimmed {
    opacity: 0.5;
    background-color:transparent;
  }
</style>
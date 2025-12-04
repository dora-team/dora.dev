<script lang="ts">
  let { outcome, dimmed = false, active = false } = $props();
</script>

<div class={["entity", { dimmed, active }]} id={outcome.id}>{outcome.name}</div>

<style>
  .entity {
    background-color:var(--dora-highlight);
  }
  .dimmed {
    opacity: 0.5;
    background-color:transparent;
  }

  .active {
    background-color: var(--dora-spotlight-yellow) !important;
  }
</style>
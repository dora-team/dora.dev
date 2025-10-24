<script lang="ts">
  export let outcome;
  export let dimmed = false;
</script>

<div class="entity" class:dimmed id={outcome.id}>{outcome.name}</div>

<style>
  .entity {
    background-color:var(--dora-highlight);
  }
  .dimmed {
    opacity: 0.5;
    background-color:transparent;
  }
</style>
<script lang="ts">
  export let capability;
  export let dimmed = false;
</script>

<div class="entity" class:dimmed id={capability.id}>{capability.name}</div>

<style>
  .dimmed {
    opacity: 0.35;
  }
</style>

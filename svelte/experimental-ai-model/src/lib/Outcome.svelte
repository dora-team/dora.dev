<script lang="ts">
  export let outcome;
</script>

<div class="entity" id={outcome.id}>{outcome.name}</div>

<style>
  .entity {
    background-color:var(--dora-highlight);
  }
</style>
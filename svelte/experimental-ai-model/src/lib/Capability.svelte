<script lang="ts">
  export let capability;
  export let dimmed = false;
  export let hovered = false;
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

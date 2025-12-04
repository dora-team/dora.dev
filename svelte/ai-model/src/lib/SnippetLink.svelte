<script lang="ts">
  let { text, url } = $props();
</script>

<a href={url} target="_blank" class="button">{text}</a>

<style>
  .button {
    font-size:clamp(.8rem,1vw,1.2rem);
  }
</style>
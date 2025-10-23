<script>
  import { onMount, tick } from 'svelte';

  export let fromId;
  export let toId;
  export let index; // vertically, which # arrow is this (from the PoV of the "to" element)

  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
  let svgElement;

  function updateConnector() {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);

    if (fromEl && toEl && svgElement) {
      const container = svgElement.parentElement;
      if (!container) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const arrowMargin = 40;
      x1 = fromRect.right - containerRect.left;
      y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
      x2 = toRect.left - containerRect.left - arrowMargin;
      y2 = (toRect.top + toRect.height / 2 - containerRect.top) + index * 10;
    }
  }

  onMount(async () => {
    await tick();
    updateConnector();
    window.addEventListener('resize', updateConnector);

    return () => {
      window.removeEventListener('resize', updateConnector);
    };
  });
</script>

<svg bind:this={svgElement} style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
  <defs>
    <marker
      id="arrow"
      viewBox="-1 -1 11 21"
      refX="10"
      refY="8"
      markerWidth="10"
      markerHeight="16"
      orient="auto-start-reverse">
      <polyline points="0 0 10 8 0 16" fill="transparent" stroke="rgb(34,34,39)" stroke-width="1.25"/>
    </marker>
  </defs>
  <line {x1} {y1} {x2} {y2} stroke="rgb(34,34,39)" stroke-width="1.25" marker-end="url(#arrow)" />
</svg>

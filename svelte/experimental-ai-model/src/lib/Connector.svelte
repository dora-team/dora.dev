<script>
  let { fromId, toId, index, hoveredCapabilityId = null, hoveredOutcomeId = null } = $props();
  const yOffsetPx = 8;
  const rightMargin = 12;

  let x1 = $state(0);
  let y1 = $state(0);
  let x2 = $state(0);
  let y2 = $state(0);
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

      x1 = fromRect.right - containerRect.left;
      y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
      x2 = toRect.left - containerRect.left - rightMargin;
      y2 = (toRect.top + toRect.height / 2 - containerRect.top) + index * yOffsetPx;
    }
  }

  $effect(() => {
    updateConnector();
    window.addEventListener('resize', updateConnector);

    return () => {
      window.removeEventListener('resize', updateConnector);
    };
  });

  let dimmed = $derived((hoveredCapabilityId && hoveredCapabilityId !== fromId) || (hoveredOutcomeId && hoveredOutcomeId !== toId));
</script>

<svg bind:this={svgElement} style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
  <defs>
    <marker
      id="arrow"
      viewBox="-1 -1 11 21"
      refX="8"
      refY="6"
      markerWidth="8"
      markerHeight="12"
      orient="auto-start-reverse">
      <polyline points="0 0 8 6 0 12" fill="transparent" stroke="rgb(34,34,39)" stroke-width="1.5"/>
    </marker>
  </defs>
  <line {x1} {y1} {x2} {y2} stroke="rgb(34,34,39)" stroke-width="1" marker-end="url(#arrow)" class={{dimmed}}/>
</svg>

<style>
  .dimmed {
    opacity: 0.25;
  }
  line {
    transition: opacity 0.2s ease-in-out;
  }
</style>

<!--
 *
 *
 *
-->
<script lang="ts">
  import { getContext } from 'svelte';
  import { variants } from '$lib/stores';
  import * as T from '$lib/types';

  /**
   *
   *
   *
   */
  let {
    x = 0,
    y = 0,
    gridX = 0,
    gridY = 0,
    size = 30,
    variant = 'empty'
  } = $props();

  /**
   *
   *
   *
   */
  const canvas = getContext<T.CanvasContext>('canvas');

  /**
   *
   *
   *
   */
  const getCellKey = (x: number, y: number) => `${x},${y}`;

  /**
   *
   *
   *
   */
  const isHighlighted = $derived(
    canvas.highlightedCell !== null &&
    canvas.highlightedCell.x === gridX &&
    canvas.highlightedCell.y === gridY
  );

  /**
   *
   *
   *
   */
  const cellKey = $derived(getCellKey(gridX, gridY));

  /**
   *
   *
   *
   */
  const storedVariant = $derived(canvas.cells.get(cellKey));

  /**
   *
   *
   *
   */
  const effectiveVariant = $derived(
    isHighlighted ? 'highlighted' : (storedVariant ?? variant)
  );

  /**
   *
   *
   *
   */
  const isFreefloating = $derived(
    gridX < 0 || gridY < 0 || gridX >= canvas.width || gridY >= canvas.height
  );

  /**
   *
   *
   *
   */
  const isDragging = $derived(
    canvas.draggedCell !== null &&
    canvas.draggedCell.gridX === gridX &&
    canvas.draggedCell.gridY === gridY
  );

  /**
   *
   *
   *
   */
  const mouse = getContext<{ x: number; y: number }>('mouse');

  /**
   *
   *
   *
   */
  function handleDragStart(e: MouseEvent) {
    if (e.button !== 0) return;
    if (effectiveVariant === 'highlighted') return;
    e.stopPropagation();

    const cellX = (mouse.x - canvas.translateX) / canvas.scale;
    const cellY = (mouse.y - canvas.translateY) / canvas.scale;

    canvas.draggedCell = {
      gridX,
      gridY,
      variant: effectiveVariant as T.CellVariantName,
      isFreefloating,
      offsetX: cellX - x,
      offsetY: cellY - y
    };
  }
</script>


<!--
 *
 *
 *
-->
{#if !isDragging}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <g onmousedown={handleDragStart} style="cursor: {effectiveVariant !== 'highlighted' ? 'grab' : 'default'}">
    <rect
      {x}
      {y}
      width={size}
      height={size}
      fill={variants.find(v => v.id === effectiveVariant)?.color}
      stroke={variants.find(v => v.id === effectiveVariant)?.stroke}
      stroke-width="1"
    />
    {#if variants.find(v => v.id === effectiveVariant)?.icon}
      {@const iconSize = size * 0.6}
      {@const Icon = variants.find(v => v.id === effectiveVariant)?.icon}
      <g transform="translate({x + size / 2 - iconSize / 2}, {y + size / 2 - iconSize / 2})">
        <Icon
          size={iconSize}
          stroke="#374151"
          strokeWidth={2}
        />
      </g>
    {/if}
  </g>
{/if}
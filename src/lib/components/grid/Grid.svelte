<!--
 *
 *
 *
-->
<script lang="ts">
  import * as Grid from '$lib/components/grid';
  import { getContext } from 'svelte';
  import * as T from '$lib/types';

  /**
   *
   *
   *
   */
  let { visibleCells } = $props();
  const canvas = getContext<T.CanvasContext>('canvas');

  /**
   *
   *
   *
   */
  const visibleFilledCells = $derived(() => {
    const cells: Array<{ key: string; x: number; y: number; variant: T.CellVariantName }> = [];
    for (const [key, variant] of canvas.cells.entries()) {
      const [x, y] = key.split(',').map(Number);
      if (x >= visibleCells.startX && x < visibleCells.endX &&
          y >= visibleCells.startY && y < visibleCells.endY) {
        cells.push({ key, x, y, variant });
      }
    }
    return cells;
  });
</script>

<!--
 * Grid pattern background
 *
 *
 *
-->
<defs>
  <pattern
    id="grid-pattern"
    x={visibleCells.startX * canvas.cellSize}
    y={visibleCells.startY * canvas.cellSize}
    width={canvas.cellSize}
    height={canvas.cellSize}
    patternUnits="userSpaceOnUse"
  >
    <rect
      width={canvas.cellSize}
      height={canvas.cellSize}
      fill="white"
      stroke="#e5e7eb"
      stroke-width="0.5"
    />
  </pattern>
</defs>

<!--
 * Background grid
 *
 *
-->
<rect
  x={visibleCells.startX * canvas.cellSize}
  y={visibleCells.startY * canvas.cellSize}
  width={(visibleCells.endX - visibleCells.startX) * canvas.cellSize}
  height={(visibleCells.endY - visibleCells.startY) * canvas.cellSize}
  fill="url(#grid-pattern)"
/>

<!--
 * Filled cells
 *
 *
-->
{#each visibleFilledCells() as cell (cell.key)}
  <Grid.Cell
    x={cell.x * canvas.cellSize}
    y={cell.y * canvas.cellSize}
    gridX={cell.x}
    gridY={cell.y}
    size={canvas.cellSize}
    variant={cell.variant}
  />
{/each}

<!--
 * Highlighted cells
 *
 *
-->
{#if canvas.highlightedCell && canvas.highlightedCell.x >= visibleCells.startX && canvas.highlightedCell.x < visibleCells.endX && canvas.highlightedCell.y >= visibleCells.startY && canvas.highlightedCell.y < visibleCells.endY}
  {@const key = `${canvas.highlightedCell.x},${canvas.highlightedCell.y}`}
  {#if !canvas.cells.has(key)}
    <Grid.Cell
      x={canvas.highlightedCell.x * canvas.cellSize}
      y={canvas.highlightedCell.y * canvas.cellSize}
      gridX={canvas.highlightedCell.x}
      gridY={canvas.highlightedCell.y}
      size={canvas.cellSize}
      variant="highlighted"
    />
  {/if}
{/if}
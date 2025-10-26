<!--
 *
 *
 *
-->
<script lang="ts">
  import { getContext } from 'svelte';
  import * as Grid from '$lib/components/grid';
  import * as T from '$lib/types';

  /**
   *
   *
   *
   */
  let { visibleCells } = $props();
  const canvas = getContext<T.CanvasContext>('canvas');
</script>


<!--
 *
 *
 *
-->
{#each Array.from(canvas.cells.entries()) as [key, variant]}
  {@const [x, y] = key.split(',').map(Number)}
  {#if x < visibleCells.startX || x >= visibleCells.endX || y < visibleCells.startY || y >= visibleCells.endY}
    <Grid.Cell
      x={x * canvas.cellSize}
      y={y * canvas.cellSize}
      gridX={x}
      gridY={y}
      size={canvas.cellSize}
      {variant}
    />
  {/if}
{/each}
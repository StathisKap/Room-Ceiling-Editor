<!--
 *
 *
 *
-->
<script lang="ts">
  import { getContext } from 'svelte';
  import * as T from '$lib/types';
  import { variants } from '$lib/stores';

  /**
   *
   *
   *
   */
  const canvas = getContext<T.CanvasContext>('canvas');
  const mouse = getContext<{ x: number; y: number }>('mouse');
  const mouseX = $derived(mouse.x - canvas.translateX);
  const mouseY = $derived(mouse.y - canvas.translateY);
</script>


<!--
 *
 *
 *
-->
{#if canvas.draggedCell}
  {@const dragX = canvas.draggedCell.isFreefloating
    ? mouseX / canvas.scale - canvas.draggedCell.offsetX
    : Math.floor(mouseX / (canvas.cellSize * canvas.scale)) * canvas.cellSize}
  {@const dragY = canvas.draggedCell.isFreefloating
    ? mouseY / canvas.scale - canvas.draggedCell.offsetY
    : Math.floor(mouseY / (canvas.cellSize * canvas.scale)) * canvas.cellSize}
  {@const dragVariant = variants.find(v => v.id === canvas.draggedCell?.variant)}
  {@const iconSize = canvas.cellSize * 0.6}
  <g opacity="0.6">
    <rect
      x={dragX}
      y={dragY}
      width={canvas.cellSize}
      height={canvas.cellSize}
      fill={dragVariant?.color}
      stroke={dragVariant?.stroke}
      stroke-width="1"
    />
    {#if dragVariant?.icon}
      {@const Icon = dragVariant.icon}
      <g transform="translate({dragX + canvas.cellSize / 2 - iconSize / 2}, {dragY + canvas.cellSize / 2 - iconSize / 2})">
        <Icon
          size={iconSize}
          stroke="#374151"
          strokeWidth={2}
        />
      </g>
    {/if}
  </g>
{/if}
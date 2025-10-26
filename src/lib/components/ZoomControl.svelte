  <!--
   *
   *
   *
  -->
<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { getContext } from 'svelte';
  import * as T from '$lib/types';
  import * as U from '$lib/utils';

  /**
   *
   *
   *
   */
  const canvas = getContext<T.CanvasContext>('canvas');
</script>


<!--
  *
  *
  *
-->
<div class="absolute top-4 right-4 flex flex-col gap-2">
  <Button onclick={() => canvas.scale = Math.min(canvas.scale * 1.2, 5)}>
    +
  </Button>
  <Button onclick={() => canvas.scale = Math.max(canvas.scale * 0.8, 0.1)}>
    −
  </Button>
  <Button
    onclick={() => {
      U.resetCanvas(canvas);
    }}
  >
    Reset
  </Button>
</div>

<div class="absolute bottom-4 left-4 bg-white px-3 py-2 rounded shadow text-sm">
  Zoom: {(canvas.scale * 100).toFixed(0)}% |
  Grid:
  <input type="number" bind:value={canvas.width} class="w-12 px-1 rounded py-0.5 border border-gray-200 text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0" />
  ×
  <input type="number" bind:value={canvas.height} class="w-12 px-1 rounded py-0.5 border border-gray-200 text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0" />
</div>
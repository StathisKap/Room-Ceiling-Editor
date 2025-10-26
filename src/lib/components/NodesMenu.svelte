<!--
 *
 *
 *
-->
<script lang="ts">
  import { getContext } from 'svelte';
  import { variants } from '$lib/stores';
  import * as T from '$lib/types';
  import * as U from '$lib/utils';
  import * as lucide from '@lucide/svelte';

  /**
   *
   *
   *
   */
  let menuPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
  let isOpen = $state(false);
  let visibleVariants = $state(variants.filter(v => v.id !== 'highlighted' && v.id !== 'empty'));
  const canvas = getContext<T.CanvasContext>('canvas');
  export { handleContextMenu };

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
  const hasCell = $derived.by(() => {
    if (canvas.highlightedCell === null) return false;
    const key = getCellKey(canvas.highlightedCell.x, canvas.highlightedCell.y);
    return canvas.cells.has(key);
  });

  /**
   *
   *
   *
   */
  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    const gridX = Math.floor((svgX - canvas.translateX) / (canvas.cellSize * canvas.scale));
    const gridY = Math.floor((svgY - canvas.translateY) / (canvas.cellSize * canvas.scale));
    menuPosition = { x: e.clientX, y: e.clientY };
    canvas.highlightedCell = { x: gridX, y: gridY };
    isOpen = true;
  }

  /**
   *
   *
   *
   */
  function closeContextMenu() {
    isOpen = false;
    canvas.highlightedCell = null;
  }

  /**
   *
   *
   *
   */
  function handleMenuAction(action: string) {
    if (action === 'reset-view') {
      U.resetCanvas(canvas);
      closeContextMenu();
      return;
    }

    /**
     *
     *
     *
     */
    if (canvas.highlightedCell === null) {
      closeContextMenu();
      return;
    }

    /**
     *
     *
     *
     */
    const key = getCellKey(canvas.highlightedCell.x, canvas.highlightedCell.y);

    /**
     *
     *
     *
     */
    if (visibleVariants.some(v => v.id === action)) {
      canvas.cells.set(key, action as T.CellVariantName);
      canvas.cells = new Map(canvas.cells);
    } else if (action === 'delete') {
      canvas.cells.delete(key);
      canvas.cells = new Map(canvas.cells);
    }

    /**
     *
     *
     *
     */
    closeContextMenu();
  }
</script>


<!--
 *
 *
 *
-->
{#if isOpen}
  <button
    class="fixed inset-0 z-40"
    onclick={closeContextMenu}
    oncontextmenu={(e) => e.preventDefault()}
    aria-label="Close context menu"
  ></button>
  <div
    class="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-48"
    style="left: {menuPosition.x}px; top: {menuPosition.y}px;"
  >
    {#each visibleVariants as variant}
      {@const Icon = variant.id === 'invalid' ? lucide.X : variants.find(v => v.id === variant.id)?.icon}
      <button
        class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
        onclick={() => handleMenuAction(variant.id)}
        aria-label={variant.name}
      >
        <Icon size={20} />
        {variant.name}
      </button>
    {/each}
    <button
      class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
      onclick={() => handleMenuAction('delete')}
    >
      <lucide.Trash size={20} stroke="#9ca3af" strokeWidth={2} />
      Delete
    </button>
    <div class="border-t border-gray-200 my-1"></div>
    <button
      class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
      onclick={() => handleMenuAction('reset-view')}
    >
      Reset View
    </button>
  </div>
{/if}
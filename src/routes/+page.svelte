<!--
 *
 *
 *
-->
<script lang="ts">
  import * as Grid from '$lib/components/grid';
  import ZoomControl from '$lib/components/ZoomControl.svelte';
  import NodesMenu from '$lib/components/NodesMenu.svelte';
  import Backdrop from '$lib/components/Backdrop.svelte';
  import { onMount, setContext } from 'svelte';
  import * as T from '$lib/types';

  /**
   *
   *
   *
   */
  const canvas = $state<T.CanvasContext>({
    scale: 1,
    translateX: 0,
    translateY: 0,
    width: 100,
    height: 100,
    cellSize: 30,
    highlightedCell: null,
    cells: new Map<string, T.CellVariantName>(),
    draggedCell: null
  });

  /**
   *
   *
   *
   */
  setContext('canvas', canvas);
  setContext('mouse', { get x() { return mouseX; }, get y() { return mouseY; } });

  /**
   *
   *
   *
   */
  let isPanning = false;
  let startX = 0;
  let startY = 0;
  let viewportWidth = $state(0);
  let viewportHeight = $state(0);
  let nodesMenu: NodesMenu;
  let mouseX = $state(0);
  let mouseY = $state(0);
  let svgElement: SVGSVGElement;

  /**
   *
   *
   *
   */
  function handleMouseDown(e: MouseEvent) {
    if (e.button === 2) return;
    if (canvas.draggedCell) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    isPanning = true;
    startX = e.clientX - canvas.translateX;
    startY = e.clientY - canvas.translateY;
    e.preventDefault();
  }

  /**
   *
   *
   *
   */
  function handleMouseMove(e: MouseEvent) {
    const rect = svgElement?.getBoundingClientRect();
    if (rect) {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    if (isPanning && !canvas.draggedCell) {
      canvas.translateX = e.clientX - startX;
      canvas.translateY = e.clientY - startY;
    }
  }

  /**
   *
   *
   *
   */
  function handleMouseUp() {
    if (canvas.draggedCell) {
      const gridX = Math.floor((mouseX - canvas.translateX) / (canvas.cellSize * canvas.scale));
      const gridY = Math.floor((mouseY - canvas.translateY) / (canvas.cellSize * canvas.scale));

      const oldKey = `${canvas.draggedCell.gridX},${canvas.draggedCell.gridY}`;
      const newKey = `${gridX},${gridY}`;

      canvas.cells.delete(oldKey);
      canvas.cells.set(newKey, canvas.draggedCell.variant);
      canvas.cells = new Map(canvas.cells);
      canvas.draggedCell = null;
    }
    isPanning = false;
  }


  /**
   *
   *
   *
   */
  function handleWheel(e: WheelEvent) {
    e.preventDefault();

    /**
     *
     *
     *
     */
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = canvas.scale * delta;

    /**
     *
     *
     *
     */
    if (newScale < 0.02 || newScale > 10) return;

    /**
     *
     *
     *
     */
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    /**
     *
     *
     *
     */
    canvas.translateX = x - (x - canvas.translateX) * delta;
    canvas.translateY = y - (y - canvas.translateY) * delta;
    canvas.scale = newScale;
  }

  /**
   *
   *
   *
   */
  const visibleBounds = $derived({
    minX: Math.floor(-canvas.translateX / (canvas.cellSize * canvas.scale)),
    maxX: Math.ceil((-canvas.translateX + viewportWidth) / (canvas.cellSize * canvas.scale)),
    minY: Math.floor(-canvas.translateY / (canvas.cellSize * canvas.scale)),
    maxY: Math.ceil((-canvas.translateY + viewportHeight) / (canvas.cellSize * canvas.scale))
  });

  /**
   *
   *
   *
   */
  const visibleCells = $derived({
    startX: Math.max(0, visibleBounds.minX),
    endX: Math.min(canvas.width, visibleBounds.maxX),
    startY: Math.max(0, visibleBounds.minY),
    endY: Math.min(canvas.height, visibleBounds.maxY)
  });

  /**
   *
   *
   *
   */
  onMount(() => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    window.addEventListener('resize', () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
    });
    return () => {
      window.removeEventListener('resize', () => {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
      });
    };
  });
  $inspect(canvas.draggedCell);
</script>


<!--
 *
 *
 *
-->
<main
  class="w-full h-full overflow-hidden bg-gray-100 relative user-select-none"
>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <svg
    bind:this={svgElement}
    class="w-full h-full"
    style="cursor: {canvas.draggedCell ? 'grabbing' : 'move'}"
    onmousedown={handleMouseDown}
    onmousemove={handleMouseMove}
    onmouseup={handleMouseUp}
    onmouseleave={handleMouseUp}
    onwheel={handleWheel}
    oncontextmenu={(e) => nodesMenu?.handleContextMenu(e)}
    role="application"
    tabindex="-1"
    aria-roledescription="Grid editor"
    aria-label="Grid editor"
  >
  <Backdrop />
    <g transform="translate({canvas.translateX}, {canvas.translateY}) scale({canvas.scale})">
      <Grid.Grid visibleCells={visibleCells} />
      <Grid.Floating visibleCells={visibleCells} />
      <Grid.Ghosts />
    </g>
  </svg>
  <ZoomControl />
  <NodesMenu bind:this={nodesMenu} />
</main>
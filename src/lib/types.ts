/**
 *
 *
 *
 */
import type { Component } from 'svelte';


/**
 *
 *
 *
 */
export type CellVariantName = 'empty' | 'light' | 'airSupply' | 'airReturn' | 'smokeDetector' | 'invalid' | 'highlighted';

/**
 *
 *
 *
 */
export type CanvasContext = {
  scale: number;
  translateX: number;
  translateY: number;
  width: number;
  height: number;
  cellSize: number;
  highlightedCell: { x: number; y: number } | null;
  cells: Map<string, CellVariantName>;
  draggedCell: DraggedCell | null;
};


/**
 *
 *
 *
 */
export type CellVariant = {
  id: CellVariantName;
  name: string | undefined;
  color: string;
  stroke: string;
  icon?: Component
};


/**
 *
 *
 *
 */
export type DraggedCell = {
  gridX: number;
  gridY: number;
  variant: CellVariantName;
  isFreefloating: boolean;
  offsetX: number;
  offsetY: number;
};
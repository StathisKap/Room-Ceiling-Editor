/**
 *
 *
 *
 */
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';
import * as lucide from '@lucide/svelte';
import * as T from '$lib/types';


/**
 *
 *
 *
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}


/**
 *
 *
 *
 */
export function resetCanvas(canvas: T.CanvasContext) {
  canvas.scale = 1;
  canvas.translateX = 0;
  canvas.translateY = 0;
}
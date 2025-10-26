/**
 *
 *
 *
 */
import * as lucide from '@lucide/svelte';
import * as T from '$lib/types';


/**
 *
 *
 *
 */
export const variants: T.CellVariant[] = [
  {
    id: 'empty',
    name: undefined,
    color: '#f3f4f6',
    stroke: '#9ca3af',
    icon: undefined,
  },
  {
    id: 'light',
    name: 'Light',
    color: '#fef3c7',
    stroke: '#9ca3af',
    icon: lucide.Lightbulb,
  },
  {
    id: 'airSupply',
    name: 'Air Supply',
    color: '#bfdbfe',
    stroke: '#9ca3af',
    icon: lucide.AirVent,
  },
  {
    id: 'airReturn',
    name: 'Air Return',
    color: '#ddd6fe',
    stroke: '#9ca3af',
    icon: lucide.AirVent,
  },
  {
    id: 'smokeDetector',
    name: 'Smoke Detector',
    color: '#fecaca',
    stroke: '#9ca3af',
    icon: lucide.AlarmSmoke,
  },
  {
    id: 'invalid',
    name: 'Invalid',
    color: '#374151',
    stroke: '#9ca3af',
    icon: undefined,
  },
  {
    id: 'highlighted',
    name: undefined,
    color: '#fffc4b',
    stroke: '#9ca3af',
    icon: undefined,
  },
];
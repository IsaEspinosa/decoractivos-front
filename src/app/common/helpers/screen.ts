/**
 * Created by garusis on 4/06/18.
 */
import { gridBreakpoints } from '../constants';

export function smallerThan(size: string): boolean {
  const pxs: number = gridBreakpoints[size];
  return window.innerWidth < pxs;
}

export function greaterThan(size: string): boolean {
  const pxs: number = gridBreakpoints[size];
  return window.innerWidth < pxs;
}

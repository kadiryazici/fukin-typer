import { FPS } from '/src/constants';

/**
 * Takes miliseconds, returns frame
 */
export function msToFrame(ms: number) {
   return FPS * (ms / 1000);
}

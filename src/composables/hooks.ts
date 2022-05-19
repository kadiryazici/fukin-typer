import { frameCount, savedChars } from '/src/store';

import { createHookStore } from '/src/helpers/createHookStore';
import { msToFrame } from '/src/helpers/msToFrame';
import { onGameLoop } from '/src/composables/gameLoop';

const submitHook = createHookStore<(userInput: string) => void>();
export const runSubmitHooks = submitHook.runHooks;
export const onSubmit = submitHook.createHookComposable();

const charsChangeHook = createHookStore<(chars: string[]) => void>();
export const runCharsChangeHook = () => charsChangeHook.runHooks(savedChars.value);
export const onCharsChange = charsChangeHook.createHookComposable();

const wordMatchHooks = createHookStore<(word: string) => void>();
export const runWordMatchHooks = wordMatchHooks.runHooks;
export const onWordMatch = wordMatchHooks.createHookComposable();

const inputHook = createHookStore<(key: string) => void>();
export const runInputHooks = inputHook.runHooks;
export const onInput = inputHook.createHookComposable();

export function onInterval(ms: number, hook: () => void) {
   return onGameLoop(() => {
      const frame = Math.floor(msToFrame(ms));
      if (frameCount.value % frame === 0) {
         hook();
      }
   });
}

export function onTimeout(ms: number, hook: () => void) {
   const stopHook = onGameLoop(() => {
      const frame = Math.floor(msToFrame(ms));
      if (frameCount.value % frame === 0) {
         hook();
         stopHook();
      }
   });

   return stopHook;
}

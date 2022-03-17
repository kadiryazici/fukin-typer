import { createHookStore } from '/src/helpers/createHookStore';

const { removeHook, runHooks, saveHook, createHookComposable } = createHookStore<(word: string) => void>();

export function runWordMatchHooks(word: string) {
   runHooks(word);
}

export const onWordMatch = createHookComposable();

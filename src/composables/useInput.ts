import { createHookStore } from '/src/helpers/createHookStore';

const { runHooks, createHookComposable } = createHookStore<(key: string) => void>();

export function runInputHooks(char: string) {
   runHooks(char);
}

export const onInput = createHookComposable();

import { createHookStore } from '/src/helpers/createHookStore';

type GameLoophook = (delta: number) => void;

const { runHooks, createHookComposable } = createHookStore<GameLoophook>();

export function runGameLoopHooks(delta: number) {
   runHooks(delta);
}

export const onGameLoop = createHookComposable();

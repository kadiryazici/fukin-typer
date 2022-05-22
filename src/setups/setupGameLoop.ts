import { GameStatus, delta, frameCount, gameStatus } from '/src/store';

import { FPS } from '/src/constants';
import { runGameLoopHooks } from '/src/composables/hooks';

let oldTime = performance.now();

function calculateDelta() {
   const newTime = performance.now();
   delta.value = (newTime - oldTime) / 1000;
   oldTime = newTime;
}

function startLoop() {
   window.setInterval(() => {
      calculateDelta();
      if (gameStatus.value !== GameStatus.Running) return;

      frameCount.value += 1;
      runGameLoopHooks(delta.value);
   }, 1000 / FPS);
}

export function setupGameLoop() {
   startLoop();
}

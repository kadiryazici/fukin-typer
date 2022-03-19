import { GameStatus, delta, frameCount, gameStatus } from '/src/store';

import { FPS } from '/src/constants';
import { runGameLoopHooks } from '/src/composables/gameLoop';
import { watch } from 'vue';

let currentInterval = -1;
let oldTime = performance.now();

function calculateDelta() {
   const newTime = performance.now();
   delta.value = (newTime - oldTime) / 1000;
   oldTime = newTime;
}

function startLoop() {
   currentInterval = window.setInterval(() => {
      calculateDelta();
      if (gameStatus.value === GameStatus.Stopped) return;

      frameCount.value += 1;
      runGameLoopHooks(delta.value);
   }, 1000 / FPS);
}

export function setupGameLoop() {
   startLoop();

   watch(gameStatus, (status) => {
      if (status === GameStatus.WaitingToStart || status === GameStatus.Over) {
         clearInterval(currentInterval);
         currentInterval = -1;
      }
      if (status === GameStatus.Running) {
         startLoop();
      }
   });
}
